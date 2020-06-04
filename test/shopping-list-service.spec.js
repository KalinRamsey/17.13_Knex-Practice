const ShoppingListService = require('../src/shopping-list-service');
const knex = require('knex');

describe(`Shopping List service object`, function() {
  let db;
  let testItems = [
    {
      id: 1,
      name: 'Test Item 1',
      price: '9.99',
      date_added: new Date(),
      checked: true,
      category: 'Main'
    },
    {
      id: 2,
      name: 'Test Item 2',
      price: '5.55',
      date_added: new Date('1919-12-22T16:28:32.615Z'),
      checked: false,
      category: 'Snack'
    },
    {
      id: 3,
      name: 'Test Item 3',
      price: '1.11',
      date_added: new Date(),
      checked: true,
      category: 'Breakfast'
    }
  ]

  before(() => {
    db = knex({
      client: 'pg',
      connection: process.env.SHOPPING_LIST_DB_URL,
    })
  })
  before(() => db('shopping_list').truncate());

  afterEach(() => db('shopping_list').truncate());

  after(() => db.destroy());

  context(`Given 'shopping_list' has data`, () => {
    beforeEach(() => {
      return db
        .into('shopping_list')
        .insert(testItems)
    })

    it(`getAllItems() resolves all items from 'shopping_list' table`, () =>{
      return ShoppingListService.getAllItems(db)
        .then(actual => {
          expect(actual).to.eql(testItems);
        })
    })
    it(`getById() resolves an article by id from 'shopping_list' table`, () => {
      const thirdId = 3;
      const thirdTestItem = testItems[thirdId - 1];
      return ShoppingListService.getById(db, thirdId)
        .then(actual => {
          expect(actual).to.eql({
            id: thirdId,
            name: thirdTestItem.name,
            price: thirdTestItem.price,
            date_added: thirdTestItem.date_added,
            checked: thirdTestItem.checked,
            category: thirdTestItem.category
          })
        })
    })
    it(`deleteItem() removes an item by id from 'shopping_list' table`, () =>{
      const itemId = 3;
      return ShoppingListService.deleteItem(db, itemId)
        .then(() => ShoppingListService.getAllItems(db))
        .then(allItems => {
          // copy the test articles array without the "deleted" article
          const expected = testItems.filter( item => item.id !== itemId)
          expect(allItems).to.eql(expected);
        })
    })
    it(`updateItem() updates an item from the 'shopping_list' table`, () => {
      const idOfItemToUpdate = 3;
      const newItemData = {
        name: 'updated Name',
        price: '0.00',
        date_added: new Date(),
        checked: true,
        category: 'Main'
      }
      return ShoppingListService.updateItem(db, idOfItemToUpdate, newItemData)
        .then(() => ShoppingListService.getById(db, idOfItemToUpdate))
        .then(item => {
          expect(item).to.eql({
            id: idOfItemToUpdate,
            ...newItemData,
          })
        })
    })
  })

  context(`Given 'shopping_list' has no data`, () => {
    it(`getAllItems() resolves an empty array`, () => {
      return ShoppingListService.getAllItems(db)
        .then(actual => {
          expect(actual).to.eql([]);
        })
    })

    it(`insertItem() inserts a new item and resolves the new item with an 'id'`, () => {
      const newItem = {
        name: 'Test new Name',
        price: '0.99',
        date_added: new Date(),
        checked: false,
        category: 'Main'
      }
      return ShoppingListService.insertItem(db, newItem)
        .then(actual => {
          expect(actual).to.eql({
            id: 1,
            name: newItem.name,
            price: newItem.price,
            date_added: newItem.date_added,
            checked: newItem.checked,
            category: newItem.category
          })
        })
    })
  })
})