export interface CreditType {
  id: string;
  name: string;
  description: string;
  icon: string;
  percentage: string;
  maxAmount: string;
  deadline: string;
  requirements: string[];
}

export const creditTypes: CreditType[] = [
  {
    id: 'superbonus',
    name: 'Superbonus 110%',
    description: 'Detrazione fiscale per interventi di efficientamento energetico e antisismici',
    icon: 'home',
    percentage: '110%',
    maxAmount: 'Nessun limite',
    deadline: '31 Dicembre 2025',
    requirements: [
      'Interventi su condomini o edifici da 2-4 unità',
      'Miglioramento di almeno 2 classi energetiche',
      'Asseverazione tecnica obbligatoria'
    ]
  },
  {
    id: 'bonus-edilizi',
    name: 'Bonus Edilizi',
    description: 'Detrazioni per ristrutturazioni, ecobonus e bonus facciate',
    icon: 'wrench',
    percentage: '50-90%',
    maxAmount: 'Varia per tipologia',
    deadline: '31 Dicembre 2024',
    requirements: [
      'Interventi di ristrutturazione edilizia',
      'Miglioramento efficienza energetica',
      'Documentazione completa'
    ]
  },
  {
    id: 'crediti-4-0',
    name: 'Crediti Industria 4.0',
    description: 'Credito d\'imposta per investimenti in beni strumentali tecnologici',
    icon: 'cpu',
    percentage: '10-50%',
    maxAmount: '20 milioni €',
    deadline: '31 Dicembre 2024',
    requirements: [
      'Acquisto beni strumentali 4.0',
      'Interconnessione e controllo',
      'Certificazione tecnica'
    ]
  },
  {
    id: 'credito-iva',
    name: 'Credito IVA',
    description: 'Recupero e cessione crediti IVA maturati',
    icon: 'receipt',
    percentage: 'Valore nominale',
    maxAmount: 'Secondo credito',
    deadline: 'Sempre attivo',
    requirements: [
      'Credito IVA certificato',
      'Dichiarazione IVA regolare',
      'Documentazione fiscale'
    ]
  },
  {
    id: 'credito-pa',
    name: 'Crediti P.A.',
    description: 'Crediti verso la Pubblica Amministrazione',
    icon: 'building',
    percentage: 'Valore nominale',
    maxAmount: 'Secondo credito',
    deadline: 'Sempre attivo',
    requirements: [
      'Credito verso ente pubblico',
      'Certificazione debito',
      'Documentazione contrattuale'
    ]
  }
];