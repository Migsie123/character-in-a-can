import Link from "next/link";

export default function LayoutPage({ backTo = "" }) {
  return (
    <header className="header header-page">
      <div className="logo">Character in a Can</div>
      {backTo && (
        <Link href={backTo}>
          <a className="btn-back">
            <div className="chevron left"></div>
            Back
          </a>
        </Link>
      )}
    </header>
  );
}
