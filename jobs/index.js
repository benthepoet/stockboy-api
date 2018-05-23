const { CronJob } = require('cron');

const fetchPrices = require('./fetch-prices');

class JobScheduler {
  constructor() {
    this.jobs = [
      new CronJob('*/5 13-21 * * 1-5', fetchPrices)
    ];
    
    this.jobs.forEach(job => job.start());
  }
}

module.exports = JobScheduler;