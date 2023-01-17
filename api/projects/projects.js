
const express = require('express')

const projectsRouter = express.Router()

const defaultProjectStrategyName = 'jira'

const projectStrategies = require('../../project-utils/strategy')

const getProjectStrategy = (name) => {
    const projectStrategyName = name in projectStrategies ? name : defaultProjectStrategyName
    
    return projectStrategies[projectStrategyName]
}

projectsRouter.get('/api/projects/:projectName/get-project', async (request, response) => {
    const projectStrategy =  getProjectStrategy(request.params.projectName)

    const id = request.query.id

    const resp = await projectStrategy.getProject(id)
    
    response.status(resp.status).send(resp.data)
})

projectsRouter.get('/api/projects/:projectName/get-issues', async (request, response) => {
    const projectStrategy =  getProjectStrategy(request.params.projectName)
    
    const { project, orderBy, startAt, maxResult }  = request.query;
    
    const resp = await projectStrategy.getIssues(project,orderBy,startAt,maxResult)
    
    response.status(resp.status).send(resp.data);
})

module.exports = projectsRouter