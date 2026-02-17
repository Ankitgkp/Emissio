import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="footer-logo">✉</span>
          <span>Emissio: Ultimate Mail</span>
        </div>
        <p className="footer-tagline">Simple, fast, developer-friendly email delivery.</p>
        <div className="footer-divider" />
        <div className="footer-bottom">
          <span>Emissio</span>
          <span className="footer-dot">·</span>
          <span>v1.0</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
