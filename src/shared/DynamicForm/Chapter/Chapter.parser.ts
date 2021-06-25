import { FormConfig } from "../Form/Form.config";
import { FormParser } from "../Form/Form.parser";
import { ChapterConfig } from "./Chapter.config";

export class ChapterParser {
  public static parseFromJSONArray(jsonArray: any[]): ChapterConfig[] {
    let result: ChapterConfig[] = [];
    jsonArray.forEach(json => {
      result.push(this.parseFromJSON(json));
    });
    return result;
  }
  public static parseFromJSON(json: any): ChapterConfig {
    // TODO: throw error if children and pages are set
    if(!json.pages || json.pages.length == 0) {
      json.pages = [];
    } else {
      json.pages = FormParser.parseFromJSONArray(json.pages);
    }
    if(!json.children || json.children.length == 0) {
      json.children = [];
    } else {
      json.children = ChapterParser.parseFromJSONArray(json.children);
    }
    if (!json.children.length && !json.pages.length) {
      json.pages = [new FormConfig([], {title: 'Default'})];
    }
    return new ChapterConfig(
      json.children,
      json.pages,
      json.settings
    )
  }
}