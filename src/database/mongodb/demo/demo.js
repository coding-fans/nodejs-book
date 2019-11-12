const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://root:to0r@localhost:27017'
const dbName = 'user'
const collectionName = 'user'

MongoClient.connect(url, {useUnifiedTopology: true}, async function(err, client) {
  // create database
  const db = client.db(dbName)
  // create collection named user
  const user = await Promise.resolve(db.createCollection(collectionName))
  
  // insert data
  user.insertOne({
    name: 'Alice'
  }, function(err, res) {
    if (err) {
      return console.log('insert fail', err)
    }
    console.log('insert data: ', res.result)
  })

  // find
  user.find({
    name: 'Alice'
  }).toArray(function(err, result) {
    console.log('find Alice: ', result)
  })

  // update
  user.updateOne({
    name: 'Alice'
  }, {
    $set: {
      age: 20
    }
  }, function(err, res) {
    if (err) {
      return console.log(err)
    }
    console.log('update Alice data')
  })

  // find update
  user.find({
    name: 'Alice'
  }).toArray(function(err, result) {
    console.log('find Alice new data: ', result)
  })

  // delete
  user.deleteOne({
    name: 'Alice'
  }, function(err, obj) {
    if (err) {
      return console.log(err)
    }
    console.log('remove data')
  })
})
