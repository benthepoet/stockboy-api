const _ = require('underscore');

class Repository {
  constructor(table) {
    this.table = table;
  }
  
  create(data) {
    return;
  }
  
  findById(id) {
    return;
  }
  
  findOne(params = []) {
    return;
  }
  
  findAll(params = []) {
    const parts = [
      ['SELECT', 'a.*'],
      ['FROM', `${this.table} a`],
      ['WHERE', params.join(' ')]
    ];
    
    const safeValues = params
      .map(param => param.pop());
    
    const safeParams = params
      .map(param => param.append('?'))
    
    const sql = parts
      .filter(([keyword, argument]) => {
        return !_.isEmpty(argument);
      })
      .join(' ');
    
    return;
  }
  
  update(params, data) {
    return;
  }
}