var express = require('express'), app = express(), port = process.env.PORT || 3000
var issuesRouter = require('./api/Issues/issues')

app.use('', issuesRouter)

app.listen(port)
console.log(`App started on port: ${port}`)