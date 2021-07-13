// import { FieldSettings, FieldStatus } from '../Field.config';
// import { FieldConfig } from '../Field.config';
// import { ValueFieldConfig, ValueFieldSettings, ValueFieldStatus } from '../ValueFields/ValueField.config';
// import { WizardConfig } from '../../Wizard/Wizard.config';
// import { FieldGroupConfig, FieldGroupStatus } from '../FieldGroup/FieldGroup.config';
// import { FieldParser } from '../Field.parser';
// import { PluginService } from '../../services/Plugin.service';
// import { BooleanCondition, NumberCondition } from '@/shared/ts-condition-parser/condition.class';
// import { NumberConst } from '@/shared/ts-condition-parser/objects/number.class';
// import { BooleanConst } from '@/shared/ts-condition-parser/objects/boolean.class';

// export class FieldLoopStatus extends FieldStatus {

//   public config: FieldLoopConfig;
//   constructor(
//     public key: string,
//     public isValid?: boolean,
//     public visible: boolean = true,
//   ) {
//     super(key, isValid, visible);
//   }
//   public update(showErrors: boolean = false): FieldLoopStatus {
//     this.config.updateFields()
//     let valide = true;
//     this.children.forEach(child => {
//       let childStatus: FieldStatus;
//       if (child instanceof ValueFieldStatus) {
//         childStatus = (child as ValueFieldStatus<any>).update(showErrors);
//       }
//       if (child instanceof FieldGroupStatus) {
//         childStatus = (child as FieldGroupStatus).update(showErrors);
//       }
//       if (child instanceof FieldLoopStatus) {
//         childStatus = (child as FieldLoopStatus).update(showErrors);
//       }
//       if (!childStatus.isValid && !!childStatus.visible) {
//         valide = false;
//       }
//     });
//     this.isValid = valide;
//     this.visible =  = this.config.visible.calc((key) =>
      // this.config.status.getValueByKey(key)
      // );
//     return this;
//   }

//   // TODO: Is parsing necessary 
//   public showAllErrors(): void {

//     this.children.forEach(child => {
//       if (child instanceof ValueFieldStatus) {
//         (child as ValueFieldStatus<any>).showAllErrors();
//       } else if (child instanceof FieldLoopStatus) {
//         (child as FieldLoopStatus).showAllErrors();
//       } else if (child instanceof FieldGroupStatus) {
//         (child as FieldGroupStatus).showAllErrors();
//       }
//     });
//     return null;
//   }

//   getValueByKey(path: string): any {
//     let current = path.split(/\/(.+)/)[0];
//     let after = path.split(/\/(.+)/)[1];
//     if (current == 'Root:') {
//       return this.config.root.status.getValueByKey(after);
//     } else if (current == '..') {
//       return this.parent.getValueByKey(after);
//     } else if (+current != NaN && typeof +current == "number") {
//       const index = +current;
//       if (this.children.length > index && index >= 0) {
//         if (this.children[index] instanceof ValueFieldStatus) {
//           return (this.children[index] as ValueFieldStatus<any>);
//         } else if (this.children[index] instanceof FieldLoopStatus) {
//           return (this.children[index] as FieldLoopStatus).getValueByKey(after);
//         } else if (this.children[index] instanceof FieldGroupStatus) {
//           return (this.children[index] as FieldGroupStatus).getValueByKey(after);
//         }
//       }
//     }
//     if (current == 'length') {
//       return this.config.fields.length;
//     }
//     return null;
//   }
// }

// export interface FieldLoopSettings extends FieldSettings {
//   title?: string,
//   horizontal?: boolean;
//   description?: string;
// }

// export class FieldLoopConfig extends FieldConfig {

//   public fields: FieldConfig[] = [];
//   public status: FieldLoopStatus;

//   constructor(
//     public key: string,
//     public field: FieldConfig,
//     public settings: FieldLoopSettings,
//     public visible: BooleanCondition = new BooleanConst(true),
//     public condition: NumberCondition = new NumberConst(1)
//   ) {
//     super(
//       'fieldLoop',
//       key,
//       settings,
//       visible
//     );
//   }
//   public createStatus() {

//     // TODO: parent
//     this.status = new FieldLoopStatus(
//       this.key,
//     )
//     this.status.config = this;
//   }

//   public updateFields() {

//     console.log(this.condition);
    
//     let newNumber = this.condition.calc((key) => {
//       console.log(key, this.status, this.status.getValueByKey(key));
//       return this.status.getValueByKey(key)
//     });
//     console.log({ newNumber });

//     if (newNumber > this.fields.length) {
//       while (newNumber > this.fields.length) {
//         console.log(newNumber);

//         // console.log(JSON.stringify(this.field));
//         this.fields.push(FieldParser.parseFromJSON(JSON.parse(JSON.stringify(this.field))));
//       }
//     } else {
//       this.fields = this.fields.splice(0, newNumber);
//     }
//   }

//   public updateValidity() {

//     if (this.field instanceof ValueFieldConfig) {
//       if (!this.field.status.visible) {
//         this.status.isValid = true;
//       }
//     } else if (this.field instanceof FieldGroupConfig) {
//       (this.field as FieldGroupConfig).updateValidity();
//       if (!this.field.visible) {
//         this.status.isValid = true;
//       }
//     } else if (this.field instanceof FieldLoopConfig) {
//       (this.field as FieldLoopConfig).updateValidity();
//       if (!this.field.visible) {
//         this.status.isValid = true;
//       }
//     }
//   }

//   public toJson() {

//     return {
//       type: this.type,
//       field: this.field,
//       settings: this.settings,
//       visible: this.visible,
//     }
//   }
// }
