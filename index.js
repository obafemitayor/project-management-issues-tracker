var express = require('express'), app = express(), port = process.env.PORT || 3000
var projectsRouter = require('./api/projects/projects')

app.use('', projectsRouter)

app.listen(port)
console.log(`App started on port: ${port}`)