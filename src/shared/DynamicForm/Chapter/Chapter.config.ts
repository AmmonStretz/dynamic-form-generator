import { BooleanCondition } from '@/shared/ts-condition-parser/condition.class';
import { BooleanConst } from '@/shared/ts-condition-parser/objects/boolean.class';
import { Config } from '../config';
import { FinderConfig } from '../Finder/Finder.config';
import { FormConfig, FormStatus } from '../Form/Form.config';
import { Status } from '../status';

export class ChapterStatus extends Status {
  public children: ChapterStatus[] = [];
  public pages: FormStatus[] = [];
  declare public config: ChapterConfig;
  constructor(
    public index: number,
    public isValid?: boolean,
    public visible: boolean = true,
  ) {
    super();
  }
  public update(showErrors: boolean = false): ChapterStatus {
    let valide = true;
    if (this.children.length > 0) {
      this.children.forEach(child => {
        const childStatus = child.update(showErrors);
        if (!childStatus.isValid && childStatus.visible) {
          valide = false;
        }
      });
    } else if (this.pages.length > 0) {
      this.pages.forEach(page => {
        const pageStatus = page.update(showErrors);
        if (!pageStatus.isValid && pageStatus.visible) {
          valide = false;
        }
      });
    }
    this.isValid = valide;
    this.visible = this.config.visible.calc(
      (key: string) => this.getValueByKey(key)
    );
    return this;
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
        return this.pages[index].getValueByKey(after)
      }
      if (index <= this.children.length - 1) {
        return this.children[index].getValueByKey(after);
      }
    }
    return null;
  }

  next(firstCall = true): boolean {
    if (this.children.length > 0) {
      for (let i = this.index; i < this.children.length; i++) {
        if (this.children[i].visible) {
          let overflow = !this.children[i].next(firstCall);
          if (overflow) {
            this.index = i;
            return false; // no overflow
          }
        }
        firstCall = false;
      }
    } else if (this.pages.length > 0) {
      if (firstCall && !this.pages[this.index].isValid) {
        return false;
      }
      for (
        let i = this.index + (firstCall ? 1 : 0);
        i < this.pages.length;
        i++
      ) {
        if (this.pages[i].visible) {
          this.index = i;
          return false; // no overflow
        }
      }
    }
    return true;
  }
  previous(firstCall = true): boolean {
    if (this.children.length > 0) {
      for (let i = this.index; i >= 0; i--) {
        if (this.children[i].visible) {
          let overflow = !this.children[i].previous(firstCall);
          if (overflow) {
            this.index = i;
            return false; // no overflow
          }
        }
        firstCall = false;
      }
    } else if (this.pages.length > 0) {
      for (let i = this.index - (firstCall ? 1 : 0); i >= 0; i--) {
        if (this.pages[i].visible) {
          this.index = i;
          return false; // no overflow
        }
      }
    }
    return true;
  }

  checkValidity(): boolean {
    if (this.pages.length > 0) {
      for (let i = 0; i < this.config.pages.length; i++) {
        if (!(this.config.pages instanceof FormConfig)) {
          const status = this.config.pages[i].status;
          if (status.visible && !status.isValid) {
            return false;
          }
        }
      }
    } else if (this.children.length > 0) {
      for (let i = 0; i < this.config.children.length; i++) {
        if (!(this.config.children instanceof ChapterConfig)) {
          const status = this.config.children[i].status;
          if (status.visible && !status.isValid) {
            return false;
          }
        }
      }
    }
    return true;
  }
};


export class ChapterConfig extends Config {
  private type: string = 'Chapter';
  declare public status: ChapterStatus;
  declare public parent: ChapterConfig | FinderConfig;

  constructor(
    public children: ChapterConfig[],
    public pages: FormConfig[],
    public settings: {
      title?: string,
      showTitle?: boolean
    },
    public visible: BooleanCondition = new BooleanConst(true)
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

  createStatus(overwrite: boolean = false) {
    // DEFAULT Status
    this.status = new ChapterStatus(0);
    this.status.config = this;
    this.children.forEach(subChapter => {
      subChapter.createStatus(overwrite);
      subChapter.parent = this;
      subChapter.status.parent = this.status;
      this.status.children.push(subChapter.status);
    });
    this.pages.forEach(page => {
      page.createStatus(overwrite);
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
  public getAllPaths(rootPath: string): { path: string, type: string }[] {
    let paths: { path: string, type: string }[] = [];
    if (this.children.length) {
      this.children.forEach((child, i) => {
        child.getAllPaths(rootPath + i + '/').forEach(path => {
          paths.push({
            path: path.path,
            type: path.type
          })
        });
      });
    } else if (this.pages.length) {
      this.pages.forEach((page, i) => {
        page.getAllPaths(rootPath + i + '/').forEach(path => {
          paths.push({
            path: path.path,
            type: path.type
          })
        });
      });
    }
    return paths;
  }
  get root(): any {
    if (this.parent) {
      return this.parent.root;
    }
    return this;
  }
  public toJson(): any {
    return {
      type: this.type,
      settings: this.settings,
      children: this.children.map(subChapter => subChapter.toJson())
    }
  }
}