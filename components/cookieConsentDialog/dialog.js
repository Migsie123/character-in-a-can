import React, { useCallback, useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import style from "./dialog.module.scss";
import localization from "./i18.json";
import config from "./config.json";
import { Cookies, useCookies } from "react-cookie";
import {
  useCookieConsentDialogIsVisibleContext,
  useCookieConsentDialogSetVisibleContext,
} from "./context";

function CookieConsentDialog() {
  const analyticIDs = config.googleAnalytics; //grab all the google analytics IDs from config

  //get the cookie consent contexts
  const isVisible = useCookieConsentDialogIsVisibleContext();
  const setVisible = useCookieConsentDialogSetVisibleContext();

  const [cookies, setCookie, removeCookie] = useCookies(); //['cookie-consent'] defines dependency for re-render
  //grab the cookie consent cookie
  const consent = cookies["cookie-consent"]
    ? Number(cookies["cookie-consent"])
    : null;

  //put dynamic classes in state because of Server Side Rendering Issue
  const [bannerClass, setBannerClass] = useState(style.banner);
  const [acceptClass, setAcceptClass] = useState(style.btn);
  const [declineClass, setDeclineClass] = useState(style.btn);

  //show cookie consent dialog if user has not answered to popup or they want to change their answer
  useEffect(() => {
    const showPopup = consent === null || isVisible;
    if (showPopup) {
      setBannerClass(`${style.banner} ${style.show}`);
    } else {
      setBannerClass(style.banner);
    }
  }, [consent, isVisible]);

  //update the button classes based on the consent
  useEffect(() => {
    setAcceptClass(style.btn);
    setDeclineClass(style.btn);
    if (consent === 1) {
      setAcceptClass(`${style.btn} ${style.active}`);
    } else if (consent === 0) {
      setDeclineClass(`${style.btn} ${style.active}`);
    }
  }, [consent]);

  const maxAge = 2 * 31 * 24 * 60 * 60; //max age for cookies. 2 months per Touko's guidance
  //update the cookie and hide the popup
  const updateConsent = useCallback(
    (consent) => {
      setCookie("cookie-consent", consent, { maxAge: maxAge });

      //if the new answer is decline, delete all the analytic cookies
      if (!consent) {
        //using new Cookies() instead of cookies because there was some issues with cookies not always including the dynamicly added google anylytics cookies
        const c = new Cookies();
        Object.keys(c.getAll()).forEach((key) => {
          if (key.indexOf("_ga") === 0) {
            removeCookie(key);
          }
        });
      }
      setVisible(false);
    },
    [setVisible, maxAge, removeCookie, setCookie]
  );

  //localization and page events
  const { locale, defaultLocale, events } = useRouter();
  const useLocale = locale || defaultLocale || "en"; //figure out the locale
  const texts = localization[useLocale]; //this can later be changed to use nextJS i18 useTranslator

  //Hook onPageView event to router change event
  useEffect(() => {
    //Page change events to google analytics
    const onPageView = (url) => {
      analyticIDs.forEach((id) => {
        window.gtag("config", id, {
          page_path: url,
        });
      });
    };

    if (consent === 1) {
      events.on("routeChangeComplete", onPageView);
    } else {
      events.off("routeChangeComplete", onPageView);
    }
    return () => {
      events.off("routeChangeComplete", onPageView);
    };
  }, [events, consent, analyticIDs]);

  if (!analyticIDs.length) return null; //if no analytics defined we dont need the consent popup

  //if consent is given, add analytics to head
  return (
    <>
      {consent === 1 && (
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
            `,
            }}
          />
          {analyticIDs.map((id, i) => (
            <React.Fragment key={i}>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `gtag('config', '${id}', { page_path: window.location.pathname });`,
                }}
              />
            </React.Fragment>
          ))}
        </Head>
      )}
      <div className={bannerClass}>
        <div className={style.content}>
          <div className={style.title}>{texts.title}</div>
          <p>
            <span>{texts.text}</span>&nbsp;
            {texts.privacyPolicyUrl && (
              <span>
                {texts.readMore}&nbsp;
                <a
                  href={texts.privacyPolicyUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  {texts.privacyPolicy}
                </a>
              </span>
            )}
          </p>
          <p>{texts.byAccepting}</p>
        </div>
        <div className={style.buttons}>
          <div className={declineClass} onClick={() => updateConsent(0)}>
            {texts.decline}
          </div>
          <div className={acceptClass} onClick={() => updateConsent(1)}>
            {texts.accept}
          </div>
        </div>
      </div>
    </>
  );
}

export default CookieConsentDialog;
