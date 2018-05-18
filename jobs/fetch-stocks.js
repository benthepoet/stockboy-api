const axios = require('axios');
const cheerio = require('cheerio');

const { Stock } = require('../lib/data/accessor');

const url = "https://en.wikipedia.org/wiki/List_of_S%26P_500_companies";

function run() {
    axios.get(url)
        .then(process);
        
    function process({ data }) {
        const $ = cheerio.load(data);
        const tables = $('tbody', '#mw-content-text table');
        
        $(tables.eq(0))
            .find('tr')
            .each(function () {
                const children = $(this).children('td');
                
                if (children.length) {
                    const symbol = $(children[0]).text();
                    const name = $(children[1]).text();
                    const sector = $(children[3]).text();
                
                    Stock()
                        .insert({
                            symbol,
                            name,
                            sector
                        })
                        .then(() => {
                            console.log(symbol, name, sector);
                        });
                }
            });
    }
}

run();