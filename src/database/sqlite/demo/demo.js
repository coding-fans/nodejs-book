/*
 * Author: huangxiaoyan
 * Created time: 2019-11-10 09:25:40
 * Last Modified by: huangxiaoyan
 * Last Modified time: 2019-11-10 15:47:53
 */

const sqlite3 = require('sqlite3').verbose()
const fs = require('fs')
const dbFilePath = './user.db'

fs.openSync(dbFilePath, 'w')

var db = new sqlite3.Database(
    './user.db', 
    sqlite3.OPEN_READWRITE, 
    function (err) {
        if (err) {
            return console.log(err.message)
        }
        console.log('connect database successfully')
    }
)

db.serialize(function () {
    db.run('CREATE TABLE user(name text)', function (err) {
        if (err) {
            return console.log(err)

        }
        console.log('create table user')
    })


    db.run('INSERT INTO user(name) VALUES(?)', ['Alice'], function (err) {
        if (err) {
            return console.log('insert data error: ', err.message)
        }
        console.log('insert data: ', this)
    })

    db.all('SELECT name FROM user WHERE name = ?', ['Alice'], function (err, rows) {
        if (err) {
            return console.log('find Alice error: ', err.message)
        }

        console.log('find Alice: ', rows)
    })

    db.run(
        'UPDATE user SET name = ? WHERE name = ?', 
        ['Alin', 'Alice'], 
        function (err) {
            if (err) {
                return console.log('update data error: ', err.message)
            }
            console.log('update data: ', this)
        }
    )

    db.all('SELECT * FROM user', [], function (err, rows) {
        if (err) {
            return console.log('find error: ', err)
        }
        console.log('find updated data', rows)
    })

    db.run('DELETE FROM user WHERE name = ?', ['Alin'], function (err) {
        if (err) {
            return console.log(err.message)
        }
        console.log('deleted Alin: ', this)
    })
})

db.close(function (err) {
    if (err) {
        return console.log(err.message)
    }
    console.log('close database connection')
})


