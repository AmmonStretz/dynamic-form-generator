const REQUIRED = {
  type: 'required',
  message: 'Dieses Feld muss ausgefüllt werden'
};

// FIRST FORM

const CHECKBOX_00: any = {
  type: 'checkbox',
  key: 'A',
  config: {
    name: 'Überspringen?',
    description: 'Soll Seite zwei übersprungen werden?',
    default: true
  },
  validators: []
};

const NUMBER_INPUT_00: any = {
  type: 'numberInput',
  key: 'X',
  config: {
    name: 'Test?',
    description: 'muss ausgefült werden'
  },
  validators: [REQUIRED]
};

const TEXT_INPUT_00: any = {
  type: 'textInput',
  key: 'S',
  config: {
    name: 'Test?',
    description: 'muss ausgefült werden',
  },
  validators: [REQUIRED]
};

const SELECT_00: any = {
  type: 'select',
  key: 'marialStatus',
  options: [
    { name: 'Erste Auswahl (0)', value: 0 },
    { name: 'Zweite Auswahl (1)', value: 1 },
    { name: 'Dritte Auswahl (2)', value: 2 },
  ],
  config: {
    description: `Beschreibung`,
    name: 'Wie ist dein derzeitiger Familienstand bzw. Lebenssituation',
  }, validators: []
};

const FORM_00: any = {
  fields: [
    CHECKBOX_00,
    NUMBER_INPUT_00,
    SELECT_00,
    TEXT_INPUT_00,
  ],
  config: {
    title: 'Name der Seite 1'
  }
};

// SECOND FORM

const CHECKBOX_01: any = {
  type: 'checkbox',
  key: 'B',
  config: {
    name: 'Checkbox 2'
  },
  validators: []
};

const NUMBER_INPUT_01: any = {
  type: 'numberInput',
  key: 'Y',
  config: {
    name: 'Test?',
    description: 'muss ausgefült werden'
  },
  validators: [REQUIRED]
}

const FORM_01: any = {
  fields: [
    CHECKBOX_01,//{ type: "boolean-var", name: "checkboxKey02" }
    NUMBER_INPUT_01,
  ],
  config: {
    title: 'Name der Seite 2'
  },
  visible: { type: "boolean-var", key: "A" }
}

// THIRD FORM CONFIG

const CHECKBOX_02: any = {
  type: 'checkbox',
  key: 'C',
  config: {
    name: 'Checkbox 3'
  },
  validators: []
}

const FORM_02: any = {
  fields: [
    CHECKBOX_02,
  ],
  config: {
    title: 'Name der Seite 3'
  }
}

// WIZZARD CONFIG

export let defaultWizzardConfig: any = {
  forms: [
    FORM_00,
    FORM_01,
    FORM_02,
  ],
  config: {
    title: 'Title der Fragestrecke',
    submitButtonText: "Fertig",
    prevButtonText: "Zurück",
    nextButtonText: "Weiter",
  }
};