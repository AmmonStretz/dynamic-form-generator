// import { Validator } from './validators.class';

// export class FormDTO {
//   constructor(
//     public title: string,
//     public description: string,
//     public component: FormElementDTO<any>
//   ) { }
//   public static fromJSON(dto: any): FormDTO {
//     return new FormDTO(
//       dto.title,
//       dto.description,
//       FormElementDTO.fromJSON(dto.start)
//     )
//   }
// }

// export enum FormElementType {
//   NUMBER_INPUT,
//   SELECT
// }

// export abstract class FormElementDTO<T> {
//   constructor(
//     public key: string,
//     // TODO: conditional children
//     public child?: FormElementDTO<any>,
//     public config?: {
//       default?: T,
//       placeholder?: string,
//       question?: string,
//       descritpion?: string,
//     },
//     public validators: Validator<T>[] = [],
//   ) { }

//   public static fromJSON(dto: any): FormElementDTO<any> {
//     switch (dto.type) {
//       case FormElementType.SELECT:
//         return SelectDTO.fromJSON(dto);
//       default:
//         return NumberInputDTO.fromJSON(dto);
//     }
//   }
// }

// export class NumberInputDTO extends FormElementDTO<number> {
//   constructor(
//     public key: string,
//     // TODO: conditional children
//     public child?: FormElementDTO<any>,
//     public config?: {
//       default?: number,
//       placeholder?: string,
//       question?: string,
//       descritpion?: string,
//     },
//     public validators: Validator<number>[] = [],
//   ) {
//     super(key, child, config, validators);
//   }
//   public static fromJSON(dto: any): NumberInputDTO {
//     return new NumberInputDTO(
//       dto.key,
//       dto.child,
//       dto.config,
//       dto.validators
//     );
//   }
// }
// export class SelectDTO extends FormElementDTO<number> {
//   constructor(
//     public key: string,
//     public options: { [key: number]: string },
//     public child?: FormElementDTO<any>,
//     public config?: {
//       default?: number,
//       placeholder?: string,
//       question?: string,
//       descritpion?: string,
//     },
//     // TODO: conditional children
//     public validators: Validator<number>[] = [],
//   ) {
//     super(key, child, config, validators);
//   }
//   public static fromJSON(dto: any): FormElementDTO<number> {
//     return new SelectDTO(
//       dto.key,
//       dto.options,
//       dto.child,
//       dto.config,
//       dto.validators
//     )
//   }
// }
