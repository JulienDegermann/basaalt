// styles
import './styles.css'

// components
import { NavLink } from "react-router-dom";
import Button from "/src/components/Button";
import Section from "/src/components/Section";
import Image from "/src/assets/images/heroBanner.jpg";

export default function HeroBanner() {
  return (
    <Section
      heroBanner={true}
      id='heroBanner'
    // title="Basaalt: groove métal alternatif"
    >
        <img
          src={Image}
          alt="logo du groupe Basaalt"
          title="logo du groupe Basaalt"
        />
        <h2 className="sectionTitle">Basaalt, Groove Metal Alternatif</h2>
        <NavLink to="/nos-clips">
          <Button
            className='CTA'
            text='tous nos clips'
          />
        </NavLink>
    </Section>
  );
}