import Button from '../components/Button';
import HomeCard from '../components/HomeCard';
import Title from '../components/Title';
import Facebook from '../components/svgs/Facebook.jsx';
import Instagram from '../components/svgs/Instagram.jsx';
import Youtube from '../components/svgs/Youtube.jsx';

import '../assets/styles/home.css';

function Home() {

  const datas = [
    {
      firstName: "Alex",
      role: "Lead vocal / Rythm guitar",
      image: "basaalt.png"
    },
    {
      firstName: "Jérémie",
      role: "Lead guitar",
      image: "basaalt.png"
    },
    {
      firstName: "Antoine",
      role: "Bass guitar / Back vocal",
      image: "basaalt.png"
    },
    {
      firstName: "Thomas",
      role: "Drums",
      image: "basaalt.png"
    },
  ];

  const networks = [
    {
      name: "Facebook",
      url: "https://www.facebook.com",
      image: Facebook
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com",
      image: Instagram
    },
    {
      name: "Youtube",
      url: "https://www.youtube.com",
      image: Youtube
    }
  ];

  return (
    <>
      {/* <Header /> */}

      <section id="heroBanner">
        <img src="images/basaalt.png" alt="logo du groupe Basaalt" title="logo du groupe Basaalt" />
        <h1>Basaalt, le groupe de groove métal atlernatif</h1>
        <Button
          className='CTA'
          url='/nos-concerts'
          text='tous nos clips'
        />
      </section>

      <section>
        <div className="container">

          <Title text="Le groupe" />

          <p>
            Né de la rencontre de quatre musiciens expérimentés, percuté par leurs diverses influences, Basaalt est un groupe de Groove Métal Alternatif. Il propose une musique puissante et organique agrémentée de touches électroniques. En résulte une musique épique qui prend tout son sens sur scène.
          </p>

          <div className="flex justify-between align-center">
            <HomeCard
              datas={datas}
            />
          </div>
        </div>
      </section>

      <section>
        <div className="container">

          <Title text="Nous suivre" />

          <p >
            Réseaux sociaux, plateformes d’écoutes ou encore YouTube, n’hésitez pas à nous suivre sur les réseaux pour ne rien manquer ! 🤘
          </p>
          <div className="flex justify-around align-center">
            {
              networks.map((network, index) => {
                return (
                  <a className="social-links" key={index} href={network.url}>
                    <network.image />
                  </a>
                )
              })}

          </div>
        </div>
      </section>
    </>
  )
}

export default Home;
