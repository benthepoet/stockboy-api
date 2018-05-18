const axios = require('axios');
const _ = require('underscore');

const { Stock } = require('../lib/data/accessor');

const CHUNK_SIZE = 100;
const API_URL = 'https://www.alphavantage.co/query';

async function run() {
    const stocks = await Stock().select();
    const stockChunks = _.chunk(stocks, CHUNK_SIZE);

    for (let stockChunk of stockChunks) {
        const quotes = await fetchQuotes(stockChunk);

        const updates = quotes.map(quote => {
            return Stock()
                .where('symbol', quote.symbol)
                .update({
                    last_price: quote.price,
                    updated_at: new Date()
                });
        });

        await Promise.all(updates);
    }
}

async function fetchQuotes(stockChunk) {
    const options = {
        params: {
            apikey: process.env.AV_KEY,
            function: 'BATCH_STOCK_QUOTES',
            symbols: stockChunk.map(stock => stock.symbol).join(',')
        }
    };

    const { data } = await axios.get(API_URL, options);

    const quotePipeline = _.compose(
        _.partial(_.map, _, x => {
            return {
                symbol: _.property('1. symbol')(x),
                price: _.property('2. price')(x)
            };
        }),
        _.property('Stock Quotes')
    );

    return quotePipeline(data);
}

run()
    .then(() => process.exit())
    .catch(error => {
        console.log(error);
        process.exit();
    });
