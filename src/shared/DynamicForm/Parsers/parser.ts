// import { Wizzard } from './Wizzard/Wizzard.dto';
// import { TextField } from './Field/TextField/TextField.dto';
// import { Form } from './Form/From.dto';
// import { NumberInput } from './Field/NumberInput/NumberInput.dto';
// import { Field } from './Field/Field.dto';
// import { Validator } from './validators.class';

// export class JsonParser {
//   public static toWizzard(json: any): Wizzard {
//     return new Wizzard(
//       this.toForms(json.forms),
//       json.config
//     )
//   }
//   public static toForms(jsonArray: any[]): Form[] {
//     let forms: Form[] = [];
//     jsonArray.forEach(json => {
//       forms.push(this.toForm(json));
//     });
//     return forms;
//   }
//   public static toForm(json: any): Form {
//     return new Form(
//       this.toFields(json.fields),
//       json.config
//     )
//   }
//   public static toFields(
//     jsonArray: any[]
//   ): Field[] {
//     let fields: Field[] = [];
//     jsonArray.forEach(json => {
//       fields.push(this.toField(json));
//     });
//     return fields;
//   }
//   public static toField(
//     json: any
//   ): Field<any> {
    
//     if (json.type == 'NumberInput') {
//       console.log(json);
//       return this.toNumberInput(
//         json
//       );
//     } else {
//       console.log(json);
//       return this.toTextField(
//         json
//       );
//     }
//   }

//   public static toTextField(json: any): TextField {
//     return new TextField(
//       json.text
//     )
//   }
//   public static toNumberInput(json: {
//     key: string,
//     validators: {
//       type: string,
//       message: string,
//       value?: any
//     }[],
//     config: { [key: string]: any }
//   }): NumberInput {
//     return new NumberInput(
//       json.key,
//       json.config,
//       Validator.parseFromJSONArray(json.validators)
//     );
//   }
// }