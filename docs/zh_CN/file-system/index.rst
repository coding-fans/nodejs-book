.. 文件系统

========
操作文件系统
========

同步方法和异步方法
===============

在Nodejs中，使用fs模块来实现有关文件及目录的创建、写入及删除操作，此中所有操作都可以使用同步和异步两种方式。

.. code-block:: javascript

    // 同步方法
    var fs = require('fs')
    var data = fs.readFile('./text.txt', 'utf8')

    // 等待操作返回结果
    console.log(data)

.. code-block:: javascript

    // 异步方法
    var fs = require('fs')
    fs.readFile('./text.txt', (err, data) => {
        // 操作结果作为回调函数参数返回
        console.log(data)
    })

同步与异步的区别在于：
同步方法立即返回操作结果，但在使用同步方法执行的操作结束之前，不能执行后续代码。
而异步方法将操作结果作为回调函数的参数进行返回，在方法调用之后，可以立即执行后续代码。

读写操作
=======

readFile & writeFile
-------------------

下面是一个简易的例子

.. code-block:: javascript

    var fs = require('fs')
    var txt = '写入测试数据\r\n成功'

    fs.readFile('./text.txt', 'utf8', (err, data) => {
        if(err) {
            console.log('读取文件失败')
        } else {
            console.log(data)
        }
    })

    fs.writeFile('./text.txt', txt, 'utf8', (err) => {
        if(err) {
            console.log('写入文件失败')
        } else {
            console.log('写入文件成功')
        }
    })

与异步操作对应的有同步操作，readFileSync 和 writeFileSync。

readFile 和 writeFile 这两个方法，是读取文件里的所有数据，那如果我们只是想读取文件的某部分数据，应该怎么做呢？

这就涉及到 read & write 这两个方法了

read & write
------------


创建与读取目录
============

mkdir & readdir
---------------

查看与修改文件或目录的信息
=================

stat & lstat
-------------

exists
-------

realpath
---------

utimes
------

chmod
-----



