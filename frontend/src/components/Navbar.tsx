import "./Navbar.css";
import HealthBadge from "./HealthBadge";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <div className="navbar-brand">
          <span className="navbar-logo">✉</span>
          <span className="navbar-title">Emissio</span>
        </div>
        <HealthBadge />
      </div>
    </nav>
  );
}

export default Navbar;
