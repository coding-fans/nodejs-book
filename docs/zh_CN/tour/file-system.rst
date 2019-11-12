
========
文件模块
========


Node.js作为文件服务器
=====================

`Node.js` 的文件系统模块允许你调用计算机上的文件系统，来操作文件。

我们使用 ``require`` 函数来引入文件系统模块。

.. code-block:: javascript

    var fs = require('fs')


文件系统的常用用法有：

- 读取文件
- 创建文件
- 更新文件
- 删除文件
- 重命名文件

读取文件
========

可以使用 ``fs.readFile()`` 方法来操作电脑上的文件

假设我们有以下的 ``HTML`` 文件（和 `Node.js` 文件置于同一目录下）

.. code-block:: html

    <!--demofile1.html-->

    <html>
        <body>
            <h1>My Header</h1>
            <p>My paragraph.</p>
        </body>
    </html>

创建一个读取该 ``html`` 文件的 `Node.js` 文件，并且返回读取的内容。

.. code-block:: javascript

    var http = require('http');
    var fs = require('fs');

    http.createServer(function (req, res) {
        fs.readFile('demofile1.html', function(err, data) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        });
    }).listen(8080);

保存上述代码到 ``demo_readfile.js`` ，并执行。

.. code-block:: shell

    C:\Users\Your Name>node demo_readfile.js


访问 `<http://localhost:8080>`_ ，将会看到和例子一样的结果。

创建文件
========

创建文件，有以下的方法可以使用：

- fs.appendFile()
- fs.open()
- fs.writeFile()

``fs.appendFile()`` 方法可以往文件添加指定的内容，如果文件不存在，将会被创建。

.. code-block:: javascript

    // 用fs.appendFile()来创建文件
    var fs = require('fs');

    fs.appendFile('mynewfile1.txt', 'Hello content!', function (err) {
        if (err) throw err;
        console.log('Saved!');
    });

``fs.open()`` 方法的第二个参数 ``flag`` ，如果取值为 ``w`` 的话，也就是 ``writing`` ，表示打开该文件是为了写入。
如果该文件不存在，将会创建一个空文件。

.. code-block:: javascript

    var fs = require('fs');

    fs.open('mynewfile2.txt', 'w', function (err, file) {
        if (err) throw err;
        console.log('Saved!');
    });

``fs.writeFile()`` 方法可以替换已存在文件的内容，如果该文件不存在，一个新文件将会被创建，并且包含了写入的内容。

.. code-block:: javascript

    var fs = require('fs');

    fs.writeFile('mynewfile3.txt', 'Hello content!', function (err) {
        if (err) throw err;
        console.log('Saved!');
    });

更新文件
========

可以调用以下方法来更新文件：

- fs.appendFile()

- fs.writeFile()

``fs.appendFile()`` 方法可以往文件的末尾添加指定的内容：

.. code-block:: javascript

    // 将"this is my text."这句话添加到文件"mynewfile1.txt"的结尾

    var fs = require('fs');

    fs.appendFile('mynewfile1.txt', ' This is my text.', function (err) {
        if (err) throw err;
        console.log('Updated!');
    });

``fs.writeFile()`` 方法可以替换文件中的内容：

.. code-block:: javascript

    // 替换"mynewfile3.txt"的内容

    var fs = require('fs');

    fs.writeFile('mynewfile3.txt', 'This is my text', function (err) {
        if (err) throw err;
        console.log('Replaced!');
    });

删除文件
========

可以调用 ``fs.unlink()`` 来删除指定的文件：

.. code-block:: javascript

    // 删除"mynewfile2.txt"

    var fs = require('fs');

    fs.unlink('mynewfile2.txt', function (err) {
        if (err) throw err;
        console.log('File deleted!');
    });

重命名文件
==========

可以调用 ``fs.rename()`` 方法来重命名文件：

.. code-block:: javascript

    // 将 "mynewfile1.txt" 重命名为 "myrenamedfile.txt"

    var fs = require('fs');

    fs.rename('mynewfile1.txt', 'myrenamedfile.txt', function (err) {
        if (err) throw err;
        console.log('File Renamed!');
    });

下一步
======

.. include:: /_fragments/next-step-to-wechat-mp.rst

.. include:: /_fragments/wechat-reward.rst
