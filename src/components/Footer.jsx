import Navbar from "./Navbar";
import Facebook from "../components/svgs/Facebook.jsx";
import Instagram from "../components/svgs/Instagram.jsx";
import YouTube from "../components/svgs/Youtube.jsx";
import Title from "./Title";



export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="flex justify-between">
          <div>

            <Title text="Informations légales" />
          </div>
          <div>
            <Title text="Plan du site" />
            <Navbar />

          </div>
          <div>
            <Title text="Nous suivre" />
            <div className="flex">
              <Facebook />
              <Instagram />
              <YouTube />
            </div>

          </div>
        </div>
      </div>
    </footer>
  )
}