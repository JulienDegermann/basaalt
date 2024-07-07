// styles
import './styles.css'

// components
import Navbar from "../Navbar";
import { NavLink } from "react-router-dom";

export default function Header() {

  return (
    <header>
      <div className="container">
        <div className="flex col align-center justify-center">

          <NavLink to="/" id="mainTitle">
            <h1>Basaalt.com</h1>
          </NavLink>

          <div className="flex justify-between align-center">
            <Navbar />
          </div>
        </div>
      </div>
    </header>
  )
}