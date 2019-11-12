const NeDB = require('nedb')
const fs = require('fs')
const dbFilePath = './user.db'

fs.openSync(dbFilePath, 'w')

var db = new NeDB({
    filename: dbFilePath,
    autoload: true,
})

var docs = [{
  name: 'Alice',
  age: 21,
  job: 'teacher',
  hobbies: ['swimming', 'dancing']
}, {
  name: 'Jack',
  age: 18,
  job: 'student',
  hobbies: ['reading']
}, {
  name: 'Alin',
  age: 18,
  job: 'student'
}]

db.insert(docs, function(err, docs) {
  if (err) {
    return console.log('insert data error')
  }
  console.log('insert data: ', docs)
})

// find & findOne
db.find({
  age: 18
}, function(err, docs) {
  console.log('find age is 18 data: ', docs)
})

db.findOne({
  age: 18
}, function(err, doc) {
  console.log('find one age is 18 data: ', doc)
})

// $lt $lte $gt $gte $ne
db.find({
  age: {
    $lt: 19
  }
}, function(err, docs) {
  console.log('find age less than 19 data: ', docs)
})

// $in $nin
db.find({
  hobbies: {
    $nin: ['swimming']
  }
}, function(err, docs) {
  console.log('find hobbies not include swimming data: ', docs)
})

// $exists
db.find({
  hobbies: {
    $exists: true
  }
}, function(err, docs) {
  console.log('find exist hobbies data: ', docs)
})

// $regex
db.find({
  name: {
    $regex: /Al/
  }
}, function(err, docs) {
  console.log('find name include "Al" data: ', docs)
})

// $or $and $not
db.find({
  $and: [
    {age: 18},
    {job: 'student'}
  ]
}, function(err, docs) {
  console.log('find age is 18 and job is student data: ', docs)
})

// $where
db.find({
	$where: function() {
    return this.age > 20
  }
}, function(err,docs) {
  console.log('find age greater than 20 data: ', docs)
})

// sort
db.find({}).sort({
  age: 1
}).exec(function(err, docs) {
  console.log('data sorted by age: ', docs)
})

// skip & limit
var page = 1
var pageSize = 2
var skip = (page-1)*pageSize

db.find({})
  .skip(skip)
  .limit(pageSize)
  .exec(function(err, docs) {
    console.log(`find No.${page} data: `, docs)
  })

// output values
db.find({}, {
  name: 1,
  age: 1
}, function(err, docs) {
  console.log('only output name & age: ', docs)
})

db.find({}, {
  age: 0
}, function(err, docs) {
  console.log('do not output age: ', docs)
})
