require('dotenv').config()
const app = require('./src/app')
const db = require('./src/db/db')



app.listen(5000, 
    console.log('server started at port 5000')
)
