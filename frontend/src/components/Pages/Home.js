// export NODE_OPTIONS=--openssl-legacy-provider 
import React from 'react';
import { Timeline } from 'react-twitter-widgets';
import NFTXPhunks from '../../components/PhunkDisplay/NFTX/NFTXPhunks';
import RariblePhunks from '../../components/PhunkDisplay/Rarible/RariblePhunks';
import NLLPhunks from '../../components/PhunkDisplay/NLL/NLLPhunks';
import NavBar from '../../components/NavBar';
import './Pages.css';
import Footer from '../../components/Footer';


function App() {

  return (

    <div className="App" font-face='Lato'>

      <div>
        <NLLPhunks />
      </div>

      <div>
        <RariblePhunks />
      </div>

      <div>
        <NFTXPhunks />
      </div>

      <Timeline
        className='App'
        dataSource={{
          sourceType: 'https://twitter.com/PhunkStats',
          screenName: 'PhunkStats'
        }}
        options={{
          height: '1600',
          outerWidth: '800'
        }}
      />
      <div>
        <Footer />
      </div>

      <div>I recently started learning html/js game development and converted a Zelda rip to play as my Phunk as a proof of concept for myself as I learn. I hope you enjoy!</div>
      <a href='http://www.phunkfinder.com/dist/'><button>Phelda Link</button></a>

    </div>
  );
}

export default App;
