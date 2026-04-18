// Brand system extracted from advancedallergy.com
export const brand = {
  colors: {
    primary: '#159948',
    primaryDark: '#0f6c33',
    primaryLight: '#23c663',
    primaryAccent: '#8befb2',
    primaryDeep: '#093f1e',
    gray: '#616060',
    grayLight: '#e0e0e0',
    black: '#0a0a0a',
    white: '#ffffff',
    blueForm: '#0384d7',
  },
  fontFamily: {
    sans: ['Lato', 'system-ui', 'sans-serif'],
  },
  practice: {
    name: 'Advanced Allergy & Asthma Associates',
    physician: 'Swapnil Vaidya, MD PhD',
    specialty: 'Allergy, Asthma & Immunology',
    locations: [
      {
        name: 'Fort Worth - Beach St',
        address: '9433 N. Beach Street, Ste 111',
        city: 'Fort Worth, TX 76244',
        phone: '(817) 428-7000',
        fax: '(817) 428-7006',
      },
      {
        name: 'Fort Worth - Tarrant Pkwy',
        address: '5320 N. Tarrant Pkwy, Ste 220',
        city: 'Fort Worth, TX 76244',
        phone: '(817) 410-2111',
        fax: '(817) 428-7006',
      },
    ],
    website: 'www.advancedallergy.com',
    phone: '(817) 428-7000',
    fax: '(817) 428-7006',
  },
} as const;