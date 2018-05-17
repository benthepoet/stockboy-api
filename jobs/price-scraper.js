const axios = require('axios');
const _ = require('underscore');

const { alphaVantage } = require('../secrets.json');
const { Stock } = require('../lib/data/accessor');

const CHUNK_SIZE = 100;
const API_URL = 'https://www.alphavantage.co/query';

async function run() {
    const stocks = await Stock().select();
    const stockChunks = _.chunk(stocks, CHUNK_SIZE);

    for (let stockChunk of stockChunks) {
        const quotes = await fetchQuotes(stockChunk);
        console.log(quotes);
    }
}

async function fetchQuotes(stockChunk) {
    const options = {
        params: {
            apikey: alphaVantage.apikey,
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

try {
    run();
} catch (error) {
    console.log(error);
    process.exit();
}
