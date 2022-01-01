const axios = require('axios');

// Setting up the infura connection for the NLL smart contract
const abi = ([{ "inputs": [{ "internalType": "address", "name": "initialPhunksAddress", "type": "address" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" }], "name": "OwnershipTransferred", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "account", "type": "address" }], "name": "Paused", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "phunkIndex", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "fromAddress", "type": "address" }], "name": "PhunkBidEntered", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "phunkIndex", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "fromAddress", "type": "address" }], "name": "PhunkBidWithdrawn", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "phunkIndex", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "value", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "fromAddress", "type": "address" }, { "indexed": true, "internalType": "address", "name": "toAddress", "type": "address" }], "name": "PhunkBought", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "phunkIndex", "type": "uint256" }], "name": "PhunkNoLongerForSale", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "uint256", "name": "phunkIndex", "type": "uint256" }, { "indexed": false, "internalType": "uint256", "name": "minValue", "type": "uint256" }, { "indexed": true, "internalType": "address", "name": "toAddress", "type": "address" }], "name": "PhunkOffered", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "account", "type": "address" }], "name": "Unpaused", "type": "event" }, { "inputs": [{ "internalType": "uint256", "name": "phunkIndex", "type": "uint256" }, { "internalType": "uint256", "name": "minPrice", "type": "uint256" }], "name": "acceptBidForPhunk", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "phunkIndex", "type": "uint256" }], "name": "buyPhunk", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "phunkIndex", "type": "uint256" }], "name": "enterBidForPhunk", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "phunkIndex", "type": "uint256" }, { "internalType": "uint256", "name": "minSalePriceInWei", "type": "uint256" }], "name": "offerPhunkForSale", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "phunkIndex", "type": "uint256" }, { "internalType": "uint256", "name": "minSalePriceInWei", "type": "uint256" }, { "internalType": "address", "name": "toAddress", "type": "address" }], "name": "offerPhunkForSaleToAddress", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "pause", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "paused", "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "", "type": "address" }], "name": "pendingWithdrawals", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "phunkBids", "outputs": [{ "internalType": "bool", "name": "hasBid", "type": "bool" }, { "internalType": "uint256", "name": "phunkIndex", "type": "uint256" }, { "internalType": "address", "name": "bidder", "type": "address" }, { "internalType": "uint256", "name": "value", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "phunkIndex", "type": "uint256" }], "name": "phunkNoLongerForSale", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "phunksAddress", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "phunksOfferedForSale", "outputs": [{ "internalType": "bool", "name": "isForSale", "type": "bool" }, { "internalType": "uint256", "name": "phunkIndex", "type": "uint256" }, { "internalType": "address", "name": "seller", "type": "address" }, { "internalType": "uint256", "name": "minValue", "type": "uint256" }, { "internalType": "address", "name": "onlySellTo", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newPhunksAddress", "type": "address" }], "name": "setPhunksContract", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "newOwner", "type": "address" }], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "unpause", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "uint256", "name": "phunkIndex", "type": "uint256" }], "name": "withdrawBidForPhunk", "outputs": [], "stateMutability": "nonpayable", "type": "function" }])
var Web3 = require('web3')
var web3 = new Web3(new Web3.providers.WebsocketProvider(
    'wss://mainnet.infura.io/ws/v3/24397b55c0444066a21a3396eebc0434',
    {
        clientConfig: {
            maxReceivedFrameSize: 100000000,
            maxReceivedMessageSize: 100000000,
        }
    }
));
var contractAddress = ('0xd6c037bE7FA60587e174db7A6710f7635d2971e7');
var NLLContract = new web3.eth.Contract(abi, contractAddress);

// backend endpoint for updating a specific phunk
const update = (id, data) => {
    axios.put(`http://localhost:8080/api/phunks/mongo/${id}`, data);
}

// Updating NLL listings in DB

const onMarket = () => {
    

    axios.get(`http://localhost:8080/api/phunks/onMarket`).then(async (res, err) => {
        // console.log(res.data)
        res.data.forEach(async (order) => {
            const data = order;
            if (err) {
                console.log(err)
            }
            let token = data.name
            if (data.market === null) {
                let Phunk = {
                    onMarket: Boolean,
                    listingPrice: Number,
                    order_created: Number,
                    date_created: String
                }
                Phunk.onMarket = false;
                Phunk.listingPrice = null;
                Phunk.order_created = null;
                Phunk.date_created = null;
                axios.get(`http://localhost:8080/api/phunks/${token}`).then((res, err) => {
                    let _id = res.data[0]._id;
                    try {
                        update(_id, { $set: Phunk })
                        // console.log(`Succesfully updated unlisting of Phunk # ${token}`)
                    }
                    catch {
                        console.log(`Error updating Phuhnk #${token}` + " " + err)
                        return;
                    }
                })
            }
            if (data.market === 'NLL') {
                var checkListing = await NLLContract.methods.phunksOfferedForSale(token).call((res) => {
                    return res;
                })
                let res = (await checkListing);

                if (res.isForSale === true) {
                    let Phunk = {
                        onMarket: Boolean,
                        market: String,
                        listingPrice: Number,
                        owner: String
                    }
                    Phunk.market = "NLL";
                    Phunk.owner = res.seller;
                    Phunk.listingPrice = res.minValue / 1e18;
                    Phunk.onMarket = true;
                    try {
                        axios.get(`http://localhost:8080/api/phunks?name=${token}`).then((res) => {
                            _id = res.data[0]._id;
                            update(_id, { $set: Phunk });
                            // console.log(`Succesfully updated NLL listing of Phunk # ${token}`)
                        })
                    }
                    catch (err) {
                        console.log(err)
                    }
                }
                else {
                    let Phunk = {
                        onMarket: Boolean,
                        market: String,
                        listingPrice: Number
                    }
                    Phunk.market = null;
                    Phunk.listingPrice = null;
                    Phunk.onMarket = false;
                    try {
                        axios.get(`http://localhost:8080/api/phunks?name=${token}`).then((res) => {
                            _id = res.data[0]._id;
                            update(_id, { $set: Phunk });
                            // console.log(`Succesfully updated NLL delisting of Phunk # ${token}`)
                        })
                    }
                    catch (err) {
                        console.log(err)
                    }
                }


            }
        })
    })
    console.log('Finished updating onMarket registry...');
    return;
}

// Fetching most recent listings on NLL and updating DB
function nll() {

    const eventQuery = async () => {

        // Retrieve most recent blockheight gathered to use for the web3 query parameter.
        var blockHeight = axios.get('http://localhost:8080/api/phunks?market=NLL&limit=1&sortBy=order_created')
            .then(res => {
                return res.data[0].order_created;
            })

        let options = {
            // filter: {
            //     value: ['1000', '1337']    //Only get events where transfer value was 1000 or 1337
            // },
            fromBlock: await blockHeight,                  //Number || "earliest" || "pending" || "latest"
            toBlock: 'latest'
        };

        // Fetching all recent events from the NLL contract and updating based on event type
        await NLLContract.getPastEvents(options)
            .then(response => {
                let _id;
                response.forEach((order) => {

                    if (order.event === 'PhunkOffered') {
                        let Phunk = {
                            onMarket: Boolean,
                            market: String,
                            listingPrice: Number,
                            order_created: Number,
                            owner: String
                        }
                        const data = order;

                        try {
                            Phunk.order_created = data.blockNumber;
                            Phunk.market = "NLL";
                            // Phunk.owner = data.seller;
                            Phunk.listingPrice = data.returnValues.minValue / 1e18;
                            Phunk.onMarket = true;
                            axios.get(`http://localhost:8080/api/phunks?name=${data.returnValues.phunkIndex}`).then((res) => {
                                _id = res.data[0]._id;
                                update(_id, { $set: Phunk });
                                return;
                                // console.log(`Succesfully updated NLL listing of Phunk # ${data.returnValues.phunkIndex}`)
                            })
                        }
                        catch (err) {
                            console.log(err)
                        }
                    }

                    if (order.event === 'PhunkBidEntered') {
                        let Phunk = {
                            hasBid: Boolean,
                            bid_created: Number,
                            bidder: String,
                            bidValue: Number,
                        }
                        const data = order;

                        try {
                            Phunk.bid_created = data.blockNumber;
                            Phunk.hasBid = true;
                            Phunk.bidder = data.returnValues.fromAddress;
                            Phunk.bidValue = data.returnValues.value / 1e18;
                            axios.get(`http://localhost:8080/api/phunks?name=${data.returnValues.phunkIndex}`).then((res) => {
                                _id = res.data[0]._id;
                                update(_id, { $set: Phunk });
                                return;
                                // console.log(`Succesfully updated NLL bid of Phunk # ${data.returnValues.phunkIndex}`)
                            })
                        }
                        catch (err) {
                            console.log(err)
                        }
                    }

                    if (order.event === 'PhunkNoLongerForSale') {
                        const data = order;
                        let Phunk = {
                            onMarket: Boolean,
                            market: String,
                            listingPrice: Number,
                            order_created: Number,
                        }

                        try {
                            Phunk.onMarket = false;
                            Phunk.market = null;
                            Phunk.order_created = null;
                            Phunk.listingPrice = null;
                            axios.get(`http://localhost:8080/api/phunks?name=${data.returnValues.phunkIndex}`).then((res) => {
                                _id = res.data[0]._id;
                                update(_id, { $set: Phunk });
                                return;
                                // console.log(`Succesfully updated NLL delisting of Phunk # ${data.returnValues.phunkIndex}`)
                            })
                        }
                        catch (err) {
                            console.log(err)
                        }
                    }

                    if (order.event === 'PhunkBidwithdrawn') {
                        const data = order;
                        let Phunk = {
                            hasBid: Boolean,
                            bid_created: Number,
                            bidder: String,
                            bidValue: Number
                        }

                        try {
                            Phunk.hasBid = false;
                            Phunk.bidValue = null;
                            Phunk.bidder = null;
                            Phunk.bid_created = null;
                            axios.get(`http://localhost:8080/api/phunks?name=${data.returnValues.phunkIndex}`).then((res) => {
                                _id = res.data[0]._id;
                                update(_id, { $set: Phunk });
                                return;
                                // console.log(`Succesfully updated NLL bid withdraw of Phunk # ${data.returnValues.phunkIndex}`)
                            })
                        }
                        catch (err) {
                            console.log(err)
                        }
                    }

                    if (order.event === 'PhunkBought') {
                        const data = order;
                        let Phunk = {
                            onMarket: Boolean,
                            market: String,
                            listingPrice: Number,
                            order_created: Number,
                            owner: String
                        }

                        try {
                            Phunk.onMarket = false;
                            Phunk.market = null;
                            Phunk.listingPrice = null;
                            Phunk.order_created = null;
                            Phunk.owner = data.returnValues.toAddress;
                            axios.get(`http://localhost:8080/api/phunks?name=${data.returnValues.phunkIndex}`).then((res) => {
                                _id = res.data[0]._id;
                                update(_id, { $set: Phunk });
                                return;
                                // console.log(`Succesfully updated NLL purchase of Phunk # ${data.returnValues.phunkIndex}`)
                            })
                        }
                        catch (err) {
                            console.log(err)
                        }
                    }
                })
            })
        console.log('Finished fetching NLL events...')
        onMarket();
        return;
    }

    console.log('Fetching NLL events')
    eventQuery();
}

function nftx() {

    const fetchNftx = () => {

        const options = {
            method: 'POST',
            url: 'https://thegraph-api.nftx.org/subgraphs/name/nftx-project/nftx-v2',
            // headers: {
            //     'Content-Type': 'application/json'
            // },
            data: {
                query: '{\n      globals {\n        fees {\n          mintFee\n          randomRedeemFee\n          targetRedeemFee\n          randomSwapFee\n          targetSwapFee\n        }\n      }\n      vault(id: "0xb39185e33e8c28e0bb3dbbce24da5dea6379ae91") {\n        vaultId\n        id\n        is1155\n        isFinalized\n        totalHoldings\n        totalMints\n        totalRedeems\n        holdings(first: 1000 orderBy: dateAdded orderDirection: desc) {\n          id\n          tokenId\n          amount\n          dateAdded\n        }\n        token {\n          id\n          name\n          symbol\n        }\n        fees {\n          mintFee\n          randomRedeemFee\n          targetRedeemFee\n          randomSwapFee\n          targetSwapFee\n        }\n        usesFactoryFees\n        asset {\n          id\n          name\n          symbol\n        }\n        manager {\n          id\n        }\n        createdBy {\n          id\n        }\n        eligibilityModule {\n          id\n          eligibleIds\n          eligibleRange\n        }\n        features {\n          enableMint\n          enableRandomRedeem\n          enableTargetRedeem\n          enableRandomSwap\n          enableTargetSwap\n        }\n      }\n    }'
            }
        }
        try {
            axios.request(options)
                .then(response => {
                    let Phunk = {
                        rank: Number,
                        onMarket: Boolean,
                        hasBid: Boolean,
                        market: String,
                        listingPrice: Number,
                        bid_created: Number,
                        bidder: String,
                        bidValue: Number,
                        owner: String
                    }
                    let _id;
                    response.data.data.vault.holdings
                        .forEach((id) => {
                            let token = id.tokenId
                            axios.get(`http://localhost:8080/api/phunks/${token}`).then((res) => {
                                _id = res.data._id;
                                Phunk.onMarket = true;
                                Phunk.market = "NFTX";
                                //... //set data and onMarket values in DB
                                update(_id, { $set: Phunk });
                                return;
                                // console.log(`Succesfully updated NFTX listing of Phunk # ${token}`)
                            })
                        });
                })
                .catch(error => {
                    console.log(error);
                })
        } catch (err) {
            console.log(err)
        }
        console.log('Finished fetching NFTX listings...');
        return;
    };
    console.log('Fetching NFTX');
    fetchNftx();
    return;
}

function rarible() {
    const fetch = () => {
        
        console.log('Fetching Rarible')
        const promise = axios.get('https://ethereum-api.rarible.org/v0.1/order/orders/sell/byCollectionAndByStatus?collection=0xf07468ead8cf26c752c676e43c814fee9c8cf402&platform=RARIBLE&size=2500');
        Promise.all([promise]).then(response => {
            // console.log(response[0].data.orders)
            response[0].data.orders.forEach(async(order) => {
                let Phunk = {
                    rank: Number,
                    onMarket: Boolean,
                    hasBid: Boolean,
                    market: String,
                    listingPrice: Number,
                    date_created: String,
                    owner: String
                }
                let token = order.make.assetType.tokenId;
                if (order.status === 'ACTIVE') {
                    Phunk.listingPrice = order.makePrice;
                    Phunk.date_created = order.createdAt;

                    axios.get(`http://localhost:8080/api/phunks/${token}`).then((res, err) => {

                        let _id = res.data._id;
                        Phunk.onMarket = true;
                        Phunk.market = "Rarible";

                        //... ////set data and onMarket values in DB
                        try {
                            update(_id, { $set: Phunk })
                            // console.log(`Succesfully updated Rarible listing of Phunk # ${token}`)
                        }
                        catch {
                            console.log(`Error updating Phuhnk #${token}` + " " + err)
                            return;
                        }
                    })
                }
            });
        })
        console.log('Finsihed fetching Rarible listings...');
        return;
    }
    fetch();
}

function gather() {
    nll();
    nftx();
    rarible(); 
    return;
}

// gather();
setInterval(gather, 300000)