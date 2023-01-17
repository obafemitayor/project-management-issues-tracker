
const { makeHttpRequest } = require("../helpers/helpers")

const BaseUtils = require('./base-util')

const baseUrl = process.env.BASE_URL ? process.env.BASE_URL : 'https://ozinterview.atlassian.net/rest/api/3/project/search'


class JiraUtils extends BaseUtils{

    static nameForErrorResponseMessage

     static async getProject (id) {
        this.nameForErrorResponseMessage = 'Project'

        const validationMessage = super.validateProjectParameters(id, this.nameForErrorResponseMessage)

        if(validationMessage){
            return validationMessage
        }

        const url = `${baseUrl}?id=${id}`

        const response = await makeHttpRequest(url, this.nameForErrorResponseMessage)

        return response
    }

     static async getIssues(project = 'MA', orderBy = 'key', startAt = '0', maxResult = '1'){
        this.nameForErrorResponseMessage = 'Issue'

        const validationMessage = super.validateIssueParameters(project, orderBy, startAt, maxResult, this.nameForErrorResponseMessage)

        if(validationMessage){
            return validationMessage
        }

        const jql = `project%3D${project}%20ORDER%20BY%20${orderBy}%20DESC`

        const url = `${baseUrl}?jql=${jql}&startAt=${startAt}&maxResults=${maxResult}`

        const response = await makeHttpRequest(url, this.nameForErrorResponseMessage)

        return response
    }

}

module.exports = JiraUtils