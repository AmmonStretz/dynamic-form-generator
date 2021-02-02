import { WizzardStatus } from "@/shared/DynamicForm/Wizzard/Wizzard.dto";

export class ResultsService {
  constructor() { }
  generateCSV(status: WizzardStatus) {
    // if(!status.values.length) return [];
    return [
      ['1', '2', '10'],
      ['4', '5', '6'],
      ['7', '8', '9'],
    ]
  }
}