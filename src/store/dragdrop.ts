import { Config } from '@/shared/DynamicForm/config';
import { VuexModule, Module, Mutation, Action } from 'vuex-module-decorators';

// type Select = {
//   type: 'select';
//   options: { key: string; value: any }[];
// };

// type Number = {
//   type: 'number-input';
//   unit: string;
//   placeholder: string;
//   min?: { value: number; message: string };
//   required?: { message: 'Bitte Wert auswählen' };
// };


// export type Question = {
//   title: string;
//   key: string;
//   description: string;
//   config: Config;
// };

@Module({ namespaced: false, name: 'dragdrop' })
class ConfigDragDrop extends VuexModule {
  public dragged: Config = null;

  @Mutation
  public dragConfig(config: Config): void {
    // TODO: 
    this.dragged = config;
  }
  @Mutation
  public dropConfig(): Config {
    // TODO:
    let tmp = this.dragged;
    this.dragged = null;
    return tmp;
  }

  public get inDrag(): boolean {
    return !!this.dragged;
  }
}

export default ConfigDragDrop;