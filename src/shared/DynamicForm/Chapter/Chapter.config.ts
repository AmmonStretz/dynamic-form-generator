import { Config } from '../config';
import { FinderConfig } from '../Finder/Finder.config';
import { FormConfig, FormStatus } from '../Form/Form.config';
import { Status } from '../status';

export class ChapterStatus extends Status {
  public children: ChapterStatus[] = [];
  public pages: FormStatus[] = [];
  constructor(
    public index: number,
    public isValid?: boolean,
    public visible: boolean = true,
  ) {
    super();
  }
  public update(): ChapterStatus {
    let valide = true;
    if (this.children.length > 0) {
      this.children.forEach(child => {
        const childStatus = child.update();
        if (!childStatus.isValid && childStatus.visible) {
          valide = false;
        }
      });
    } else if (this.pages.length > 0) {
      this.pages.forEach(page => {
        const pageStatus = page.update();
        if (!pageStatus.isValid && pageStatus.visible) {
          valide = false;
        }
      });
    }
    this.isValid = valide;
    // this.visible = this.config.visible.calc(
    //   (key: string) => this.getValueByKey(key)
    // );
    return this;
  }
  public showAllErrors(): void {

    if (this.children.length > 0) {
      this.children[this.index].showAllErrors();
    } else {
      this.pages[this.index].showAllErrors();
    }
  }

  getValueByKey(path: string): any {
    let current = path.split(/\/(.+)/)[0];
    let after = path.split(/\/(.+)/)[1];
    if (current == 'Root:') {
      return this.config.Root.status.getValueByKey(after);
    } else if (current == '..') {
      return this.parent.getValueByKey(after);
    } else if (+current != NaN && typeof +current == "number") {
      const index = +current;
      if (index <= this.pages.length - 1) {
        this.pages[index].getValueByKey(after)
      }
      if (index <= this.children.length - 1) {
        this.children[index].getValueByKey(after);
      }
    }
    return null;
  }
};


export class ChapterConfig extends Config {
  private type: string = 'Chapter';
  public status: ChapterStatus;
  public parent: ChapterConfig | FinderConfig;

  constructor(
    public children: ChapterConfig[],
    public pages: FormConfig[],
    public settings: {
      title?: string,
      showTitle?: boolean
    },
  ) {
    super();
    this.type = 'Chapter'
    this.children.forEach(subChapter => {
      subChapter.parent = this;
    });
    this.pages.forEach((page: FormConfig) => {
      page.parent = this;
    })
  }

  get isRoot(): boolean {
    return this.parent instanceof FinderConfig
  }

  addPage(form: FormConfig, index: number = null) {
    form.parent = this;
    if (index == null) {
      this.pages.push(form);
    } else {
      this.pages.splice(index, 0, form)
    }
  }
  addChapter(chapter: ChapterConfig, index: number = null) {
    chapter.parent = this;
    if (index == null) {
      this.children.push(chapter);
    } else {
      this.children.splice(index, 0, chapter)
    }
  }

  createStatus() {
    // DEFAULT Status
    this.status = new ChapterStatus(0);
    this.status.config = this;
    this.children.forEach(subChapter => {
      subChapter.createStatus();
      subChapter.parent = this;
      subChapter.status.parent = this.status;
      this.status.children.push(subChapter.status);
    });
    this.pages.forEach(page => {
      page.createStatus();
      page.status.parent = this.status;
      page.parent = this;
      this.status.pages.push(page.status);
    });
  }
  public hasAncestor(chapter: ChapterConfig): boolean {
    if (this.parent != null && this.parent instanceof ChapterConfig) {
      return this === chapter || this.parent.hasAncestor(chapter);
    } else {
      return this === chapter;
    }
  }
  public toJson(): any {
    return {
      type: this.type,
      settings: this.settings,
      children: this.children.map(subChapter => subChapter.toJson())
    }
  }
}