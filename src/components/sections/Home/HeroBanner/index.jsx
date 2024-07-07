// styles
import './styles.css'

// components
import { NavLink } from "react-router-dom";
import Button from "../../../Button";
import Section from "../../../Section";

export default function HeroBanner() {
  return (
    <Section
      heroBanner={true}
      id='heroBanner'
    // title="Basaalt: groove métal alternatif"
    >
        <img
          // src="images/basaalt.png"
          src="https://scontent-cdg4-2.xx.fbcdn.net/v/t39.30808-6/438086184_401708976065784_2346446761287640837_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=86c6b0&_nc_ohc=vtOgyeko6BoQ7kNvgGI7Fc1&_nc_ht=scontent-cdg4-2.xx&oh=00_AYBws458cu4geVzhKgIho9rixgO_c3y-NGX0FGUTv5P5bQ&oe=669067F0"
          alt="logo du groupe Basaalt"
          title="logo du groupe Basaalt"
        />
        <h2 className="sectionTitle">Basaalt: Groove Metail Alternatif</h2>
        <NavLink to="/nos-clips">
          <Button
            className='CTA'
            text='tous nos clips'
          />
        </NavLink>
    </Section>
  );
}