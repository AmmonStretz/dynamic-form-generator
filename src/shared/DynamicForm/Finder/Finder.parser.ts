import { ChapterParser } from "../Chapter/Chapter.parser";
import { FinderConfig } from "./Finder.config";

export class FinderParser {
    public static parseFromJSON(json: any): FinderConfig {
      
      return new FinderConfig(
        ChapterParser.parseFromJSON(json.chapter),
        json.settings
      )
    }
  }