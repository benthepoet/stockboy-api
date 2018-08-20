const axios = require('axios');
const cheerio = require('cheerio');

exports.seed = async function(knex, Promise) {
  const url = "https://en.wikipedia.org/wiki/List_of_S%26P_500_companies";
  const { data } = await axios.get(url);
  
  const $ = cheerio.load(data);
  const tables = $('tbody', '#mw-content-text table');
  
  const promises = $(tables.eq(0))
      .find('tr')
      .map(function () {
          const children = $(this).children('td');
          
          if (children.length) {
              const symbol = $(children[0]).text();
              const name = $(children[1]).text();
              const sector = $(children[3]).text();
          
              return knex('stock')
                  .insert({
                      symbol,
                      name,
                      sector
                  })
                  .then(() => {
                      console.log(symbol, name, sector);
                  });
          }
          
          return null;
      })
      .get();
      
    await Promise.all(promises);
};
