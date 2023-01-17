
const { isValidNumber, getErrorResponses } = require("../helpers/helpers")

validationResponse = {
    status: 400
}


class BaseUtils{

    static nameForErrorResponseMessage

     static async getProject (id) {}

     static async getIssues(project = 'MA', orderBy = 'key', startAt = '0', maxResult = '1'){}

    static validateProjectParameters(id, nameForErrorResponseMessage){

        const errorResponseMessages = getErrorResponses(nameForErrorResponseMessage)

        if(!id){
            validationResponse['data'] = errorResponseMessages[10]
            return validationResponse
        }

        if(! isValidNumber(id)){
            validationResponse['data'] = errorResponseMessages[13]
            return validationResponse
        }

    }

    static validateIssueParameters(project, orderBy, startAt, maxResult, nameForErrorResponseMessage){
        const errorResponseMessages = getErrorResponses(nameForErrorResponseMessage)

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

module.exports = BaseUtils