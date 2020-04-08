const express = require('express')
const cors = require('cors')
const app = express()
const port = 8080

const term = require('./router/term')

app.use(cors());
app.use('/api/term', term);

app.listen(port);