import Link from "next/link";
import Collapseable from "../collapseable";
import slugify from "slugify";

export default function category({ title, templates }) {
  return (
    <Collapseable title={title}>
      {templates.map((template, i) => {
        return (
          <Link
            key={i}
            href={`/template/${slugify(template.name, {
              remove: /[*+~.,()'"!:@]/g,
            })}`}
          >
            <a className="template">
              <div className="name">{template.name}</div>
            </a>
          </Link>
        );
      })}
    </Collapseable>
  );
}
