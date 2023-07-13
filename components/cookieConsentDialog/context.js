import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

const CookieConsentDialogIsVisibleContext = createContext(false);
const CookieConsentDialogSetVisibleContext = createContext((newState) => newState);

export function CookieConsentContextProvider({ children }) {
  const [contextValue, setContextValue] = useState(false);

  return (
    <CookieConsentDialogIsVisibleContext.Provider value={contextValue}>
      <CookieConsentDialogSetVisibleContext.Provider value={setContextValue}>
        {children}
      </CookieConsentDialogSetVisibleContext.Provider>
    </CookieConsentDialogIsVisibleContext.Provider>
  );
}

export function useCookieConsentDialogIsVisibleContext() {
  return useContext(CookieConsentDialogIsVisibleContext);
}
export function useCookieConsentDialogSetVisibleContext(){
  return useContext(CookieConsentDialogSetVisibleContext);
}