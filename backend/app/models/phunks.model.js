module.exports = mongoose => {
    const Phunks = mongoose.model(
        "phunk",
        mongoose.Schema(
            {
                name: String,
                description: String,
                attributes: [{}],
                rank: Number,
                owner: String,
                onMarket: Boolean,
                hasBid: Boolean,
                image_url: String,
                order_created: Number,
                date_created: String,
                bid_created: Number,
                bidder: String,
                bidValue: Number,
                market: String, 
                listingPrice: Number, 
                bid: Number,
            },
            { timestamps: true }
        )
    );
    return Phunks;
}