// WIZZARD CONFIG

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
//   settings: {
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
//   settings: {
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
          settings: {
            name: 'Postleitzahl',
            description: 'Bitte gib zuerst deine Postleitzahl an.',
          },
          validators: [REQUIRED, POSTAL_CODE]
        },
      ],
      settings: {
        title: 'Wohnort'
      }
    }, {
      key: 'page_01',
      fields: [
        {
          type: 'numberInput', key: 'kidsInAge00', settings: {
            name: 'Vorgeburtlich',
            min: 0,
            max: 99,
            default: 0
          }, validators: [REQUIRED],
        },
        {
          type: 'numberInput', key: 'kidsInAge01', settings: {
            name: '0- 12 Monate',
            min: 0,
            max: 99,
            default: 0
          }, validators: [REQUIRED],
        },
        {
          type: 'numberInput', key: 'kidsInAge02', settings: {
            name: '12- 18 Monate',
            min: 0,
            max: 99,
            default: 0
          }, validators: [REQUIRED],
        },
        {
          type: 'numberInput', key: 'kidsInAge03', settings: {
            name: '18- 24 Monate',
            min: 0,
            max: 99,
            default: 0
          }, validators: [REQUIRED],
        },
        {
          type: 'numberInput', key: 'kidsInAge04', settings: {
            name: '2 - 3 Jahre',
            min: 0,
            max: 99,
            default: 0
          }, validators: [REQUIRED],
        },
        {
          type: 'numberInput', key: 'kidsInAge05', settings: {
            name: '4 - 5 Jahre',
            min: 0,
            max: 99,
            default: 0
          }, validators: [REQUIRED],
        },
        {
          type: 'numberInput', key: 'kidsInAge06', settings: {
            name: '5 - 7 Jahre',
            min: 0,
            max: 99,
            default: 0
          }, validators: [REQUIRED],
        },
        {
          type: 'numberInput', key: 'kidsInAge07', settings: {
            name: '8 - 10 Jahre',
            min: 0,
            max: 99,
            default: 0
          }, validators: [REQUIRED],
        },
        {
          type: 'numberInput', key: 'kidsInAge08', settings: {
            name: '10 - 11 Jahre',
            min: 0,
            max: 99,
            default: 0
          }, validators: [REQUIRED],
        },
        {
          type: 'numberInput', key: 'kidsInAge09', settings: {
            name: '12 - 13 Jahre',
            min: 0,
            max: 99,
            default: 0
          }, validators: [REQUIRED],
        },
        {
          type: 'numberInput', key: 'kidsInAge10', settings: {
            name: '14 - 15 Jahre',
            min: 0,
            max: 99,
            default: 0
          }, validators: [REQUIRED],
        },
        {
          type: 'numberInput', key: 'kidsInAge11', settings: {
            name: '15 - 17 Jahre',
            min: 0,
            max: 99,
            default: 0
          }, validators: [REQUIRED],
        },
        {
          type: 'numberInput', key: 'kidsInAge12', settings: {
            name: 'Ab 18 in Ausbildung',
            min: 0,
            max: 99,
            default: 0
          }, validators: [REQUIRED],
        },
      ],
      settings: {
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
          settings: {
            description: `Beschreibung`,
            name: 'Wie ist dein derzeitiger Familienstand bzw. Lebenssituation',
          }, validators: [REQUIRED]
        },
      ],
      settings: {
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
          settings: {
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
          settings: {
            name: 'Krankenkasse',
          }, validators: [REQUIRED],
          visible: { type: 'EQ', left: { type: 'number-var', key: 'Root:/page_03/insurenceTyp' }, right: { type: 'number-const', value: 0 } }
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
          settings: {
            name: 'Krankenkasse',
          }, validators: [REQUIRED],
          visible: { type: 'EQ', left: { type: 'number-var', key: 'Root:/page_03/insurenceTyp' }, right: { type: 'number-const', value: 1 } }
        }
      ], settings: {
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
          settings: {
            description: `Beschreibung`,
            name: 'Beschäftigungsstatus:',
          }, validators: [REQUIRED]
        },
      ], settings: {
        title: 'Art der Beschäftigung'
      }
    },
    {
      key: 'page_05',
      fields: [
        {
          type: 'numberInput', key: 'income', settings: {
            description: `Beschreibung`,
            name: 'Einkommen pro Monat',
            unit: '€',
            min: 0,
          }, validators: [REQUIRED]
        },
      ], settings: {
        title: 'Einkommen'
      }
    },
    {
      key: 'page_06',
      fields: [
        {
          type: 'numberInput', key: 'Key19', settings: {
            description: `Beschreibung`,
            name: 'Mietkosten',
            unit: '€',
            min: 0,
          }, validators: [REQUIRED]
        },
      ], settings: {
        title: 'Wohnsituation'
      }
    }
  ],
  settings: {
    title: 'AFQ',
    submitButtonText: "Fertig",
    prevButtonText: "Zurück",
    nextButtonText: "Weiter",
  }
};