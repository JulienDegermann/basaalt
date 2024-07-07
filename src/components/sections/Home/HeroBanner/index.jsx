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
          src="images/basaalt.png"
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