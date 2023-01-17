
const { isValidNumber, makeHttpRequest, getErrorResponses } = require("../helpers/helpers")

const baseUrl = 'https://ozinterview.atlassian.net/rest/api/3/project/search'
const projectResourceName = 'Project'
const issueResourceName = 'Issue'
const validationResponse = {
    status: 400
}


class IssueUtil{
     static async getProject (id) {
        const validationMessage = this.validateProjectParameters(id)
        if(validationMessage){
            return validationMessage
        }
        const url = `${baseUrl}?id=${id}`
        const response = await makeHttpRequest(url, projectResourceName)
        return response
    }

    static validateProjectParameters(id){
        const errorResponseMessages = getErrorResponses(projectResourceName)
        if(!id){
            validationResponse['data'] = errorResponseMessages[10]
            return validationResponse
        }
        if(! isValidNumber(id)){
            validationResponse['data'] = errorResponseMessages[13]
            return validationResponse
        }
    }

    static validateIssueParameters(project, orderBy, startAt, maxResult){
        const errorResponseMessages = getErrorResponses(issueResourceName)
        if(! isValidNumber(startAt)){
            validationResponse['data'] = errorResponseMessages[11]
            return validationResponse
        }
        if(! isValidNumber(maxResult)){
            validationResponse['data'] = errorResponseMessages[12]
            return validationResponse
        }
        const noSpecialCharactersAsidesHypenRegex = /^[a-zA-Z0-9\-]+$/
        if(!noSpecialCharactersAsidesHypenRegex.test(project)){
            validationResponse['data'] = errorResponseMessages[14]
            return validationResponse
        }

        if(!noSpecialCharactersAsidesHypenRegex.test(orderBy)){
            validationResponse['data'] = errorResponseMessages[15]
            return validationResponse
        }
    }

     static async getIssue(project = 'MA', orderBy = 'key', startAt = '0', maxResult = '1'){
        const validationMessage = this.validateIssueParameters(project, orderBy, startAt, maxResult)
        if(validationMessage){
            return validationMessage
        }
        const jql = `project%3D${project}%20ORDER%20BY%20${orderBy}%20DESC`
        const url = `${baseUrl}?jql=${jql}&startAt=${startAt}&maxResults=${maxResult}`
        const response = await makeHttpRequest(url, issueResourceName)
        return response
    }
}

module.exports = IssueUtil