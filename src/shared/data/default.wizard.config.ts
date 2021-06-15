const REQUIRED = {
  type: 'required',
  message: 'Dieses Feld muss ausgefüllt werden'
};

// FIRST FORM

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

const CHECKBOX_INSIDE: any = {
  type: 'checkbox',
  key: 'inside',
  settings: {
    name: 'Checkbox in gruppe',
    description: 'bla',
    default: false
  },
  validators: []
};

const CHECKBOX_OUTSIDE: any = {
  type: 'checkbox',
  key: 'outside',
  settings: {
    name: 'Checkbox in gruppe2',
    description: 'bla',
    default: false
  },
  validators: []
};

const NUMBER_RANGE_00: any = {
  type: 'numberRange',
  key: 'X',
  settings: {
    name: 'Name',
    description: 'muss ausgefült werden',
    default: 1,
  },
  validators: [REQUIRED]
};

const NUMBER_INPUT_04: any = {
  type: 'numberInput',
  key: 'F',
  settings: {
    name: 'Geloopt',
    description: 'muss ausgefült werden',
    default: 1,
  },
  validators: [REQUIRED]
};

const FIELD_LOOP_00: any = {
  type: 'fieldLoop',
  key: 'XXX',
  field: NUMBER_INPUT_04,
  settings: {
    name: 'Loop',
    description: 'muss ausgefült werden',
  },
  validators: [],
  condition: { type: 'number-const', value: 3 }
};

const SELECT_00: any = {
  type: 'select',
  key: 'selectKey00',
  options: [
    { name: 'Erste Auswahl (0)', value: 0 },
    { name: 'Zweite Auswahl (1)', value: 1 },
    { name: 'Dritte Auswahl (2)', value: 2 },
  ],
  settings: {
    description: `Beschreibung`,
    name: 'Auswahl',
    default: 1,
  }, validators: [],
  // visible: { type: 'boolean-var', key: 'firstForm.groupOutside.S' }
};
const RADIO_BUTTON_LIST: any = {
  type: 'radioButtonList',
  key: 'selectKey01',
  options: [
    { name: 'Erste Auswahl (0)', value: 0 },
    { name: 'Zweite Auswahl (1)', value: 1 },
    { name: 'Dritte Auswahl (2)', value: 2 },
  ],
  settings: {
    description: `Beschreibung`,
    name: 'Auswahl',
    default: 1
  }, validators: [],
  // visible: { type: 'boolean-var', key: 'firstForm.groupOutside.S' }
};

const TEXT_INPUT_00: any = {
  type: 'textArea',
  key: 'S',
  settings: {
    name: 'asdasd?',
    description: 'muss ausgefült werden',
  },
  validators: [REQUIRED, {type: 'isEmail', message: 'is No Email'}],
  visible:
  // { type: 'boolean-var', key: 'Root:/firstForm/groupOutside/groupInside/inside'}
  { type: 'boolean-var', key: '../inside'}
  // { type: 'boolean-var', key: 'Root:/firstForm/groupOutside/outside'}
  // { type: 'boolean-var', key: 'Root:/firstForm/A'}
};

const GROUP_INSIDE: any = {
  type: 'fieldGroup',
  key: 'groupInside',
  fields: [
    CHECKBOX_INSIDE,
    TEXT_INPUT_00
  ],
  settings: {
    horizontal: false,
    title: 'innen'
  },
  validators: []
  // visible: BOOLEAN_LOGIC
}

const GROUP_OUTSIDE: any = {
  type: 'fieldGroup',
  key: 'groupOutside',
  fields: [
    CHECKBOX_OUTSIDE,
    GROUP_INSIDE
  ],
  settings: {
    horizontal: false,
    title: 'außen'
  },
  validators: []
  // visible: BOOLEAN_LOGIC
}

