
const IssueUtil = require('../../utils/issues-util')

const express = require('express')

const issuesRouter = express.Router()

issuesRouter.get('/api/IssueTracker/GetProject', async (request, response) => { 
    const id = request.query.id;
    const resp = await IssueUtil.getProject(id)
    response.status(resp.status).send(resp.data);
})

issuesRouter.get('/api/IssueTracker/GetIssues', async (request, response) => {
    const { project, orderBy, startAt, maxResult }  = request.query;
    const resp = await IssueUtil.getIssue(project,orderBy,startAt,maxResult)
    response.status(resp.status).send(resp.data);
})

module.exports = issuesRouter