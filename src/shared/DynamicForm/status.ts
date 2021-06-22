import { Config } from "./config";

export abstract class Status {
  public config: Config;
  public children: Status[] = [];
  public parent: Status;
  public abstract update(): Status;
  public abstract showAllErrors(): void;
  public abstract getValueByKey(path: string):any;
}