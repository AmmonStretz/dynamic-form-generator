import { ChapterConfig } from "../DynamicForm/Chapter/Chapter.config";

export abstract class ChapterDragService {
  public static currentChapter: ChapterConfig;
  public static isDroppable(target: ChapterConfig) {
  }
  public static dragStart(target: ChapterConfig) {
    console.log('dragStart');
    
    this.currentChapter = target;
  }
}
document.addEventListener("dragend", ( event ) => {
  console.log('dragEnd');
  ChapterDragService.currentChapter = null;
}, false);