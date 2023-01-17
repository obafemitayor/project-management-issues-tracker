const BaseUtils = require('./base-util')

class AzureDevopsUtils extends BaseUtils{

     static async getProject (id) {}

     static async getIssues(project = 'MA', orderBy = 'key', startAt = '0', maxResult = '1'){}

}

module.exports = AzureDevopsUtils