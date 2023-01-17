
// If you need to mock to do a unit test

const JiraUtils = require('../../../project-utils/jira')

class MockJiraUtils extends JiraUtils{

     static async getProject (id) {
        const validationMessage = super.validateProjectParameters(id)
        if(validationMessage){
            return validationMessage
        }
        // Return Dummy Response
        return ''
    }

     static async getIssues(project = 'MA', orderBy = 'key', startAt = '0', maxResult = '1'){
        const validationMessage = super.validateIssueParameters(project, orderBy, startAt, maxResult)
        if(validationMessage){
            return validationMessage
        }
        // Return Dummy Response
        return ''
    }
}

module.exports = MockJiraUtils