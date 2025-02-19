// import the original type declarations
import 'react-i18next';
// import all namespaces (for the default language, only)
import * as ko from '@/translate/locales/ko.json';

// react-i18next versions higher than 11.11.0
declare module 'react-i18next' {
  // and extend them!
  interface CustomTypeOptions {
    // custom namespace type if you changed it
    // defaultNS: "main";
    // custom resources type
    resources: {
      header: typeof ko.header;
      //   about: typeof ko
    };
  }
}
