// dependenies
import PropTypes from 'prop-types';

// import SVG components
import YouTube from '../components/svgs/Youtube';

// import Deezer from '../components/svgs/Deezer';
import Spotify from '../components/svgs/Spotify';
import Facebook from '../components/svgs/Facebook';
import Instagram from '../components/svgs/Instagram';
import Soundcloud from '../components/svgs/Soundcloud';
import Deezer from '../components/svgs/Deezer';
import AppleMusic from '../components/svgs/AppleMusic';

export default function NetworkIcons({ network }) {
  switch (network.name) {
    case 'Youtube':
      return <YouTube />
    case 'Deezer':
      return <Deezer />
    case 'Spotify':
      return <Spotify />
    case 'Facebook':
      return <Facebook />
    case 'Instagram':
      return <Instagram />
    case 'Apple Music':
      return <AppleMusic />
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