require('dotenv').config();
const knex = require('knex');

const knexInstance = knex({
  client: 'pg',
  connection: process.env.DB_URL
})

function searchByProductName(searchTerm) {
  knexInstance
    .select('*')
    .from('shopping_list')
    .where('name', 'ILIKE', `%${searchTerm}%`)
    .then(result => {
      console.log(`---Search by name: '${searchTerm}'---`);
      console.log(result);
    });
}
searchByProductName('fish');

function paginateProducts(page) {
  const productsPerPage = 6;
  const offset = productsPerPage * (page - 1);

  knexInstance
    .select('*')
    .from('shopping_list')
    .limit(productsPerPage)
    .offset(offset)
    .then(result => {
      console.log(`---Display Page: ${page}---`);
      console.log(result);
    })
}

paginateProducts(2);

function getItemsAddedAfterDate(daysAgo){
  knexInstance
    .select('*')
    .from('shopping_list')
    .where(
      'date_added',
      '>',
      knexInstance.raw(`now() - '?? days'::INTERVAL`, daysAgo)
    )
    .then(result => {
      console.log(`---Display Items added after ${daysAgo} days ago---`);
      console.log(result);
    })
}
getItemsAddedAfterDate(3);

function getTotalCostForEachCategory() {
  knexInstance
    .select('category')
    .sum('price')
    .from('shopping_list')
    .groupBy('category')
    .then(result => {
      console.log(`---Get Total Cost for Each Category---`);
      console.log(result);
    });
}
getTotalCostForEachCategory();