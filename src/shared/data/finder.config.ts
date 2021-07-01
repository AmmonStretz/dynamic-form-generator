// WIZZARD CONFIG
const REQUIRED = {
  type: 'required',
  message: 'Bitte füll dieses Feld aus'
};

const PARAGRAPH_00: any = {
  type: 'paragraph',
  text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
  settings: {
    name: 'Titel des Absatzes'
  }
}

const STRING_INPUT_00: any = {
  type: 'numberInput',
  key: 'Y',
  settings: {
    name: 'Alter',
    description: 'Bitte füllen Sie dieses Feld aus mit einer Zahl größergleich 0',
    placeholder: 'Zahl'
  },
  validators: [REQUIRED]
}
const CHECKBOX_00: any = {
  type: 'checkbox',
  key: 'A',
  settings: {
    name: 'Sind Sie ein Mensch?',
    default: false
  },
  validators: []
};

const FORM_00: any = {
  key: 'firstForm',
  fields: [
    STRING_INPUT_00,
    CHECKBOX_00
  ],
  settings: {
    title: 'Persönliche Daten'
  }
};
const FORM_01: any = {
  fields: [
    PARAGRAPH_00
  ],
  settings: {
    title: 'Informationstext'
  }
};

export const finderConfig: any = {
  chapter: {
    children: [{
      children: [{
        pages: [FORM_00, FORM_01],
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
    title: 'Name der Fragestrecke',
    submitButtonText: "Fertig",
    prevButtonText: "Zurück",
    nextButtonText: "Weiter",
  }
};