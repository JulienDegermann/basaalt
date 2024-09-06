// styles
import './styles.css'

// contexts
import { useContext } from 'react'
import { NetworksContext } from '../../../../hooks/useNetworks'

// components
import Section from '../../../Section'
import NetworkIcons from '../../../../core/NetworkIcons'

export default function Social() {

  const networks = useContext(NetworksContext)
  return (
    <Section
      title='Nous suivre'
      id='social'
    >
      <div className="container social-container">

        <p>
          Réseaux sociaux, plateformes d’écoutes ou encore YouTube, n’hésitez pas à nous suivre sur les réseaux pour ne rien manquer ! 🤘
        </p>
        <div className="flex justify-around align-center ">
          {
            networks.map((network, index) => {
              return (
                <a className="social-links" key={index} href={network.url}>
                  <NetworkIcons network={network} />
                </a>
              )
            })}
        </div>
        <div id="youtube-player">
          {/* errors in logs */}
          {/* {
      videos.map((video, index) => (
        <iframe key={index} src={`https://www.youtube.com/embed/${video.snippet.resourceId.videoId}`} allowFullScreen title="Youtube Video"></iframe>
      ))
    } */}
        </div>



      </div>
    </Section>
  )
}

