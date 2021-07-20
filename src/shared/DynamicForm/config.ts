import { Status } from "./status";

export abstract class Config {
  public status: Status;
  public parent: Config;
  public abstract settings: any;
  public abstract createStatus(overwrite: boolean): void;
  public abstract toJson(): any;
  public abstract getAllPaths(rootPath?: string): { path: string, type: string}[];

  public get Root(): Config{
    if(!this.parent){
      return this;
    }
    return this.parent.Root;
  }
}