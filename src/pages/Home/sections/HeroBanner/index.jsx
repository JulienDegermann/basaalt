// styles
import './styles.css'

// components
import Button from "/src/components/Button";
import Section from "/src/components/Section";
import Image from "/src/assets/images/heroBanner.jpg";

export default function HeroBanner() {
  return (
    <Section
      heroBanner={true}
      id='heroBanner'
    >
      <img
        src={Image}
        alt="photo des membres du groupe Basaalt"
      />
      <h2 className="sectionTitle">Basaalt, Groove Metal Alternatif</h2>
      <Button
        className='CTA'
        text='tous nos clips'
        url='https://www.youtube.com/@basaalt'
        ariaLabel='Aller voir tous nos clips sur YouTube'
      />
    </Section>
  );
}