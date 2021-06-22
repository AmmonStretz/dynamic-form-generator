import { Config } from '../config';
import { FinderConfig } from '../Finder/Finder.config';
import { Status } from '../status';

export class ChapterStatus extends Status {
  public children: ChapterStatus[] = [];
  constructor(
    public key: string,
    public index: number,
  ) {
    super();
  }
  public update(): ChapterStatus {
    this.children.forEach(child => child.update());
    return this;
  }
  public showAllErrors(): void {
    this.children[this.index].showAllErrors();
  }

  getValueByKey(path: string):any {
    // TODO: return key
    return null;
  }
};


export class ChapterConfig extends Config{
  private type: string = 'Chapter';
  public status: ChapterStatus;
  public parent: ChapterConfig | FinderConfig;
  constructor(
    public key: string,
    public children: ChapterConfig[],
    public settings: {
      title?: string,
    },
  ) {
    super();
    this.type = 'Chapter'

    
    this.children.forEach(subChapter => {
      subChapter.parent = this;
    });
  }

  get isRoot(): boolean {
    return this.parent instanceof FinderConfig
  }

  createStatus() {
    // DEFAULT Status
    this.status = new ChapterStatus(this.key, 0);
    this.status.config = this;
    this.children.forEach(subChapter => {
      subChapter.createStatus();
      subChapter.status.parent = this.status;
      this.status.children.push(subChapter.status);
    });
  }
  public hasAncestor(chapter: ChapterConfig): boolean {
    if(this.parent != null && this.parent instanceof ChapterConfig) {
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