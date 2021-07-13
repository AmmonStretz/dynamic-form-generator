import { BooleanCondition } from '@/shared/ts-condition-parser/condition.class';
import { FieldConfig, FieldSettings, FieldStatus } from '../Field.config';
// import { FieldGroupStatus } from './FieldGroup/FieldGroup.dto';
export class ContentFieldStatus extends FieldStatus {
  declare public config: ContentFieldConfig;
  public update(showErrors: boolean = false): FieldStatus {
    this.visible = this.config.visible.calc((key: string) => this.parent.getValueByKey(key));
    return this;
  }
  getValueByKey(path: string): any {
    // splits path around the first slash
    let current = path.split(/\/(.+)/)[0];
    let after = path.split(/\/(.+)/)[1];
    after = after ? after : '';
    if (current == 'Root:') {
      return this.config.root.status.getValueByKey(after);
    } else if (current == '..') {
      return this.parent.getValueByKey(after);
    } else if (current == '') {
      return this;
    }
    return null;
  }
}
export abstract class ContentFieldConfig extends FieldConfig {
  constructor(
    public type: string,
    public settings: FieldSettings,
    public visible: BooleanCondition
  ) {
    super(type, '', settings, visible);
  }
  public getAllPaths(rootPath: string): { path: string, type: string}[] {
    return [];
  }
}