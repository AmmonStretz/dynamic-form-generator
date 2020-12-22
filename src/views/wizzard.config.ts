import { Required } from '../shared/DynamicForm/Validators/index';
import { NumberInput } from '@/shared/DynamicForm/Field/NumberInput/NumberInput.dto';
import { NumberRange } from '@/shared/DynamicForm/Field/NumberRange/NumberRange.dto';
import { Checkbox } from '@/shared/DynamicForm/Field/Checkbox/Checkbox.dto';
import { TextField } from '@/shared/DynamicForm/Field/TextField/TextField.dto';
import { Form } from '@/shared/DynamicForm/Form/Form.dto';
import { Wizzard } from './../shared/DynamicForm/Wizzard/Wizzard.dto';
import { FieldGroup } from '@/shared/DynamicForm/Field/FieldGroup/FieldGroup.dto';

export const config: Wizzard = new Wizzard([
  new Form([
    new Checkbox('Key00', {
      description: '(Personengesellschaft vs. Kapitalgesellschaft Erklärung)',
      name: 'Handelt es sich bei dem Unternehmen um eine Kapitalgesellschaft?'
    }, [])
  ], {
    title: 'Gesellschaftsform'
  }),
  new Form([
    new NumberInput('Key01', {
      description: 'Hier tragen Sie den aufsummierten Kontostand aller Girokonten Ihres Unternehmens am Tag der Erstellung der Liquiditätsplanung ein.',
      name: 'Kontostand (in Tsd Eur)',
      unit: 'x 1000€'
    }, []),
    new NumberInput('Key02', {
      description: 'Eintragen einer oder mehrerer KK-Linien mit dem jeweiligen Zinssatz. Bei Mehreren bitte aufsummieren.',
      name: 'Kontokorrentlinien'
    },
      [
        new Required('Test')
      ]),
    new NumberRange('Key03', {
      min: 0,
      max: 100,
      step: 1,
      default: 50,
      unit: '%',
      name: 'Kontokorrentlinien Zinssatz'
    },
      [
        new Required('Test')
      ])
  ], {
    title: 'Finanzbestände'
  }),
  new Form([
    new NumberInput('Key04', {
      description: `
        Summe der Waren und/oder Dienstleistungen, für die Sie in der jeweiligen Woche einen Zahlungseingang erwarten.
        Es ist der Bruttobetrag einzutragen inkl. Umsatzsteuer.
      `,
      name: 'Kundenforderungen aus Umsatz',
      unit: '€'
    }, []),
    new NumberInput('Key05', {
      description: `
        Haben Sie vor innerhalb des Betrachtungszeitraumes, Geld
        aus Ihrem privaten Vermögen zum Beispiel in die Kasse oder auf ein Bankkonto
        einzuzahlen? Haben Sie vor Anlagevermögen (z.B. Tische, Maschinen, etc.. ) zu
        verkaufen. Erwarten Sie für einen der Monate eine Steuerrückzahlung? Bekommen
        Sie bereits genehmigte Fördermittel ausgezahlt? Dies können z.B. auch Zuschüsse
        zur Beschäftigung Langzeitarbeitsloser sein oder die Erstattung des
        Kurzarbeitergeldes inkl. Sozialversicherung. Hier können ebenfalls Zinszahlungen auf
        Kapitalvermögen eingetragen werden und Kredite, die Sie ausgezahlt bekommen
        werden oder Einzahlungen von Stammkapital oder Kapitalbeteiligungen. Bitte tragen
        Sie die Beträge für die Woche ein, in der Sie den Zahlungseingang erwarten.
      `,
      name: 'Sonstige Einzahlungen',
      unit: '€'
    }, []),
  ], {
    title: 'Einzahlungen'
  }),
  new Form([
    new NumberInput('Key06', {
      description: `
        Haben Sie vor in einem der Monate Investitionen in Gegenstände
        zu tätigen, die dem Unternehmen “dauerhaft dienen sollen”? Das könnten zum
        Beispiel Maschinen im Fall einer Schreinerei sein oder ein neuer Spiegel im Fall einer
        Tanzschule.
      `,
      name: 'Anlagevermögen',
      unit: '€'
    }, []),
    new NumberInput('Key07', {
      description: `
        Diese enthalten die Löhne und Gehälter der Angestellten des
        Unternehmens sowie alle liquiditätswirksamen Lohnnebenkosten. Diese sind unter
        anderem die Sozialabgaben mit einzubeziehen (also Arbeitgeberbeiträge zu
        Arbeitslosenversicherung, Rentenversicherung und Krankenversicherung), es können
        zudem die sogenannten Umlagen sein zum Thema Lohnfortzahlung und
        Mutterschutz. Rückstellungen, die Sie z.B. für Sonderzahlungen wie Weihnachtsgeld
        oder Tantiemen monatlich einbuchen, sind nicht liquiditätswirksam und dürfen hier
        nicht mit aufgeführt werden.
      `,
      name: 'Personal',
      unit: '€'
    }, []),
    new NumberInput('Key08', {
      description: `
        In dieser Zeile tragen Sie wochengenau Ihre
        Lieferantenverbindlichkeiten ein, die Sie für alle Vorleistungen Ihrer eigenen Produkte
        oder Dienstleistungen in der Woche bezahlen. Auch hier tragen Sie die Bruttobeträge
        inkl. Mehrwertsteuer ein.
        Beispiele:
        Für Einzelhändler: Kosten, die Ihnen beim Kauf der Waren anfallen. (ink. MwSt)
        Für Produzenten: Kosten, die Ihnen zur Produktion ihres Endprodukts anfallen bzw.
        Kosten die Ihnen anfallen, um ihre Dienstleistung zu erbringen.
        Für ein Cafe wäre das zum Beispiel die Kaffeebohnen, die eingekauft werden
        müssen.
      `,
      name: 'Material/Waren/Fremdleistungen',
      unit: '€'
    }, []),
    new NumberInput('Key09', {
      name: 'Miete',
      unit: '€'
    }, []),
    new NumberInput('Key10', {
      name: 'Mietnebenkosten',
      unit: '€'
    }, []),
    new NumberInput('Key11', {
      name: 'Versicherungen',
      unit: '€'
    }, []),
    new NumberInput('Key12', {
      name: 'Telekommunikationskosten',
      unit: '€'
    }, []),
    new NumberInput('Key13', {
      name: 'IT-Kosten',
      unit: '€'
    }, []),
    new NumberInput('Key14', {
      name: 'Leasingraten',
      unit: '€'
    }, []),
    new NumberInput('Key15', {
      description: `
        Haben Sie einen Kredit aufgenommen, so ist ihre
        monatliche Zahlung an die Bank in zwei Teile aufgeteilt: Die Tilgung und die
        Zinszahlung.
        Die Tilgung ist die planmäßige Rückzahlung, also der Teil der den aufgenommen
        Kreditbetrag verringert.
        Die Zinsen dagegen sind dagegen der “Preis” den Sie mit der Bank für die
        Bereitstellung des Kredits vereinbart haben. Die Zinsen werden auf den
        ausstehenden Kreditbetrag erhoben.
        Bitte beachten Sie, dass Sie ggf. keine monatlichen Zahlungen sondern
        quartalsweise oder halbjährliche Zahlungen leisten
        Screenreader-Unterstützung aktiviert.      
      `,
      name: 'Kredittilgung und Zinszahlungen',
      unit: '€'
    }, []),
    new NumberInput('Key16', {
      description: `
        Üblicherweise geben Unternehmen ihre
        Umsatzsteuervoranmeldung monatlich ab. Dabei ist zu beachten, ob Sie eine
        Fristverlängerung beantragt haben oder nicht. Haben Sie keine Fristverlängerung
        beantragt, muss die Umsatzsteuer zum 10. des nächsten Monats gezahlt werden. Im
        Fall der Fistverlängerung ist es der 10. des übernächsten Monats. Sollten Sie die
        Umsatzsteuer nur vierteljährlich anmelden müssen, ist dies in der Liquiditätsplanung
        entsprechend zu berücksichtigen.
        Zudem ist zu beachten, ob Sie die Umsatzsteuer auf vereinnahmte Entgelte (Das
        Geld ist auf dem Konto des Unternehmens eingegangen.) oder vereinbarte Entgelte
        (Sie haben die Rechnung geschrieben, allerdings ist die Zahlung noch nicht
        unbedingt eingegangen.) zahlen müssen.
        Bei der Vorsteuer – also der Umsatzsteuer, die Sie auf Waren und Dienstleistungen
        zu zahlen haben, die Sie für das Unternehmen einkaufen – gilt….??????
        Beachten Sie bitte dabei, dass die Mehrwertsteuersenkung zum 01.01.2021 wieder
        aufgehoben wird.
        Screenreader-Unterstützung aktiviert.      
      `,
      name: 'Umsatzsteuer/Vorsteuer',
      unit: '€'
    }, []),
    new NumberInput('Key17', {
      description: `
        Die Einkommen-, Gewerbe
        und Körperschaftsteuer werden auf das voraussichtliche zu versteuernde kumulierte
        Ergebnis berechnet. Da der Zeithorizont der Liquiditätsplanung lediglich 13 Wochen
        beträgt, sind hier üblicherweise nur die regelmäßig zu leistenden Vorauszahlungen
        einzutragen oder Abschlusszahlungen, sobald ein Bescheid ergangen ist.
      `,
      name: 'Einkommensteuer/ Gewerbesteuer/ Körperschaftsteuer'
    }, []),
    new NumberInput('Key18', {
      description: `
        Freie Entnahmen, Zahlungen von Krankenversicherung und
        weiteren privat veranlassten Kosten.
      `,
      name: 'Privatentnahmen:',
      unit: '€'
    }, []),
  ], {
    title: 'Auszahlungen'
  }),
  new Form([
    new NumberInput('Key19', {
      description: `
        Hier können Sie in die einzelnen Wochen zusätzlich vorhandene Finanzmittel
        eintragen. Dies kann beispielsweise ein bereits vereinbarter Saisonkredit sein, den
        Sie für einen Monat erhalten oder eine Kreditlinie, die Ihnen nur noch einige Wochen
        zur Verfügung steht und nicht über die gesamte Periode der 13 Wochen hinweg.
      `,
      name: 'Korrekturfaktor Finanzmittel',
      unit: '€'
    }, []),
  ], {
    title: 'Korrekturfaktoren'
  })
], {
  title: 'Gaas'
})