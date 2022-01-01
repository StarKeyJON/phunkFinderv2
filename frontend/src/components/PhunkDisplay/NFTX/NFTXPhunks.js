import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RenderNFTX from './RenderNFTX';
import Pagination from '../../Pagination/Pagination';
import logo from '../../flip.gif';
import phunkRank from '../../../pedro.json';

function NFTXPhunks() {

    let [nftxMetaData, setNftxMetaData] = useState([]);
    let [searchQ, setSearchQ] = useState('');
    let [phunkTokenPrice, setPhunkTokenPrice] = useState([]);
    let [filteredResults, setFilteredResults] = useState([]);
    //sort rank
    let [rankQ, setRankQ] = useState('high_low');
    //sort trait count
    let [traitQ, setTraitQ] = useState('');


    const fetchPhunkPrice = async () => {
        const options = {
            method: 'POST',
            url: 'https://thegraph-api.nftx.org/subgraphs/name/sushiswap/exchange',
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                query: "{\n          tokens(\n          first: 100\n          where: {\n            id_in: [\"0xb39185e33e8c28e0bb3dbbce24da5dea6379ae91\"]\n          }) {\n            id\n            derivedETH\n            quotePairs {\n              id\n              reserve0\n              token0 {\n                id\n              }\n              token1 {\n                id\n              }\n              reserve1\n            }\n            basePairs {\n              id\n              reserve0\n              token0 {\n                id\n              }\n              token1 {\n                id\n              }\n              reserve1\n            }\n          }\n        }"
            }
        };
        await axios
            .request(options)
            .then(response => {
                setPhunkTokenPrice(response.data.data.tokens[0].derivedETH.slice(0, 5))
            })
            .catch(error => {
                console.log(error)
            })
    };

    const Fetching = () => {
        axios.get('http://localhost:8080/api/phunks?market=NFTX',{
            "Content-type": "application/json"
          }).then(
        (response)=>{
            response.data.forEach((phunk)=>{
                for(var i = 1; i < phunkRank.length; i++) {
                    if (phunkRank[i].id === phunk.name) {
                        phunk.rank = phunkRank[i].ranking;
                    }
                }
            })
            setNftxMetaData(response.data)
        })
        console.log(nftxMetaData)
        
    }

    useEffect(() => {
        Fetching();
        fetchPhunkPrice();
    }, []);

    function handleSearch(event) {

        setSearchQ(event.target.value.toLowerCase())

        if (searchQ.length > 0) {

            let filtered = nftxMetaData.filter((data) => {
                if (data.attributes) {
                    return Object.values(data.attributes).join('').toLowerCase().includes(searchQ);
                };
                return data;
            });
            setFilteredResults(filtered);
        } else {
            setFilteredResults([]);
        }

    };

    function handleRankSort(event) {
        if (event.target.value === 'low_high') {

            nftxMetaData.sort(function (x, y) {
                return x.rank - y.rank;
            });
            setRankQ(event.target.value)
        } else {
            nftxMetaData.sort(function (x, y) {
                return y.rank - x.rank;
            });
            setRankQ(event.target.value)
        }
    }

    function handleFilterRankSort(event) {
        if (event.target.value === 'low_high') {

            filteredResults.sort(function (x, y) {
                return x.rank - y.rank;
            });
            setRankQ(event.target.value)
        } else {
            filteredResults.sort(function (x, y) {
                return y.rank - x.rank;
            });
            setRankQ(event.target.value)
        }
    }

    function checkDataLength(data) {
        if (Math.ceil(data.length / 6) > 4) {
            return 4;
        } else {
            return (Math.ceil(data.length / 6));
        }
    };

    function handleFilterTraitSort(event) {
        setFilteredResults([])
        if (event.target.value === '0') {
            let filter = filteredResults.filter(data => { return Object.keys(data.attributes).length === 0 }
            )
            setFilteredResults(filter)
        }
        if (event.target.value === '1') {
            let filter = filteredResults.filter(data => { return Object.keys(data.attributes).length === 1 }
            )
            setFilteredResults(filter)
        }
        if (event.target.value === '2') {
            let filter = filteredResults.filter(data => { return Object.keys(data.attributes).length === 2 }
            )
            setFilteredResults(filter)
        }
        if (event.target.value === '3') {
            let filter = filteredResults.filter(data => { return Object.keys(data.attributes).length === 3 }
            )
            setFilteredResults(filter)
        }
        if (event.target.value === '4') {
            let filter = filteredResults.filter(data => { return Object.keys(data.attributes).length === 4 }
            )
            setFilteredResults(filter)
        }
        if (event.target.value === '5') {
            let filter = filteredResults.filter(data => { return Object.keys(data.attributes).length === 5 }
            )
            setFilteredResults(filter)
        }
        if (event.target.value === '6') {
            let filter = filteredResults.filter(data => { return Object.keys(data.attributes).length === 6 }
            )
            setFilteredResults(filter)
        }
        if (event.target.value === '7') {
            let filter = filteredResults.filter(data => { return Object.keys(data.attributes).length === 7 }
            )
            setFilteredResults(filter)
        }
        if (event.target.value === 'off') {
            setFilteredResults([])
        }
        setTraitQ(event.target.value);
    }

    function handleTraitSort(event) {
        setFilteredResults([])
        if (event.target.value === '0') {
            let filter = nftxMetaData.filter(data => { return Object.keys(data.attributes).length === 0 }
            )
            setFilteredResults(filter)
        }
        if (event.target.value === '1') {
            let filter = nftxMetaData.filter(data => { return Object.keys(data.attributes).length === 1 }
            )
            setFilteredResults(filter)
        }
        if (event.target.value === '2') {
            let filter = nftxMetaData.filter(data => { return Object.keys(data.attributes).length === 2 }
            )
            setFilteredResults(filter)
        }
        if (event.target.value === '3') {
            let filter = nftxMetaData.filter(data => { return Object.keys(data.attributes).length === 3 }
            )
            setFilteredResults(filter)
        }
        if (event.target.value === '4') {
            let filter = nftxMetaData.filter(data => { return Object.keys(data.attributes).length === 4 }
            )
            setFilteredResults(filter)
        }
        if (event.target.value === '5') {
            let filter = nftxMetaData.filter(data => { return Object.keys(data.attributes).length === 5 }
            )
            setFilteredResults(filter)
        }
        if (event.target.value === '6') {
            let filter = nftxMetaData.filter(data => { return Object.keys(data.attributes).length === 6 }
            )
            setFilteredResults(filter)
        }
        if (event.target.value === '7') {
            let filter = nftxMetaData.filter(data => { return Object.keys(data.attributes).length === 7 }
            )
            setFilteredResults(filter)
        }
        if (event.target.value === 'off') {
            setFilteredResults([])
        }
        setTraitQ(event.target.value);
    };

    function TraitLength(length) {
        let totalTraits = 0;
        nftxMetaData.forEach(data => {
            if (data.attributes.length === length) {
                totalTraits++
            }
        })
        if (totalTraits > 0) {
            return totalTraits
        }
        else {
            return 'None'
        }
    };

    return (

        <div>
            {filteredResults.length > 0 ? (

                <>
                    <h1 style={{ margin: '0 auto', marginTop: '20px', marginBottom: '5px' }}>NFTX Phunks</h1>
                    <h3>1 Phunk Token is {phunkTokenPrice} Ξ </h3>

                    <div style={{ margin: '0 auto', marginTop: '10px', marginBottom: '5px' }}>
                        <label>Search:</label>
                        <input type="search" onChange={(event) => handleSearch(event)} />
                        <text>{filteredResults.length} Phunks Available</text>
                    </div>
                    <div style={{ margin: '0 auto', marginTop: '10px', marginBottom: '5px', overflow: 'hidden' }}>
                        <div className="row" style={{ justifyContent: 'center' }}>
                            <div className="col-md-3 col-5">
                                <label>Rank:</label>
                                <select className="form-select" aria-label="Rank" value={rankQ} onChange={handleFilterRankSort}>
                                    <option value="high_low">Least Rare Phirst</option>
                                    <option value="low_high">Most Rare Phirst</option>
                                </select>
                            </div>
                            <div className="col-md-3 col-5">
                                <label>Trait Count:</label>
                                <select className="form-select" aria-label="Trait" value={traitQ} onChange={handleFilterTraitSort}>
                                    <option value="off">None</option>
                                    <option value="0">0 Traits {TraitLength(0)} Available</option>
                                    <option value="1">1 Trait {TraitLength(1)} Available</option>
                                    <option value="2">2 Traits {TraitLength(2)} Available</option>
                                    <option value="3">3 Traits {TraitLength(3)} Available</option>
                                    <option value="4">4 Traits {TraitLength(4)} Available</option>
                                    <option value="5">5 Traits {TraitLength(5)} Available</option>
                                    <option value="6">6 Traits {TraitLength(6)} Available</option>
                                    <option value="7">7 Traits {TraitLength(7)} Available</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <Pagination
                        data={filteredResults}
                        RenderComponent={RenderNFTX}
                        title="NFTX Phunks"
                        pageLimit={checkDataLength(filteredResults)}
                        dataLimit={6}
                    />
                </>

            ) : nftxMetaData.length > 0 ? (
                <>
                    <h1 style={{ margin: '0 auto', marginTop: '20px', marginBottom: '5px' }}>NFTX Phunks</h1>
                    <div className="App">
                        <h5>1 Phunk Token is {phunkTokenPrice} Ξ (ETH) </h5>
                        <div style={{ margin: '0 auto', marginTop: '10px', marginBottom: '5px' }}>
                            <label>Search:</label>
                            <input type="search" onChange={(event) => handleSearch(event)} />
                            <text>{nftxMetaData.length} Phunks Available</text>
                        </div>
                        <div style={{ margin: '0 auto', marginTop: '10px', marginBottom: '5px', overflow: 'hidden' }}>
                            <div className="row" style={{ justifyContent: 'center' }}>
                                <div className="col-md-3 col-5">
                                    <label>Rank:</label>
                                    <select className="form-select" aria-label="Rank" value={rankQ} onChange={handleRankSort}>
                                        <option value="high_low">Least Rare Phirst</option>
                                        <option value="low_high">Most Rare Phirst</option>
                                    </select>
                                </div>
                                <div className="col-md-3 col-5">
                                    <label>Trait Count:</label>
                                    <select className="form-select" aria-label="Trait" value={traitQ} onChange={handleTraitSort}>
                                        <option value="off">None</option>
                                        <option value="0">0 Traits {TraitLength(0)} Available</option>
                                        <option value="1">1 Trait {TraitLength(1)} Available</option>
                                        <option value="2">2 Traits {TraitLength(2)} Available</option>
                                        <option value="3">3 Traits {TraitLength(3)} Available</option>
                                        <option value="4">4 Traits {TraitLength(4)} Available</option>
                                        <option value="5">5 Traits {TraitLength(5)} Available</option>
                                        <option value="6">6 Traits {TraitLength(6)} Available</option>
                                        <option value="7">7 Traits {TraitLength(7)} Available</option>
                                    </select>
                                </div>
                            </div>

                        </div>
                        <Pagination

                            data={nftxMetaData}
                            RenderComponent={RenderNFTX}
                            pageLimit={4}
                            dataLimit={6}
                        /></div>

                </>
            ) : (
                <div>
                    <h4>Loading NFTX Phunks...</h4>
                    <img className='inver' src={logo} alt="Loading NFTX Phunks..." />
                </div>
            )}
        </div>


    )
};

export default NFTXPhunks;
