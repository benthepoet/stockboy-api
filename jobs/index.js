const { CronJob } = require('cron');

const fetchPrices = require('./fetch-prices');
const fetchStocks = require('./fetch-stocks');

class JobScheduler {
  constructor() {
    this.jobs = [
      new CronJob('*/5 13-21 * * 1-5', fetchPrices),
      new CronJob(new Date(), fetchStocks)
    ];
  }
  
  start() {
    this.jobs.forEach(job => job.start());
  }
}

module.exports = JobScheduler;