const express = require('express')
const { create } = require('express-handlebars')
const config = require('./config')
const { main: mainDb } = require('./databases')

const app = express()

// Set up static file serving
app.use(express.static('public'));

const hbs = create({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
})
app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
    res.render('index', {
        title: 'HomeLab Dashboard',
    })
})

app.get('/dbtest', (req, res) => {
    mainDb.all(`SELECT * FROM read_csv('${config.basepath}/databases/test.csv')`, function (err, res) {
        if (err) {
            console.warn(err)
            return
        }
        console.log(res)
    })
})

app.listen(config.port, () => {
    console.log(`Server is running on http://localhost:${config.port}`)
})