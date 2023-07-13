/* eslint-disable @next/next/no-img-element */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import Mailignlist from "./mailinglist";

export default function Footer({ children }) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      /* you can also use 'auto' behaviour
         in place of 'smooth' */
    });
  };
  return (
    <footer className="footer">
      <div>
        <a
          href="https://ko-fi.com/cynderbark/tiers"
          target="_blank"
          rel="noreferrer"
          className="btn-kofi"
        >
          <img src="/images/brands/kofi.png" alt="Support me on Ko-fi" />
        </a>
      </div>
      <div>
        <a
          className="btn-scroll-to-top"
          href="https://forms.gle/9NkNohqVfi7sNHFBA"
          target="_blank"
          rel="noreferrer"
        >
          <FontAwesomeIcon icon={faEnvelope} width="24px" />
          <div>Subscribe to our Newsletter</div>
        </a>
      </div>
      <div>
        <div className="btn-scroll-to-top" onClick={() => scrollToTop()}>
          <FontAwesomeIcon icon={faChevronUp} width="24px" />
          <div>Scroll to Top</div>
        </div>
      </div>
    </footer>
  );
}
