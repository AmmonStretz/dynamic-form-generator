import { config } from "../../data/wizard.config";
import { VuexModule, Module, Mutation } from 'vuex-module-decorators';
import { FinderConfig } from "../Finder/Finder.config";
import { FinderParser } from "../Finder/Finder.parser";

@Module({ namespaced: false, name: 'finder-service' })
class FinderService extends VuexModule {
  public _config: FinderConfig = null;

  @Mutation
  public updateConfig(config: FinderConfig): void {
    // TODO: 
    this._config = config;
  }
  @Mutation
  public loadConfig(): void {
    // TODO: 
    this._config = FinderParser.parseFromJSON(config);
  }

  public get config(): FinderConfig {
    return this._config;
  }
}

export default FinderService;