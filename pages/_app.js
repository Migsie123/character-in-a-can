import "../styles/globals.scss";
import "../utils/extend";
import Data from "../data.json";
import LayoutHome from "../components/layouts/home";
import LayoutPage from "../components/layouts/page/page";
import CookieConsentDialog from "../components/cookieConsentDialog/dialog";

const layouts = {
  home: LayoutHome,
  page: LayoutPage,
};

function MyApp({ Component, pageProps }) {
  const Layout = layouts[Component.layout] ?? layouts["page"];
  return (
    <>
      <CookieConsentDialog />
      <Layout id={Component.id ?? ""} backTo={Component.backTo ?? ""}>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

MyApp.getInitialProps = async ({ req }) => {
    return { pageProps: { canData: Data } };
};


export default MyApp;
