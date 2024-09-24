// dependecies
import PropTypes from 'prop-types';
import {useContext} from 'react';

// contexts
import {NetworksContext} from '/src/hooks/useNetworks';
import {GroupContext} from '/src/hooks/useGroup';
// import { SongsContext } from '../hooks/useSongs';
// components
import HeroBanner from './sections/HeroBanner';
import Group from './sections/Group';

function Home() {

    // context calls
    const networks = useContext(NetworksContext);
    const {bandMembers, band} = useContext(GroupContext);

    return (
        <>
            <HeroBanner/>
            <Group/>
        </>
    );
}

export default Home;

Home.propTypes = {
    networks: PropTypes.array
};
