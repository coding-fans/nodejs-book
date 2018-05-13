.. 文件读写
    FileName:   index.rst
    Author:     Fasion Chan
    Created:    2018-03-03 11:45:04
    @contact:   fasionchan@gmail.com
    @version:   $Id$

    Description:

    Changelog:


.. 文件读写

===========
文件读写
===========

同步方法和异步方法
================

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

文件的读写操作
=============

readFile & writeFile
---------------------

fs.readFile(filename, [options], callback)

在readFile函数中，接受三个参数：

- filename 
用于指定读取文件的完整文件路径及文件名

- options 
指定读取文件时需要使用的选项，在该参数值对象中可以使用flag属性指定对该文件采取什么操作，默认为'r'。
另外，可以使用encoding属性指定编码格式

- callback
读取文件后的回调函数

fs.writeFile(filename, data, [options], callback)

在writeFile函数中，接受四个参数：

- filename
用于指定读取文件的完整文件路径及文件名

- data
用于指定要写入的内容

- options
指定读取文件时需要使用的选项，在该参数值对象中可以使用flag属性指定对该文件采取什么操作，默认为'r'。
另外，可以使用encoding属性指定编码格式

- callback
写入文件后的回调函数

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
read & write 涉及到读取或写入文件的具体数据，两者需要配合 open & close 来使用。

fs.open(filename, flags, [mode], function(err, fd){})

- filename
用于指定读取文件的完整文件路径及文件名

- flags
指定对该文件采取什么操作，默认为'r'

- mode
用于指定对该文件的读写权限，默认值为0666

fs.close(fd, [callback])

- fd
文件描述符

- callback
关闭文件后的回调函数

fs.read(fd, buffer, offset, length, position, function(err, bytesRead, buffer) {})

- fd
文件描述符

- buffer
Buffer对象，用于指定将文件数据读取到哪个缓存区中

- offset
为整数值，用于指定向缓存区中写入数据时的开始写入位置（以字节为单位）

- length
为整数值，用于指定从文件中读取的字节数

- position
为整数值，用于指定读取文件时的开始位置（以字节为单位）

- callback
用于指定文件读取操作执行完毕时执行的函数
    - err 读取文件操作失败时触发的错误对象
    - bytesRead 实际读取的字节数
    - buffer 表示被读取的缓存区对象

fs.write(fd, buffer, offset, length, position, function(err, written, buffer) {})

- fd/buffer/offset/length/position 
参数取值及意义同read函数一致

fs.fsync(fd, [callback])

- fd
文件描述符

如何使用这几个函数，来达到读取/写入部分数据到文件呢？

下面是一个简易例子

.. code-block:: javascript

    var fs = require('fs')
    // 打开文件
    fs.open('./message.txt', 'r', function(err, fd) {
        // 创建缓存区，用于将文件数据读取到缓存区
        var buf = new Buffer(255)
        // 读取文件
        fs.read(fd, buf, 0, 9, 3, function(err, bytesRead, buffer) {
            console.log(buffer.slice(0, bytesRead).toString())
            // 从文件的当前读取位置继续往下读取
            fs.read(fd, buf, 0, 3, null, function(err, bytesRead, buffer) {
                console.log(buffer.slice(0, bytesRead).toString())
                // 关闭文件
                fs.close(fd)
            })
        })
    })
    // 创建缓存区
    var buf = new Buffer('我喜爱编程')
    // 打开文件
    fs.open('./anotherMessage.txt', 'wx', function(err, fd) {
        // 写文件
        fs.write(fd, buf, 0, 15, 0, function(err, written, buffer) {
            if (err) {
                console.log('写文件操作失败')
            } else {
                console.log('写文件操作成功')
            }

            // 把剩余所有数据写入文件中
            fs.fsync(fd)
            // 关闭文件
            fs.close(fd)
        })
    })




