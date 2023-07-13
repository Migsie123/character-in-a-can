import Header from "./header";
import Footer from "../../ui/footer/index";
export default function LayoutPage({ id = "", backTo = "", children }) {
  return (
    <div className={`page template-page page-${id}`}>
      <Header backTo={backTo} />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
