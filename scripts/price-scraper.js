const { chunk } = require('underscore');
const { axios } = require('axios');

const { Stock } = require('../lib/data/accessor');

const CHUNK_SIZE = 25;
const API_URL = 'https://www.alphavantage.co/query';

function async run() {
    const stocks = await Stock().select();
    const stockChunks = chunk(stocks, CHUNK_SIZE);

    for (let stockChunk of stockChunks) {
        const quotes = await fetchQuotes(stockChunk);
    }
}

function async fetchQuotes(stockChunk) {
    const options = {
        params: {
            apikey: process.env.API_KEY,
            function: 'BATCH_STOCK_QUOTES',
            symbols: stockChunk.join(',')
        }
    };

    const { data } = await axios.get(API_URL, options);
    return data;
}

try {
    run();
} catch (error) {
    console.log(error);
    process.exit();
}
