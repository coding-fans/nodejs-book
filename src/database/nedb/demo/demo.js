var NeDB = require('nedb')

var db = new NeDB({
    filename: './user.db',
    autoload: true,
})

db.insert({
    name: 'Alice',
    age: 20,
    rank: 1,
}, function(err, doc) {
    console.log('inserted:', doc)
})

db.find({
    name: 'Alice',
}, function(err, docs) {
    console.log('Alice found:', docs)
})

db.update({
    name: 'Alice',
}, {
    $set: {
        age: 21,
    },
}, function(err, n) {
    console.log('docs updated:', n)
})

db.find({
    name: 'Alice',
}, function(err, docs) {
    console.log('Alice changed:', docs)
})

db.remove({
    name: 'Alice',
}, function(err, n) {
    console.log('docs deleted:', n)
})

db.find({
    name: 'Alice',
}, function (err, docs) {
    console.log('Alice removed:', docs)
})
