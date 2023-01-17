
// If you need to mock to do a unit test

const IssueUtil = require('../../utils/issues-util')

class MockIssueUtil extends IssueUtil{

     static async getProject (id) {
        const validationMessage = super.validateProjectParameters(id)
        if(validationMessage){
            return validationMessage
        }
        // Return Dummy Response
        return ''
    }

     static async getIssue(project = 'MA', orderBy = 'key', startAt = '0', maxResult = '1'){
        const validationMessage = super.validateIssueParameters(startAt, maxResult)
        if(validationMessage){
            return validationMessage
        }
        // Return Dummy Response
        return ''
    }
}

module.exports = MockIssueUtil