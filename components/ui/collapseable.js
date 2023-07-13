import Link from "next/link";
import { useState } from "react";

export default function Category({ title, children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`collapseable ${open ? "open" : ""}`}>
      <div className="collapseable-name" onClick={() => setOpen((state) => !state)}>
        {title} <div className={`chevron ${open ? "down" : "right"}`}></div>
      </div>
      <div className="collapseable-content">{children}</div>
    </div>
  );
}
