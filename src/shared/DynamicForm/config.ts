import { Status } from "./status";

export class Path {
  constructor(
    public name: string,
    public key: string,
    public type: string = null,
    public subpaths: Path[] = []) { }

  // Returns the name value and type of a paths end
  select(key: string): {
    name: string,
    value: string,
    type: string
  } {
    let current = key.split(/\/(.+)/)[0];
    if(current != this.key) return null;
    if(this.subpaths.length > 0){
      let after = key.split(/\/(.+)/)[1];
      let subpath = null;
      for (let i = 0; i < this.subpaths.length; i++) {
        subpath = this.subpaths[i].select(after);
        if(subpath != null) return subpath;
      }
    } else if(key == this.key) {
      return {
        name: this.name,
        value: this.key,
        type: this.type
      }
    }
    return null;
  };
}

export abstract class Config {
  public status: Status;
  public parent: Config;
  public abstract settings: any;
  public abstract createStatus(overwrite: boolean): void;
  public abstract toJson(): any;
  public abstract getAllPaths(key?: string): Path;

  public get Root(): Config {
    if (!this.parent) {
      return this;
    }
    return this.parent.Root;
  }
}