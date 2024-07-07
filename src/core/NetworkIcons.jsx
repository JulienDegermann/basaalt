// dependenies
import PropTypes from 'prop-types';

// import SVG components
import YouTube from '../components/svgs/Youtube';
// import Deezer from '../components/svgs/Deezer';
import Spotify from '../components/svgs/Spotify';
import Facebook from '../components/svgs/Facebook';
import Instagram from '../components/svgs/Instagram';
import Soundcloud from '../components/svgs/Soundcloud';

export default function NetworkIcons({ network }) {
  switch (network.name) {
    case 'YouTube':
      return <YouTube network={network} />
    case 'Deezer':
      return <Soundcloud />
    case 'Spotify':
      return <Spotify />
    case 'Facebook':
      return <Facebook />
    case 'Instagram':
      return <Instagram />
    case 'Soundcloud':
      return <Soundcloud />
  }
}

NetworkIcons.propTypes = {
  network: PropTypes.shape(
    {
      name: PropTypes.string,
      url: PropTypes.string
    }
  )
}