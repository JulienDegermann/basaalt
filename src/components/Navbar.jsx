import { NavLink } from "react-router-dom";

export default function Navbar() {

  return (
    <div className="navigation">
      <ul>
        <NavLink to="/" className={ nav => nav.isActive ? "active" : ""}>
          <li>Accueil</li>
        </NavLink>
        <NavLink to="/nos-concerts" className={ nav => nav.isActive ? "active" : ""}>
          <li>Concerts</li>
        </NavLink>
        <NavLink to="/la-boutique" className={ nav => nav.isActive ? "active" : ""}>
          <li>Boutique</li>
        </NavLink>
        <NavLink to="/contact" className={ nav => nav.isActive ? "active" : ""}>
          <li>Contact</li>
        </NavLink>
      </ul>
      <ul>
        <NavLink to="/mon-compte" className={ nav => nav.isActive ? "active" : ""}>
          <li>Compte</li>
        </NavLink>
        <NavLink to="/mon-panier" className={ nav => nav.isActive ? "active" : ""}>
          <li>Panier</li>
        </NavLink>
      </ul>
    </div>
  )
}