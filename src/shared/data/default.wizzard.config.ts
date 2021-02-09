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
    default: false
  },
  validators: []
};

const CHECKBOX_INSIDE: any = {
  type: 'checkbox',
  key: 'inside',
  config: {
    name: 'Checkbox in gruppe',
    description: 'bla',
    default: false
  },
  validators: []
};

const CHECKBOX_OUTSIDE: any = {
  type: 'checkbox',
  key: 'outside',
  config: {
    name: 'Checkbox in gruppe2',
    description: 'bla',
    default: false
  },
  validators: []
};

const NUMBER_RANGE_00: any = {
  type: 'numberRange',
  key: 'X',
  config: {
    name: 'Name',
    description: 'muss ausgefült werden',
    default: 1,
  },
  validators: [REQUIRED]
};

const NUMBER_INPUT_04: any = {
  type: 'numberInput',
  key: 'F',
  config: {
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
  config: {
    name: 'Loop',
    description: 'muss ausgefült werden',
  },
  validators: [],
  condition: { type: 'number-var', key: 'X' }
};

const SELECT_00: any = {
  type: 'select',
  key: 'selectKey00',
  options: [
    { name: 'Erste Auswahl (0)', value: 0 },
    { name: 'Zweite Auswahl (1)', value: 1 },
    { name: 'Dritte Auswahl (2)', value: 2 },
  ],
  config: {
    description: `Beschreibung`,
    name: 'Auswahl',
  }, validators: [],
  // visible: { type: 'boolean-var', key: 'firstForm.groupOutside.S' }
};

const TEXT_INPUT_00: any = {
  type: 'numberInput',
  key: 'S',
  config: {
    name: 'Test?',
    description: 'muss ausgefült werden',
  },
  validators: [REQUIRED],
  visible: { type: 'boolean-var', key: 'firstForm.groupOutside.groupInside.inside' }
};

const GROUP_INSIDE: any = {
  type: 'fieldGroup',
  key: 'groupInside',
  fields: [CHECKBOX_INSIDE, TEXT_INPUT_00],
  config: {
    horizontal: false,
    title: 'innen'
  },
  validators: []
  // visible: BOOLEAN_LOGIC
}

const GROUP_OUTSIDE: any = {
  type: 'fieldGroup',
  key: 'groupOutside',
  fields: [CHECKBOX_OUTSIDE, GROUP_INSIDE],
  config: {
    horizontal: false,
    title: 'außen'
  },
  validators: []
  // visible: BOOLEAN_LOGIC
}

const FORM_00: any = {
  key: 'firstForm',
  fields: [SELECT_00,
    CHECKBOX_00,
    GROUP_OUTSIDE,
    // NUMBER_RANGE_00,
    // FIELD_LOOP_00,
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
    name: 'Checkbox',
    default: false,
  },
  validators: []
};

const NUMBER_INPUT_01: any = {
  type: 'numberInput',
  key: 'Y',
  config: {
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
  config: {
    name: 'Test',
    description: 'muss ausgefült werden',
  },
  validators: [REQUIRED]
}

const Test_GROUP: any = {
  type: 'fieldGroup',
  key: 'groupInLoop',
  fields: [CHECKBOX_01, NUMBER_INPUT_INGroup],
  config: {},
  validators: [],
}
const LOOP_00: any = {
  type: 'fieldLoop',
  key: 'loopKey',
  field: Test_GROUP,
  config: {
  },
  condition: { type: 'number-var', key: 'secondForm.Y' }
}

const NUMBER_INPUT_05: any = {
  type: 'numberInput',
  key: 'XXX',
  config: {
    name: 'liste[1] == true: ',
    description: 'Dieses Feld wird nur angezeigt, wenn die zweite Checkbox aktiv ist',
    min: 10
  },
  validators: [REQUIRED],
  visible: { type: 'boolean-and', operators: [{ type: 'boolean-var', key: 'secondForm.loopKey.1.groupInLoop.B' }] }
}


const NUMBER_INPUT_06: any = {
  type: 'numberInput',
  key: 'YYY',
  config: {
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
  config: {},
  validators: [],
}

const FORM_01: any = {
  key: 'secondForm',
  fields: [
    // CHECKBOX_01,//{ type: "boolean-var", name: "checkboxKey02" }
    NUMBER_INPUT_01,
    LOOP_00,
    NUMBER_INPUT_05,
    NUMBER_INPUT_06
  ],
  config: {
    title: 'Name der Seite 2'
  },
  // visible: { type: 'boolean-var', key: 'firstForm.A' }
}

// THIRD FORM CONFIG

const CHECKBOX_02: any = {
  type: 'checkbox',
  key: 'C',
  config: {
    name: 'Dritte Checkbox'
  },
  validators: []
}

const FORM_02: any = {
  key: 'thirdForm',
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
    // FORM_00,
    FORM_01,
    // FORM_02,
  ],
  config: {
    title: 'Title der Fragestrecke',
    submitButtonText: "Fertig",
    prevButtonText: "Zurück",
    nextButtonText: "Weiter",
  }
};