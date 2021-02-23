// WIZZARD CONFIG

import { Wizzard } from "../DynamicForm/Wizzard/Wizzard.dto";
import { WizzardParser } from "../DynamicForm/Wizzard/Wizzard.parser";

const REQUIRED = {
  type: 'required',
  message: 'Bitte füll dieses Feld aus'
};

const POSTAL_CODE = {
  type: 'isPostalCode',
  message: 'Eine Postleizahl besteht aus 5 Zahlen zwichen 0 und 9'
}
// const NUMBER_INPUT_01: any = {
//   type: 'numberInput',
//   key: 'Y',
//   config: {
//     name: 'Test',
//     description: 'muss ausgefült werden',
//     min: 0,
//     max: 100
//   },
//   validators: [REQUIRED]
// }
// const LOOP_00: any = {
//   type: 'fieldLoop',
//   key: 'loopKey',
//   field: Test_GROUP,
//   config: {
//   },
//   condition: { type: 'number-var', key: 'secondForm.Y' }
// }

export const afqWizzardConfig: any = {
  forms: [
    {
      key: 'page_00',
      fields: [
        {
          type: 'numberInput',
          key: 'plz',
          config: {
            name: 'Postleitzahl',
            description: 'Bitte gib zuerst deine Postleitzahl an.',
          },
          validators: [REQUIRED, POSTAL_CODE]
        },
      ],
      config: {
        title: 'Wohnort'
      }
    }, {
      key: 'page_01',
      fields: [
        {
          type: 'numberInput', key: 'kidsInAge00', config: {
            name: 'Vorgeburtlich',
            min: 0,
            max: 99,
            default: 0
          }, validators: [REQUIRED],
        },
        {
          type: 'numberInput', key: 'kidsInAge01', config: {
            name: '0- 12 Monate',
            min: 0,
            max: 99,
            default: 0
          }, validators: [REQUIRED],
        },
        {
          type: 'numberInput', key: 'kidsInAge02', config: {
            name: '12- 18 Monate',
            min: 0,
            max: 99,
            default: 0
          }, validators: [REQUIRED],
        },
        {
          type: 'numberInput', key: 'kidsInAge03', config: {
            name: '18- 24 Monate',
            min: 0,
            max: 99,
            default: 0
          }, validators: [REQUIRED],
        },
        {
          type: 'numberInput', key: 'kidsInAge04', config: {
            name: '2 - 3 Jahre',
            min: 0,
            max: 99,
            default: 0
          }, validators: [REQUIRED],
        },
        {
          type: 'numberInput', key: 'kidsInAge05', config: {
            name: '4 - 5 Jahre',
            min: 0,
            max: 99,
            default: 0
          }, validators: [REQUIRED],
        },
        {
          type: 'numberInput', key: 'kidsInAge06', config: {
            name: '5 - 7 Jahre',
            min: 0,
            max: 99,
            default: 0
          }, validators: [REQUIRED],
        },
        {
          type: 'numberInput', key: 'kidsInAge07', config: {
            name: '8 - 10 Jahre',
            min: 0,
            max: 99,
            default: 0
          }, validators: [REQUIRED],
        },
        {
          type: 'numberInput', key: 'kidsInAge08', config: {
            name: '10 - 11 Jahre',
            min: 0,
            max: 99,
            default: 0
          }, validators: [REQUIRED],
        },
        {
          type: 'numberInput', key: 'kidsInAge09', config: {
            name: '12 - 13 Jahre',
            min: 0,
            max: 99,
            default: 0
          }, validators: [REQUIRED],
        },
        {
          type: 'numberInput', key: 'kidsInAge10', config: {
            name: '14 - 15 Jahre',
            min: 0,
            max: 99,
            default: 0
          }, validators: [REQUIRED],
        },
        {
          type: 'numberInput', key: 'kidsInAge11', config: {
            name: '15 - 17 Jahre',
            min: 0,
            max: 99,
            default: 0
          }, validators: [REQUIRED],
        },
        {
          type: 'numberInput', key: 'kidsInAge12', config: {
            name: 'Ab 18 in Ausbildung',
            min: 0,
            max: 99,
            default: 0
          }, validators: [REQUIRED],
        },
      ],
      config: {
        title: 'Anzahl deiner Kinder'
        // 'Wieviel Kinder in welchem Alter leben in deinem Haushalt'
      }
    }, {
      key: 'page_02',
      fields: [
        {
          type: 'select',
          key: 'marialStatus',
          options: [
            { name: 'Ledig', value: 0 },
            { name: 'Eingetragene Lebenspartnerschaft', value: 1 },
            { name: 'Verheiratet - in Trennung', value: 2 },
            { name: 'Verheiratet - in Trennung problematisch', value: 3 },
            { name: 'Verheiratet - in Trennung Gewalterfahrung', value: 4 },
            { name: 'Geschieden', value: 5 },
            { name: 'Verwitwet', value: 6 },
          ],
          config: {
            description: `Beschreibung`,
            name: 'Wie ist dein derzeitiger Familienstand bzw. Lebenssituation',
          }, validators: [REQUIRED]
        },
      ],
      config: {
        title: 'Lebenssituation'
      }
    }, {
      key: 'page_03',
      fields: [
        {
          type: 'radioButtonList',
          key: 'insurenceTyp',
          options: [
            { name: 'Gesetzlich', value: 0 },
            { name: 'Privat', value: 1 },
            { name: 'nicht Versichert', value: 2 },
          ],
          config: {
            name: 'Versicherungstyp',
            default: 0,
          }, validators: []
        },           
        {
          type: 'select',
          key: 'insurencePublic',
          options: [
            { name: 'AOK', value: 0 },
            { name: 'Barmer', value: 1 },
            { name: 'Techniker Krankenkasse', value: 2 },
            { name: 'DAK', value: 3 },
            { name: 'BKK Diakonie ', value: 4 },
            { name: 'Sonstige', value: 5 },
          ],
          config: {
            name: 'Krankenkasse',
          }, validators: [REQUIRED],
          visible: { type: 'EQ', left: { type: 'number-var', key: 'page_03.insurenceTyp' }, right: { type: 'number-const', value: 0 } }
        },
        {
          type: 'select',
          key: 'insurencePrivate',
          options: [
            { name: 'Debeka', value: 0 },
            { name: 'DKV', value: 1 },
            { name: 'Signal Iduna', value: 2 },
            { name: 'Allianz', value: 3 },
            { name: 'Sonstige', value: 4 },
          ],
          config: {
            name: 'Krankenkasse',
          }, validators: [REQUIRED],
          visible: { type: 'EQ', left: { type: 'number-var', key: 'page_03.insurenceTyp' }, right: { type: 'number-const', value: 1 } }
        }
      ], config: {
        title: 'Krankenkasse',
        description: `Beschreibung`,
      }
    }, {
      key: 'page_04',
      fields: [
        {
          type: 'select',
          key: 'jobStatus',
          options: [
            { name: 'Vollzeit', value: 0 },
            { name: 'Teilzeit 80%', value: 1 },
            { name: 'Teilzeit 61 - 79%', value: 2 },
            { name: 'Teilzeit 40 -60%', value: 3 },
            { name: 'Teilzeit 20-39%', value: 4 },
            { name: 'Minijob', value: 5 },
            { name: 'Erweiterter Minijob', value: 6 },
            { name: 'ALG II', value: 7 },
            { name: 'Hartz iV', value: 8 },
            { name: 'Sozialhilfe', value: 9 },
            { name: 'Studium', value: 10 },
            { name: 'In Ausbildung', value: 11 },
            { name: 'Berufsunfähigkeitsrente', value: 12 },
            { name: 'Eigenes Unternehmen', value: 13 },
          ],
          config: {
            description: `Beschreibung`,
            name: 'Beschäftigungsstatus:',
          }, validators: [REQUIRED]
        },
      ], config: {
        title: 'Art der Beschäftigung'
      }
    },
    {
      key: 'page_05',
      fields: [
        {
          type: 'numberInput', key: 'income', config: {
            description: `Beschreibung`,
            name: 'Einkommen pro Monat',
            unit: '€',
            min: 0,
          }, validators: [REQUIRED]
        },
      ], config: {
        title: 'Einkommen'
      }
    },
    {
      key: 'page_06',
      fields: [
        {
          type: 'numberInput', key: 'Key19', config: {
            description: `Beschreibung`,
            name: 'Mietkosten',
            unit: '€',
            min: 0,
          }, validators: [REQUIRED]
        },
      ], config: {
        title: 'Wohnsituation'
      }
    }
  ],
  config: {
    title: 'AFQ',
    submitButtonText: "Fertig",
    prevButtonText: "Zurück",
    nextButtonText: "Weiter",
  }
};