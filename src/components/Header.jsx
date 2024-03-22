import Title from "../components/Title";
import Navbar from "../components/Navbar";
import { NavLink } from "react-router-dom";

export default function Header() {

  return (
    <header>
      <div className="container">


        <NavLink to="/" id="main-title" className={nav => nav.isActive ? "active" : ""}>
          <Title level="1" text="Basaalt.com" />
        </NavLink>

        <div className="flex justify-between align-center">
          <Navbar />
        </div>
      </div>
    </header>
  )
}