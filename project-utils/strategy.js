const JiraUtils = require('./jira')
const TrelloUtils = require('./trello')
const AzureDevopsUtils = require('./azure-devops')

const projectStrategies = {
    'jira': JiraUtils,
    'trello': TrelloUtils,
    'azure': AzureDevopsUtils,
};
module.exports = projectStrategies