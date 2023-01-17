const JiraUtils = require('../project-utils/jira')

describe("JiraUtils ", () => {
  it("getProject method should return Id not present error when no id is sent to the method", async () => {
    let id

    const response = await JiraUtils.getProject(id)

    expect(response.data).toBe("Id Parameter Missing From Request");
  });

  it("getProject method should return Id must be a valid number error when invalid id is sent to the method", async () => {
    const id = 'maaa'

    const response = await JiraUtils.getProject(id)

    expect(response.data).toBe("Id must be a valid number");
  });

  it("getIssues method should return startAt must be a valid number error when an invalid startAt value is sent to the method", async () => {
    const project = 'MA', orderBy='key', startAt='ma', maxResult='1'

    const response = await JiraUtils.getIssues(project, orderBy, startAt, maxResult)

    expect(response.data).toBe("startAt must be a valid number");
  });

  it("getIssues method should return maxResult must be a valid number when an invalid maxResult value is sent to the method", async () => {
    const project = 'MA', orderBy='key', startAt='0', maxResult='ma'

    const response = await JiraUtils.getIssues(project, orderBy, startAt, maxResult)

    expect(response.data).toBe("maxResult must be a valid number");
  });

  it("getIssues method should return special character error when project with special characters other than - is sent to the method", async () => {
    const project = 'MA+=ca%cd34', orderBy='key', startAt='0', maxResult='1'

    const response = await JiraUtils.getIssues(project, orderBy, startAt, maxResult)

    expect(response.data).toBe("The only special character that project can have is a -");
  });

  it("getProject method should return success response when valid id is passed", async () => {
    const id = '1000';

    const response = await JiraUtils.getProject(id)

    expect(response.data.isLast).toBe(true)

    expect(response.data.maxResults).toBe(50)

    expect(response.data.self).toBe('https://ozinterview.atlassian.net/rest/api/3/project/search?maxResults=50&id=1000&startAt=0')
  });

  it("getIssues method should return success response when valid parameters are passed to the method", async () => {
    const project = 'MA', orderBy='key', startAt='0', maxResult='1'

    const response = await JiraUtils.getIssues(project, orderBy, startAt, maxResult)

    expect(response.data.isLast).toBe(true)

    expect(response.data.maxResults).toBe(1)
    
    expect(response.data.self).toBe('https://ozinterview.atlassian.net/rest/api/3/project/search?jql=project%3DMA%20ORDER%20BY%20key%20DESC&maxResults=1&startAt=0')
  });

});
