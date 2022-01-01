// export NODE_OPTIONS=--openssl-legacy-provider 
import React from 'react';
import { Link, Routes, Route, BrowserRouter } from 'react-router-dom';
import { Timeline } from 'react-twitter-widgets';
import NFTXPhunks from '../../components/PhunkDisplay/NFTX/NFTXPhunks';
import RariblePhunks from '../../components/PhunkDisplay/Rarible/RariblePhunks';
import NLLPhunks from '../../components/PhunkDisplay/NLL/NLLPhunks';
import NLLBidPhunks from '../../components/PhunkDisplay/NLL/NLLBidPhunks';
import Phunk from '../../components/PhunkDisplay/Phunk';
import Home from './Home';
import NavBar from '../../components/NavBar';
import './Pages.css';
import Footer from '../../components/Footer';


function App() {

    return (

        <div className="App" font-face='Lato'>



            <div>
                <BrowserRouter>
                    <div>
                        <NavBar />
                        <Link to={"/"} className="navbar-brand">
                            All Markets!
                        </Link>
                        <Link to={"/nll"} className="navbar-brand">
                            NLL Phunks for sale!
                        </Link>
                        <Link to={"/bids"} className="navbar-brand">
                            NLL Phunks bids!
                        </Link>
                        <Link to={"/rarible"} className="navbar-brand">
                            Rarible Phunks!
                        </Link>
                        <Link to={"/nftx"} className="navbar-brand">
                            NFTX Phunks!
                        </Link>
                    </div>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/phunk/:name" element={<Phunk />} />
                        <Route path="/nftx" element={<NFTXPhunks />} />
                        <Route path="/nll" element={<NLLPhunks />} />
                        <Route path="/rarible" element={<RariblePhunks />} />
                        <Route path="/bids" element={<NLLBidPhunks />} />
                    </Routes>
                </BrowserRouter>
            </div>

        </div>
    );
}

export default App;
