import { Config } from "./config";

export abstract class Status {
  public config: Config;
  public children: Status[] = [];
  public parent: Status;
  public abstract update(showErrors?: boolean): Status;
  public abstract getValueByKey(path: string):any;
}