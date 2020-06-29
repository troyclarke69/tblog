const PORT = process.env.PORT || 5000
const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const path = require("path")

var dir = path.join(__dirname, 'public');

const app = express()
app.use(express.static(dir));

//'mongodb://localhost/blog'
mongoose.connect('mongodb+srv://troy:pass@cluster0-orxh2.gcp.mongodb.net/tblog', {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
})

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc' })
  res.render('articles/index', { articles: articles })
})

app.use('/articles', articleRouter)

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))
