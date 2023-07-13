import style from "./minimized.module.scss";
import localization from "./i18.json";
import config from "./config.json";

import {
  useCookieConsentDialogIsVisibleContext,
  useCookieConsentDialogSetVisibleContext,
} from "./context";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function MinimizedCookieConsentDialog() {
  const analyticIDs = config.googleAnalytics; //grab all the google analytics IDs from config

  const cookieConsetDialogIsVisible = useCookieConsentDialogIsVisibleContext();
  const cookieConsentDialogSetVisible =
    useCookieConsentDialogSetVisibleContext();

  const [buttonStyle, setButtonStyle] = useState(style.button);

  useEffect(() => {
    if(cookieConsetDialogIsVisible){
      setButtonStyle(style.button);
    }else{
      setButtonStyle(`${style.button} ${style.show}`);
    }
  }, [cookieConsetDialogIsVisible]);

  //localization and page events
  const { locale, defaultLocale } = useRouter();
  
  if (!analyticIDs.length) return null; //if no analytics defined we dont need the consent popup
  
  const useLocale = locale || defaultLocale || "en"; //figure out the locale
  const texts = localization[useLocale]; //this can later be changed to use nextJS i18 useTranslator

  return <div onClick={() => cookieConsentDialogSetVisible(true)} className={buttonStyle}>{texts["settings"]}</div>;
}
