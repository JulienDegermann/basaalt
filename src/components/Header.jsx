import Title from "../components/Title";
import Navbar from "../components/Navbar";
import { NavLink } from "react-router-dom";

export default function Header() {

  return (
    <header>
      <div className="container">
        <div className="flex  align-center">

          <NavLink to="/" className={nav => nav.isActive ? "active" : ""}>
            <Title level="1" text="Basaalt.com" />
          </NavLink>

          <Navbar />
        </div>

      </div>

    </header>

  )
}