require('dotenv').config();
const knex = require('knex');
const ArticlesService = require('./articles-service');

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL,
})

// user all the ArticleService methods!!
ArticlesService.getAllArticles(knexInstance)
  .then(articles => {
    console.log(`Getting All Articles...`)
    console.log(articles)
  })
  .then(() => {
    console.log(`Inserting Article...`)
    return ArticlesService.insertArticle(knexInstance, {
      title: 'New Title',
      content: 'New Content',
      date_published: new Date(),
    })
  })
  .then(newArticle => {
    console.log(`Updating Article ${newArticle.id}`)
    console.log(newArticle)
    return ArticlesService.updateArticle(
      knexInstance,
      newArticle.id,
      { title: 'Updated Title' }
    ).then(() => ArticlesService.getById(knexInstance, newArticle.id))
  })
  .then(article => {
    console.log(`Deleting Article ${article.id}`)
    console.log(article)
    return ArticlesService.deleteArticle(knexInstance, article.id)
  })