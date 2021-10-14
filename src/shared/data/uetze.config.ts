// WIZZARD CONFIG
const REQUIRED = {
  type: 'required',
  message: 'Bitte füllen Sie dieses Feld aus'
};
const IS_EMAIL = {
  type: 'isEmail',
  message: 'Ist keine Email.'
};


const PRENAME: any = {
  type: 'textInput',
  key: 'Vorname',
  settings: {
    name: 'Vorname',
    placeholder: 'Vorname',
    maxLength: 100,
    default: 'Julia'
  },
  validators: [REQUIRED],
}
const PRENAME1: any = {
  type: 'textInput',
  key: 'Vorname',
  settings: {
    name: 'Vorname',
    placeholder: 'Vorname',
    maxLength: 100,
    default: 'Cornelia'
  },
  validators: [REQUIRED],
}
const PRENAME2: any = {
  type: 'textInput',
  key: 'Vorname',
  settings: {
    name: 'Vorname',
    placeholder: 'Vorname',
    maxLength: 100,
    default: 'Cornelius'
  },
  validators: [REQUIRED],
}
const SURENAME: any = {
  type: 'textInput',
  key: 'Nachname',
  settings: {
    name: 'Nachname',
    placeholder: 'Nachname',
    maxLength: 100,
    default: 'Müller'
  },
  validators: [REQUIRED],
}

const AGE: any = {
  type: 'numberInput',
  key: 'Alter',
  settings: {
    name: 'Alter',
    placeholder: '0',
    showLength: true,
    min: 0,
    max: 18,
    default: 2
  },
  validators: [REQUIRED]
}


const TextInput: any = {
  type: 'textInput',
  key: 'TextInput',
  settings: {
    name: 'TextInput',
    placeholder: 'test'
  },
  validators: [REQUIRED],
}
const NUMBER_INPUT: any = {
  type: 'numberInput',
  key: 'NumberInput',
  settings: {
    name: 'NumberInput',
    placeholder: '0'
  },
  validators: [REQUIRED]
}
const LOOP_GROUP: any = {
  type: 'fieldGroup',
  key: 'loopGroup',
  fields: [
    TextInput,
    NUMBER_INPUT
  ],
  settings: {
    title: 'Vater'
  }
}
const LOOP: any = {
  type: 'fieldLoop',
  key: 'loop',
  settings: {},
  field: LOOP_GROUP,
  condition: { type: 'number-var', key: 'Root:/0/Alter' }
}

const PAGE_00: any = {
  key: 'child',
  fields: [
    PRENAME,
    SURENAME,
    AGE,
    // LOOP
  ],
  settings: {
    title: 'Daten des Kindes'
  }
};

const FATHER: any = {
  type: 'fieldGroup', key: 'vater',
  fields: [
    PRENAME2,
    SURENAME
  ],
  settings: {
    title: 'Vater'
  }
}
const MOTHER: any = {
  type: 'fieldGroup', key: 'mutter',
  fields: [
    PRENAME1,
    SURENAME
  ],
  settings: {
    title: 'Mutter'
  }
}
const EMAIL: any = {
  type: 'emailInput',
  key: 'Email',
  settings: {
    name: 'Email',
    description: 'Bitte geben Sie die Emailadresse an, unter der wir Sie erreichen können.',
    placeholder: 'aaa@bbb.de',
    maxLength: 100,
    default: 'cornelia-müller@gmail.com'
  },
  validators: [REQUIRED, IS_EMAIL],
}

const PAGE_01: any = {
  key: 'eltern',
  fields: [
    MOTHER,
    FATHER,
    EMAIL
  ],
  settings: {
    title: 'Daten der Eltern'
  }
};
const HOLIDAY_CARD: any = {
  type: 'checkbox',
  key: 'ferienkarte',
  settings: {
    name: 'Ferienkarte vorhanden?',
    default: false,
    description: 'Definition der Ferienkarte'
  },
  validators: []
};
const LINKS: any = {
  type: 'hyperlink',
  links: [{text: 'der Link zur Beantragung', url: 'bla'}]
}
const PAGE_02: any = {
  key: 'other',
  fields: [
    HOLIDAY_CARD,
    // LINKS
  ],
  settings: {
    title: 'Sonstiges'
  }
};

export const finderConfig: any = {
  chapter: {
    pages: [
      PAGE_00,
      PAGE_01,
      PAGE_02
    ],
    children: [],
    settings: { title: '', showTitle: false }
  },
  settings: {
    title: 'Anmeldung',
    submitButtonText: "Fertig",
    prevButtonText: "Zurück",
    nextButtonText: "Weiter",
  }
};