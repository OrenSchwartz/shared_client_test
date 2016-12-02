import React, { Component } from 'react'
import intl from 'intl'
import { IntlProvider, addLocaleData } from 'react-intl'
import ru_locale from 'react-intl/locale-data/ru';
import he_locale from 'react-intl/locale-data/he';
import en_locale from 'react-intl/locale-data/en';
import merge from 'assign-deep'
import en from 'translations/en.json'
import en_uk from 'translations/en_uk.json'
import en_us from 'translations/en_us.json'
import ru from 'translations/ru.json'
import he from 'translations/he.json'

addLocaleData([...en_locale,...he_locale,...ru_locale]);

export default class I18NWrapper extends Component {

  render() {
    return (
      <IntlProvider locale={navigator.language} messages={this.getMessages()} >
        {this.props.children}
      </IntlProvider>
    )
  }

  /**
   * Retrieves an object of strings. if the locale is not 'en' it is returned as is. if is 'en_XX' based, it will merge
   * the keys so that the default messages are added if not found.
   *
   * @param enFallbackMessages : The basic 'en' locale string texts which every 'en_XX' falls back to if the string isn't found
   * @param enSpecificMessages : an 'en_XX' or any other locale text messages which are not default. if a string key isn't found, it will take it from the default messages.
   *
   */
  getMessages(){

    let locale = this.getLocale();
    let messages = {};

    if (locale.indexOf('ru') != -1)
      messages = ru;
    else if (locale.indexOf('he') != -1)
      messages = he;
    else if (locale == 'en-uk')
      messages = merge(en, en_uk);
    else if (locale == 'en-us')
      messages = merge(en, en_us);
    else if (locale.indexOf('en') != -1 )
      messages = en;
    else{
      console.error("Could not find message continer for locale " + locale + " - working with en");
      messages = en;
    }

    return messages;
  }

  getQueryVariable(variable)
  {
       var query = window.location.search.substring(1);
       var vars = query.split("&");
       for (var i=0;i<vars.length;i++) {
               var pair = vars[i].split("=");
               if(pair[0] == variable){return pair[1];}
       }
       return(false);
  }

  getLocale(){
    let serverParameters = window.serverParameters;

    var serverParamLanguage = serverParameters ? serverParameters.locale : null;
    return serverParamLanguage ||             // get from the server
          this.getQueryVariable('locale') ||  // if not in the server, get from address
          this.getLocaleFromAddress() ||
          navigator.language.toLowerCase();   // default to the user machine locale.
  }

  getLocaleFromAddress()
  {
    var locale = window.location.pathname.split("/").pop();
    var locales = ['en','en-UK','en-US','ru','he'];
    for (var i = 0; i < locales.length; i++) {
      if(locales[i] == locale) {return locale;}
    }
    return(false);
  }
}
