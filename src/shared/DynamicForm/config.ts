import { Status } from "./status";

export abstract class Config {
  public status: Status;
  public parent: Config;
  public abstract settings: any;
  public abstract createStatus(): void;
  public abstract toJson(): any;
}