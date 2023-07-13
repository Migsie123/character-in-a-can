import { useRouter } from "next/router";
import { useMemo, useCallback, useEffect, useState, Fragment } from "react";
import slugify from "slugify";
import Error from "next/error";
import Group from "../../components/template/random/group";
import Refresh from "../../public/images/refresh.svg";
import Copy from "../../public/images/copy.svg";
import Data from "../../data.json";
import Head from "next/head";
import Clipboard from "react-clipboard.js";

const Template = ({ canData }) => {
  const router = useRouter();
  const { templateName } = router.query;
  const [template, setTemplate] = useState(null);
  const [triggerRefresh, setTriggerRefresh] = useState(true);

  useEffect(() => {
    if (!template && canData && templateName) {
      const _template = canData.find(
        (_template) =>
          slugify(_template.name, { remove: /[*+~.,()'"!:@]/g }) == templateName
      );
      if (_template) {
        _template.groups.forEach((group) => (group.randomCount = 1));
      }
      setTemplate(_template);
    }
  }, [canData, templateName, template]);

  const refresh = () => {
    setTriggerRefresh((state) => !state);
  };

  const copyToClipboard = () => {
    let text = "";
    const groups = document.querySelectorAll(".template .group");
    groups.forEach((group) => {
      const name = group.querySelector(".header .name").innerHTML;
      const values = group.querySelectorAll(".values .value");
      if (values.length) {
        text += name + ":\n";
        values.forEach((value) => {
          text += value.innerHTML + "\n";
        });
        text += "\n";
      }
    });
    return text.trim();
  };

  if (template === false) return <Error statusCode={404} />;
  if (!template) return null;

  return (
    <>
      <Head>
        <title>Character in a Can - {template.name}</title>
      </Head>
      <h2 className="text-center">{template.name}</h2>
      <div className="template-intro">
        {template.meta.description && <p>{template.meta.description}</p>}
        <div className="intro-kofi-btn">
          <a
            href="https://ko-fi.com/cynderbark/tiers"
            target="_blank"
            rel="noreferrer"
            className="btn-kofi-home"
          >
            <img src="/images/brands/kofi.png" alt="Support me on Ko-fi" />
          </a>
        </div>
      </div>
      <div className="btn btn-refresh text-center" onClick={() => refresh()}>
        <span>Refresh</span>
        <Refresh />
      </div>
      <div className="template">
        <div className="groups">
          {template.groups.map((group, i) => {
            return (
              <Fragment key={i}>
                <Group group={group} triggerRefresh={triggerRefresh} />
              </Fragment>
            );
          })}
        </div>
        <Clipboard
          className="btn btn-copy"
          option-text={() => copyToClipboard()}
        >
          Copy <Copy />
        </Clipboard>
      </div>
    </>
  );
};

export async function getStaticPaths() {
  return {
    paths: Data.map((template) => {
      return {
        params: {
          templateName: slugify(template.name, { remove: /[*+~.,()'"!:@]/g }),
        },
      };
    }),
    // See the "paths" section below
    fallback: false,
  };
}
export async function getStaticProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  };
}

Template.id = "template";
Template.backTo = "/";

export default Template;
