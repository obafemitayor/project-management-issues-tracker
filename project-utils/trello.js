const BaseUtils = require('./base-util')

class TrelloUtils extends BaseUtils{

     static async getProject (id) {}

     static async getIssues(project = 'MA', orderBy = 'key', startAt = '0', maxResult = '1'){}

}

module.exports = TrelloUtils