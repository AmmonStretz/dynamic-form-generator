// WIZZARD CONFIG
const REQUIRED = {
  type: 'required',
  message: 'Bitte füll dieses Feld aus'
};
const IS_EMAIL = {
  type: 'isEmail',
  message: 'Ist keine Email.'
};

const PARAGRAPH_00: any = {
  type: 'paragraph',
  text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.',
  settings: {
    name: 'Titel des Absatzes'
  }
}
const PARAGRAPH_01: any = {
  type: 'paragraph',
  text: 'Testtext',
  settings: {
    name: 'Titel des Absatzes'
  }
}
const PARAGRAPH_02: any = {
  type: 'paragraph',
  text: 'blabla',
  settings: {
    name: 'Titel 02'
  }
}

const STRING_INPUT_00: any = {
  type: 'textInput',
  key: 'StringInput',
  settings: {
    name: 'Name',
    description: 'Bitte tragen Sie hier ihren vollständigen Namen ein.',
    placeholder: 'Vor- und Nachname',
    maxLength: 30,
    showLength: true,
  },
  validators: [REQUIRED],
  visible: { type: 'boolean-and', operators: [{ type: 'EQ', first: { type: 'boolean-var', key: 'Root:/0/0/0/CheckboxInput' }, second: { type: 'boolean-const', value: false } }]}
}
const NUMBER_INPUT_00: any = {
  type: 'numberInput',
  key: 'Alter',
  settings: {
    name: 'Alter',
    description: 'Bitte tragen Sie hier ihren vollständigen Namen ein.',
    placeholder: 'Alter eintragen',
    showLength: true,
  },
  validators: [REQUIRED]
}
const NUMBER_INPUT_01: any = {
  type: 'numberInput',
  key: 'Geld',
  settings: {
    name: 'Geld',
    description: '',
    placeholder: 'Geld eintragen',
    showLength: true,
  },
  validators: [REQUIRED]
}
const CHECKBOX_00: any = {
  type: 'checkbox',
  key: 'CheckboxInput',
  settings: {
    name: 'Sind Sie ein Mensch?',
    default: false
  },
  validators: []
};

const FORM_00: any = {
  key: 'firstForm',
  fields: [
    CHECKBOX_00,
    // NUMBER_INPUT_00,
    // NUMBER_INPUT_01,
    // STRING_INPUT_00,
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
  },
  visible: { type: 'boolean-and', operators: [{ type: 'EQ', first: { type: 'boolean-var', key: 'Root:/0/0/0/CheckboxInput' }, second: { type: 'boolean-const', value: true } }]}
};
const FORM_02: any = {
  fields: [
    PARAGRAPH_01
  ],
  settings: {
    title: 'Informationstext 2'
  },
};
const FORM_03: any = {
  fields: [
    PARAGRAPH_02
  ],
  settings: {
    title: 'Information'
  },
};

export const finderConfig: any = {
  chapter: {
    children: [{
      children: [{
        pages: [FORM_00, FORM_01, FORM_02],
        children: [],
        settings: { title: 'Kapitel A1', showTitle: true }
      }, {
        pages: [FORM_03],
        children: [],
        settings: { title: 'Kapitel A2', showTitle: true }
      }],
      settings: { title: 'Kapitel A', showTitle: true }
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