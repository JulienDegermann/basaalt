// components
import {Route, Routes} from 'react-router-dom';

import Home from '../../pages/Home';
import Concerts from '../../pages/Concerts';
import Contact from '../../pages/Contact';
import Account from '../../pages/Account';
import Videos from '../../pages/Videos';
import Shop from '../../pages/Shop';
import ArticleDetail from '../../pages/Shop/ArtcileDetail';
import Cart from '../../pages/Cart';

export default function Body() {

    return (

        <main>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/nos-concerts" element={<Concerts/>}/>
                <Route path="/la-boutique" element={<Shop/>}/>
                <Route path="/la-boutique/:id" element={<ArticleDetail/>}/>
                <Route path="/contact" element={<Contact/>}/>
                <Route path="/mon-compte" element={<Account/>}/>
                <Route path="/mon-panier" element={<Cart/>}/>
                <Route path="/nos-clips" element={<Videos/>}/>
                <Route path="/*" element={<Home/>}/>
            </Routes>
        </main>

    );
}