// WIZZARD CONFIG

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
    CHECKBOX_00,
  ],
  settings: {
    title: 'Name der Seite 1'
  }
};
const FORM_01: any = {
  key: 'secondForm',
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
        children: [],
        settings: { title: 'Kapitel A1' }
      }, {
        children: [],
        settings: { title: 'Kapitel A2' }
      }],
      settings: { title: 'Kapitel A' }
    }, {
      children: [{
        children: [],
        settings: { title: 'Kapitel B1' }
      }, {
        children: [],
        settings: { title: 'Kapitel B2' }
      }],
      settings: { title: 'Kapitel B' }
    }, {
      children: [],
      settings: { title: 'Kapitel C' }
    }],
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