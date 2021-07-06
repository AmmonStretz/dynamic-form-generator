import { Config } from '../config';
import { Status } from '../status';
import { ChapterConfig, ChapterStatus } from '../Chapter/Chapter.config';

export class FinderStatus extends Status {
  public chapter: ChapterStatus;
  constructor() {
    super();
  }
  public update(): FinderStatus {
    this.chapter.update();
    return this;
  }

  getValueByKey(path: string): any {
    // TODO: return key
    return null;
  }
};


export class FinderConfig extends Config {
  private type: string = 'Finder';
  public status: FinderStatus;
  constructor(
    public chapter: ChapterConfig,
    public settings: {
      title?: string,
      submitButtonText?: string,
      prevButtonText?: string,
      nextButtonText?: string,
    },
  ) {
    super();
    this.type = 'Finder'
    this.chapter.parent = this;
  }
  createStatus() {
    // DEFAULT Status
    this.status = new FinderStatus();
    this.status.config = this;
    this.chapter.createStatus();
    this.chapter.status.parent = this.status;
    this.status.chapter = this.chapter.status;
  }
  public toJson() {
    return {
      type: this.type,
      settings: this.settings,
      chapter: this.chapter.toJson()
    }
  }
}