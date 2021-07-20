import { Config } from '../config';
import { Status } from '../status';
import { ChapterConfig, ChapterStatus } from '../Chapter/Chapter.config';

export class FinderStatus extends Status {
  public chapter: ChapterStatus;
  constructor() {
    super();
  }
  public update(showErrors: boolean = false): FinderStatus {
    this.chapter.update(showErrors);
    return this;
  }

  getValueByKey(path: string): any {
    // TODO: return key
    let current = path.split(/\/(.+)/)[0];
    let after = path.split(/\/(.+)/)[1];
    if (current == 'Root:' || current == '..' || current == '.') {
      return this.config.status.getValueByKey(after);
    } else {
      return this.chapter.getValueByKey(path);
    }
  }
};


export class FinderConfig extends Config {
  private type: string = 'Finder';
  declare public status: FinderStatus;
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
  createStatus(overwrite: boolean = false) {
    // DEFAULT Status
    this.status = new FinderStatus();
    this.status.config = this;
    this.chapter.createStatus(overwrite);
    this.chapter.status.parent = this.status;
    this.status.chapter = this.chapter.status;
  }

  public getAllPaths(): { path: string, type: string}[] {
    return this.chapter.getAllPaths('Root:/');
  }

  public toJson() {
    return {
      type: this.type,
      settings: this.settings,
      chapter: this.chapter.toJson()
    }
  }
}