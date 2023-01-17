
const { isValidNumber, makeHttpRequest, getErrorResponses } = require("../helpers/helpers")

const baseUrl = process.env.BASE_URL,
validationResponse = {
    status: 400
}


class IssueUtil{

    static actionNameForResponseMessage

     static async getProject (id) {
        this.actionNameForResponseMessage = 'Project'

        const validationMessage = this.validateProjectParameters(id, this.actionNameForResponseMessage)

        if(validationMessage){
            return validationMessage
        }

        const url = `${baseUrl}?id=${id}`

        const response = await makeHttpRequest(url, this.actionNameForResponseMessage)

        return response
    }

     static async getIssue(project = 'MA', orderBy = 'key', startAt = '0', maxResult = '1'){
        this.actionNameForResponseMessage = 'Issue'

        const validationMessage = this.validateIssueParameters(project, orderBy, startAt, maxResult, this.actionNameForResponseMessage)

        if(validationMessage){
            return validationMessage
        }

        const jql = `project%3D${project}%20ORDER%20BY%20${orderBy}%20DESC`

        const url = `${baseUrl}?jql=${jql}&startAt=${startAt}&maxResults=${maxResult}`

        const response = await makeHttpRequest(url, this.actionNameForResponseMessage)

        return response
    }

    static validateProjectParameters(id, actionNameForResponseMessage){

        const errorResponseMessages = getErrorResponses(actionNameForResponseMessage)

        if(!id){
            validationResponse['data'] = errorResponseMessages[10]
            return validationResponse
        }

        if(! isValidNumber(id)){
            validationResponse['data'] = errorResponseMessages[13]
            return validationResponse
        }

    }

    static validateIssueParameters(project, orderBy, startAt, maxResult, actionNameForResponseMessage){
        const errorResponseMessages = getErrorResponses(actionNameForResponseMessage)

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
}

module.exports = IssueUtil