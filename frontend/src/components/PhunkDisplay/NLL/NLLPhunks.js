import React, { useState, useEffect } from 'react';
import RenderNLL from './RenderNLL';
import Pagination from '../../Pagination/Pagination';
import './NLL.css';
import axios from 'axios';
import logo from '../../flip.gif';
import phunkRank from '../../../pedro.json';
import { components } from "react-select";
import { default as ReactSelect } from "react-select";

function NLLPhunks() {

    // Fetching Phunk data from the backend API
    let [nLLMetaData, setNLLMetaData] = useState([]);
    let [searchQ, setSearchQ] = useState('');
    let [filteredResults, setFilteredResults] = useState([]);
    //sort rank
    let [rankQ, setRankQ] = useState('high_low');
    //sort price
    let [priceQ, setPriceQ] = useState('high-to-low');
    //sort time listed
    let [timeQ, setTimeQ] = useState('high_low');
    //sort trait count
    let [traitQ, setTraitQ] = useState('');

    const Fetching = async () => {
        axios.get('http://localhost:8080/api/phunks?market=NLL', {
            "Content-type": "application/json"
        }).then(
            (response) => {
                response.data.forEach((phunk) => {
                    for (var i = 1; i < phunkRank.length; i++) {
                        if (phunkRank[i].id === phunk.name) {
                            phunk.rank = phunkRank[i].ranking;
                        }
                    }
                })
                setNLLMetaData(response.data)
            })
        console.log(nLLMetaData)

    }


    useEffect(() => {
        Fetching();
    }, [])

    function handleSearch(event) {

        setSearchQ(String(event.target.value.toLowerCase()))

        if (searchQ.length > 0) {
            let filtered = nLLMetaData.filter((data) => {
                if (data.attributes) {
                    try {
                        if (data.attributes) {
                            return data.attributes.some((value) => {
                                return Object.values(value).join('').toLowerCase().includes(searchQ);
                            });
                        }
                    } catch {
                        return data.attributes.some((trait_type) => {
                            return Object.values(trait_type).join('').toLowerCase().includes(searchQ);
                        });
                    }
                } else {
                    setFilteredResults([])
                }
            })
            return setFilteredResults(filtered);

        } else {
            return setFilteredResults([]);
        }
    }

    function handleRankSort(event) {
        if (event.target.value === 'low_high') {

            nLLMetaData.sort(function (x, y) {
                return x.rank - y.rank;
            });

            setRankQ(event.target.value)
        } else {
            nLLMetaData.sort(function (x, y) {
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

    function handlePriceSort(event) {
        if (event.target.value === 'low-to-high') {
            nLLMetaData.sort(function (x, y) {
                return x.listingPrice - y.listingPrice;
            });
            setPriceQ(event.target.value)
        } else {
            nLLMetaData.sort(function (x, y) {
                return y.listingPrice - x.listingPrice;
            });
            setPriceQ(event.target.value)
        }
    }

    function handleFilterPriceSort(event) {
        if (event.target.value === 'low-to-high') {
            filteredResults.sort(function (x, y) {
                return x.listingPrice - y.listingPrice;
            });
            setPriceQ(event.target.value)
        } else {
            filteredResults.sort(function (x, y) {
                return y.listingPrice - x.listingPrice;
            });
            setPriceQ(event.target.value)
        }
    }

    function handleTimeSort(event) {
        if (event.target.value === 'low-to-high') {

            nLLMetaData.sort(function (x, y) {
                return x.order_created - y.order_created;
            });

            setTimeQ(event.target.value)
        } else {
            nLLMetaData.sort(function (x, y) {
                return y.order_created - x.order_created;
            });
            setTimeQ(event.target.value)
        }
    }

    function handleFilterTimeSort(event) {
        if (event.target.value === 'low-to-high') {

            filteredResults.sort(function (x, y) {
                return x.order_created - y.order_created;
            });

            setTimeQ(event.target.value)
        } else {
            filteredResults.sort(function (x, y) {
                return y.order_created - x.order_created;
            });
            setTimeQ(event.target.value)
        }
    };

    function handleFilterTraitSort(event) {
        if (event.target.value === '0') {
            let filter = filteredResults.filter(data => { return data.attributes.length === 0 }
            )
            setFilteredResults(filter)
        }
        if (event.target.value === '1') {
            let filter = filteredResults.filter(data => { return data.attributes.length === 1 }
            )
            setFilteredResults(filter)
        }
        if (event.target.value === '2') {
            let filter = filteredResults.filter(data => { return data.attributes.length === 2 }
            )
            setFilteredResults(filter)
        }
        if (event.target.value === '3') {
            let filter = filteredResults.filter(data => { return data.attributes.length === 3 }
            )
            setFilteredResults(filter)
        }
        if (event.target.value === '4') {
            let filter = filteredResults.filter(data => { return data.attributes.length === 4 }
            )
            setFilteredResults(filter)
        }
        if (event.target.value === '5') {
            let filter = filteredResults.filter(data => { return data.attributes.length === 5 }
            )
            setFilteredResults(filter)
        }
        if (event.target.value === '6') {
            let filter = filteredResults.filter(data => { return data.attributes.length === 6 }
            )
            setFilteredResults(filter)
        }
        if (event.target.value === '7') {
            let filter = filteredResults.filter(data => { return data.attributes.length === 7 }
            )
            setFilteredResults(filter)
        }
        if (event.target.value === 'off') {
            setFilteredResults([])
        }
        setTraitQ(event.target.value);
    }


    function handleTraitSort(event) {
        if (event.target.value === '0') {
            let filter = nLLMetaData.filter(data => { return data.attributes.length === 0 }
            )
            if (filter) {
                setFilteredResults(filter)
            }

        }
        if (event.target.value === '1') {
            let filter = nLLMetaData.filter(data => { return data.attributes.length === 1 }
            )
            if (filter) {
                setFilteredResults(filter)
            }
        }
        if (event.target.value === '2') {
            let filter = nLLMetaData.filter(data => { return data.attributes.length === 2 }
            )
            if (filter) {
                setFilteredResults(filter)
            }
        }
        if (event.target.value === '3') {
            let filter = nLLMetaData.filter(data => { return data.attributes.length === 3 }
            )
            if (filter) {
                setFilteredResults(filter)
            }
        }
        if (event.target.value === '4') {
            let filter = nLLMetaData.filter(data => { return data.attributes.length === 4 }
            )
            if (filter) {
                setFilteredResults(filter)
            }
        }
        if (event.target.value === '5') {
            let filter = nLLMetaData.filter(data => { return data.attributes.length === 5 }
            )
            if (filter) {
                setFilteredResults(filter)
            }
        }
        if (event.target.value === '6') {
            let filter = nLLMetaData.filter(data => { return data.attributes.length === 6 }
            )
            if (filter) {
                setFilteredResults(filter)
            }
        }
        if (event.target.value === '7') {
            let filter = nLLMetaData.filter(data => { return data.attributes.length === 7 }
            )
            if (filter) {
                setFilteredResults(filter)
            }
        }
        if (event.target.value === 'off') {
            setFilteredResults([])
        }
        setTraitQ(event.target.value);
    };

    function TraitLength(length) {
        let totalTraits = 0;
        nLLMetaData.forEach(data => {
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

    function checkDataLength(filteredResults) {
        if ((filteredResults.length / 6) > 4) {
            return (4);
        } else {
            return (Math.ceil(filteredResults.length / 6));
        };
    }

    const Option = (props) => {
        return (
            <div>
                <components.Option {...props}>
                    <input
                        type="checkbox"
                        checked={props.isSelected}
                        onChange={() => null}
                    />{" "}
                    <label>{props.label}</label>
                </components.Option>
            </div>
        );
    };

    const colourOptions = [
        { value: "ocean1", label: "Ocean" },
        { value: "blue", label: "Blue" },
        { value: "purple", label: "Purple" },
        { value: "red", label: "Red" },
        { value: "orange", label: "Orange" },
        { value: "yellow", label: "Yellow" },
        { value: "green", label: "Green" },
        { value: "forest", label: "Forest" },
        { value: "slate", label: "Slate" },
        { value: "silver", label: "Silver" }
    ];

    return (

        <div>

            {filteredResults.length > 0 ? (
                <>
                    <h1 style={{ margin: '0 auto', marginTop: '20px', marginBottom: '5px' }}>notLarvaLabs Phunks</h1>

                    <div style={{ margin: '0 auto', marginTop: '10px', marginBottom: '5px' }}>
                        <label>Search:</label>
                        <input type="search" onChange={(event) => handleSearch(event)} />
                        <text >{filteredResults.length} Phunks Available</text>
                    </div>
                    <div>
                        <label>Attributes</label>
                        
                    </div>
                    <div className="row" style={{ justifyContent: 'center' }}>
                        <div className="col-md-3 col-5">
                            <label>Rank:</label>
                            <select className="form-select" aria-label="Rank" value={rankQ} onChange={handleFilterRankSort}>
                                <option value="high_low">Least Rare Phirst</option>
                                <option value="low_high">Most Rare Phirst</option>
                            </select>
                        </div>
                        <div className="col-md-3 col-5">
                            <label>Price:</label>
                            <select className="form-select" aria-label="Price" value={priceQ} onChange={handleFilterPriceSort}>
                                <option value="high-to-low">Highest Price Phirst</option>
                                <option value="low-to-high">Lowest Price Phirst</option>
                            </select>
                        </div>
                        <div className="col-md-3 col-5">
                            <label>Time Listed:</label>
                            <select className="form-select" aria-label="Time" value={timeQ} onChange={handleFilterTimeSort}>
                                <option value="high-to-low">Newest Listing Phirst</option>
                                <option value="low-to-high">Oldest Listing Phirst</option>
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
                    <Pagination
                        data={filteredResults}
                        dataLength={filteredResults.length}
                        RenderComponent={RenderNLL}
                        pageLimit={checkDataLength(filteredResults)}
                        dataLimit={6}
                    />
                </>

            ) : nLLMetaData.length > 0 ? (
                <>
                    <h1 style={{ margin: '0 auto', marginTop: '20px', marginBottom: '5px' }}>notLarvaLabs Phunks</h1>
                    <div className="App">
                        <div style={{ margin: '0 auto', marginTop: '10px', marginBottom: '5px' }}>
                            <label>Search:</label>
                            <input type="search" onChange={(event) => handleSearch(event)} />

                        </div>
                        <p>
                            {nLLMetaData.length} Phunks Available</p>
                    </div>
                    <div>
                        <label>Attributes</label>
                        
                    </div>
                    <div className="row" style={{ justifyContent: 'center' }}>
                        <div className="col-md-3 col-5">
                            <label>Rank:</label>
                            <select className="form-select" aria-label="Rank" value={rankQ} onChange={handleRankSort}>
                                <option value="high_low">Least Rare Phirst</option>
                                <option value="low_high">Most Rare Phirst</option>
                            </select>
                        </div>
                        <div className="col-md-3 col-5">
                            <label>Price:</label>
                            <select className="form-select" aria-label="Price" value={priceQ} onChange={handlePriceSort}>
                                <option value="high-to-low">Highest Price Phirst</option>
                                <option value="low-to-high">Lowest Price Phirst</option>
                            </select>
                        </div>
                        <div className="col-md-3 col-5">
                            <label>Time Listed:</label>
                            <select className="form-select" aria-label="Time" value={timeQ} onChange={handleTimeSort}>
                                <option value="low-to-high">Newest Listing Phirst</option>
                                <option value="high-to-low">Oldest Listing Phirst</option>
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
                    <Pagination
                        data={nLLMetaData}
                        dataLength={nLLMetaData.length}
                        RenderComponent={RenderNLL}
                        pageLimit={4}
                        dataLimit={6}
                    />

                </>
            ) : (
                <div>
                    <h4>Loading Not Larva Labs Phunks...</h4>
                    <img className='inver' src={logo} alt="Loading Cargo Phunks..." />
                </div>
            )}
        </div>

    )
};

export default NLLPhunks;
