import Footer from "../ui/footer/index";

export default function LayoutHome({ id = "", children }) {
  return (
    <div className={`page template-home page-${id}`}>
      <main>{children}</main>
      <Footer />
    </div>
  );
}