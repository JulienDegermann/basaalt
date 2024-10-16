// styles
import './styles.css';

// components
import Button from '/src/components/Button';
import Section from '/src/components/Section';
import ImageDesktop from '/src/assets/images/heroBannerDesktop.webp';
import ImageTablet from '/src/assets/images/heroBannerTablet.webp';
import ImageMobile from '/src/assets/images/heroBannerMobile.webp';

export default function HeroBanner() {
    return (
        <Section
            heroBanner={true}
            id="heroBanner"
        >
            <picture>
                <source srcSet={ImageTablet}
                        media={'(min-width: 520px) and (max-width: 1024px) and (orientation: landscape)'}/>
                <source srcSet={ImageMobile}
                        media={'(orientation: portrait) and (max-width: 1024px)'}/>
                <img
                    src={ImageDesktop}
                    alt="photo des membres du groupe Basaalt"
                />

            </picture>
            {/*<img className="logo" src={Image} alt={'logo du groupe Basaalt'}/>*/}
            <Button
                className="CTA"
                text="tous nos clips"
                url="https://www.youtube.com/@basaalt"
                ariaLabel="Aller voir tous nos clips sur YouTube"
            />
        </Section>
    );
}