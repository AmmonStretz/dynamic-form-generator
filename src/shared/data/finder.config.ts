// WIZZARD CONFIG
const REQUIRED = {
  type: 'required',
  message: 'Bitte füll dieses Feld aus'
};

const STRING_INPUT_00: any = {
  type: 'numberInput',
  key: 'Y',
  settings: {
    name: 'text',
    description: 'muss ausgefült werden',
  },
  validators: [REQUIRED]
}
const CHECKBOX_00: any = {
  type: 'checkbox',
  key: 'A',
  settings: {
    name: 'Überspringen?',
    description: 'Soll Seite zwei übersprungen werden?',
    default: false
  },
  validators: []
};

const FORM_00: any = {
  key: 'firstForm',
  fields: [
    STRING_INPUT_00,
    STRING_INPUT_00,
    STRING_INPUT_00,
  ],
  settings: {
    title: 'Name der Seite 1'
  }
};
const FORM_01: any = {
  fields: [
    CHECKBOX_00,
  ],
  settings: {
    title: 'Name der Seite 2'
  }
};

export const finderConfig: any = {
  chapter: {
    children: [{
      children: [{
        pages: [],
        children: [],
        settings: { title: 'Kapitel A1' }
      }],
      settings: { title: 'Kapitel A' }
    },
    // {
    //   children: [],
    //   pages: [ FORM_01],
    //   settings: { title: 'Kapitel B' }
    // }, {
    //   children: [{
    //     pages: [FORM_00, FORM_01],
    //     children: [],
    //     settings: {title: 'Kapitel C1'}
    //   }],
    //   pages: [],
    //   settings: { title: 'Kapitel C' }
    // }
  ],
    settings: {}
  },
  // wizards: [{
  //   forms: [FORM_00, FORM_01],
  //   settings: {
  //     title: 'Kapitel 1',
  //     submitButtonText: "Fertig",
  //     prevButtonText: "Zurück",
  //     nextButtonText: "Weiter",
  //   }
  // }, {
  //   forms: [],
  //   settings: {
  //     title: 'Kapitel 2',
  //     submitButtonText: "Fertig",
  //     prevButtonText: "Zurück",
  //     nextButtonText: "Weiter",
  //   }
  // }],
  settings: {
    title: 'Bafögantrag',
    submitButtonText: "Fertig",
    prevButtonText: "Zurück",
    nextButtonText: "Weiter",
  }
};