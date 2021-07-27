import { ChapterConfig } from "../DynamicForm/Chapter/Chapter.config";

export abstract class ChapterDragService {
  public static currentChapter: ChapterConfig;
  public static isDroppable(target: ChapterConfig) {
  }
  public static dragStart(target: ChapterConfig) {
    this.currentChapter = target;
  }
}
document.addEventListener("dragend", ( event ) => {
  ChapterDragService.currentChapter = null;
}, false);