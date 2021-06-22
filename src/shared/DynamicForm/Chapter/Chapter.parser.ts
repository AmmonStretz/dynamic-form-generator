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
    return new ChapterConfig(
      json.key,
      json.children.length > 0 ? ChapterParser.parseFromJSONArray(json.children) : [],
      json.settings
    )
  }
}