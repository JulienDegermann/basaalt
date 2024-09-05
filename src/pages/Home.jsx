// dependecies
import PropTypes from 'prop-types';
import { useContext } from 'react';

// contexts
import { NetworksContext } from '../hooks/useNetworks';
import { GroupContext } from '../hooks/useGroup';
// import { SongsContext } from '../hooks/useSongs';

// components
import Modal from '../components/Modal';
import HeroBanner from '../components/sections/Home/HeroBanner';
import Group from '../components/sections/Home/Group';
import Social from '../components/sections/Home/Social';

function Home() {

  // context calls
  const networks = useContext(NetworksContext)
  const { bandMembers, band } = useContext(GroupContext)

  // const songs = useContext(SongsContext)

  // const albums = useMemo(() => {
  //   const albumsList = []
  //   songs.map(song => {
  //     if (!albumsList.includes(song.album)) {
  //       albumsList.push(song.album)
  //     }
  //     return albums
  //   })
  // }, [songs])

  return (
    <>
      <HeroBanner />
      <Group /> 
    </>
  )
}

export default Home;


Home.propTypes = {
  networks: PropTypes.array
}