const FORM_00: any = {
  key: 'firstForm',
  fields: [
    SELECT_00,
    CHECKBOX_00,
    GROUP_OUTSIDE,
    // NUMBER_RANGE_00,
    // FIELD_LOOP_00,
  ],
  settings: {
    title: 'Name der Seite 1'
  }
};

// SECOND FORM

const CHECKBOX_01: any = {
  type: 'checkbox',
  key: 'B',
  settings: {
    name: 'Checkbox',
    default: false,
  },
  validators: []
};

const NUMBER_INPUT_01: any = {
  type: 'numberInput',
  key: 'Y',
  settings: {
    name: 'Test',
    description: 'muss ausgefült werden',
    min: 0,
    max: 100
  },
  validators: [REQUIRED]
}

const NUMBER_INPUT_INGroup: any = {
  type: 'numberInput',
  key: 'YY',
  settings: {
    name: 'Test',
    description: 'muss ausgefült werden',
  },
  validators: [REQUIRED]
}

const Test_GROUP: any = {
  type: 'fieldGroup',
  key: 'groupInLoop',
  fields: [CHECKBOX_00],
  settings: {},
  validators: [],
}
const LOOP_00: any = {
  type: 'fieldLoop',
  key: 'loopKey',
  field: Test_GROUP,
  settings: {
  },
  condition: { type: 'number-const', value: 2 }
}

const NUMBER_INPUT_05: any = {
  type: 'numberInput',
  key: 'XXX',
  settings: {
    name: 'liste[1] == true: ',
    description: 'Dieses Feld wird nur angezeigt, wenn die zweite Checkbox aktiv ist',
    min: 10
  },
  validators: [REQUIRED],
  visible: { type: 'boolean-var', key: 'secondForm.loopKey.1.groupInLoop.B' }
}


const NUMBER_INPUT_06: any = {
  type: 'numberInput',
  key: 'YYY',
  settings: {
    name: 'length >= 5: ',
    description: 'Dieses Feld wird nur angezeigt, wenn der Loop min 5 Elemente besitzt.',
    // min: 10
  },
  validators: [REQUIRED],
  visible: { type: 'GE', left: { type: 'number-var', key: 'secondForm.loopKey.length' }, right: { type: 'number-const', value: 5 } }
}
const EMPTY_GROUP: any = {
  type: 'fieldGroup',
  key: 'MTGroup',
  fields: [],
  settings: {},
  validators: [],
}

const FORM_01: any = {
  key: 'secondForm',
  fields: [
    RADIO_BUTTON_LIST,
    SELECT_00,
    // {
    //   type: 'hyperlink',
    //   text: 'vfadasfaf',
    //   links: [{text: 'Dies ist ein Beispiel', url: 'blabla'}, {text: 'Dies ist ein Beispiel', url: 'blabla'}]
    // },
    CHECKBOX_01,
    TEXT_INPUT_00,
    NUMBER_INPUT_01,
    Test_GROUP,
    // LOOP_00,
    FIELD_LOOP_00
    // NUMBER_INPUT_05,
    // NUMBER_INPUT_06
  ],
  settings: {
    title: 'Name der Seite 2'
  },
  // visible: { type: 'boolean-var', key: 'firstForm.A' }
}

// THIRD FORM CONFIG

const CHECKBOX_02: any = {
  type: 'checkbox',
  key: 'C',
  settings: {
    name: 'Dritte Checkbox'
  },
  validators: []
}

const FORM_02: any = {
  key: 'thirdForm',
  fields: [
    CHECKBOX_02,
  ],
  settings: {
    title: 'Name der Seite 3'
  }
}

// WIZZARD CONFIG

export let defaultWizardConfig: any = {
  forms: [
    FORM_00,
    FORM_01,
    FORM_02,
  ],
  settings: {
    title: 'Title der Fragestrecke',
    submitButtonText: "Fertig",
    prevButtonText: "Zurück",
    nextButtonText: "Weiter",
  }
};