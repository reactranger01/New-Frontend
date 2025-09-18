import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import detector from 'i18next-browser-languagedetector';
import moment from 'moment';
import enTranslation from './translations/en.json';

const resources = {
  en: {
    translation: enTranslation,
  },
};

const locale = ['en'];

i18n.on('languageChanged', (language) => {
  moment.locale(language);

  if (language === i18n.options.fallbackLng[0]) {
    if (window.location.pathname.includes('/' + i18n.options.fallbackLng[0])) {
      const localeUrl = window.location.pathname.replace(
        '/' + i18n.options.fallbackLng[0],
        '',
      );
      window.location.replace(localeUrl.length ? localeUrl : '/');
    } else {
      let pathname = window.location.pathname;

      for (let i = 0; i < locale.length; i++) {
        if (window.location.pathname.includes('/' + locale[i])) {
          pathname = window.location.pathname.replace('/' + locale[i], '');
          window.location.replace(pathname);
          break;
        }
      }
    }
  } else if (!window.location.pathname.includes('/' + language)) {
    let pathname = window.location.pathname;

    for (let i = 0; i < locale.length; i++) {
      if (window.location.pathname.includes('/' + locale[i])) {
        pathname = window.location.pathname.replace(
          '/' + locale[i],
          `/${language}`,
        );
        window.location.replace(pathname);
        return;
      }
    }

    const localeUrl = `${window.location.origin}/${language}${pathname}`;
    window.location.replace(localeUrl);
  }
});

let lngDefault = localStorage.getItem('i18nextLng') || 'en';
const url = window.location.pathname;
const urlArray = url.split('/');

const initialize_i18n = (lngDefault) => {
  i18n
    .use(detector)
    .use(initReactI18next)
    .init({
      resources,
      lng: lngDefault,
      fallbackLng: 'en',
      keySeparator: false,
      interpolation: {
        escapeValue: false,
      },
    });
};

if (urlArray.length > 0 && locale.indexOf(urlArray[1]) !== -1) {
  lngDefault = urlArray[1];
  localStorage.setItem('i18nextLng', lngDefault);
  initialize_i18n(lngDefault);
} else {
  initialize_i18n(lngDefault);
}

export default i18n;
