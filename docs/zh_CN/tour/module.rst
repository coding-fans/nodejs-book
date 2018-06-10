.. Node.js模块
    FileName:   module.rst
    Author:     Huang Xiaoyan
    Created:    2018-06-03 16:14:00
    @contact:   hxysnail@gmail.com
    @version:   $Id$

    Description:

    Changelog:

===========
Node.js模块
===========

什么是 `Node.js` 模块？

可以把一个模块认为是一个 `javascript` 库；也可以认为是应用中包含的一系列功能。

内置模块
=======

`Node.js` 有一系列的内置模块，内置模块无需额外安装：

`内置模块列表 <https://www.w3schools.com/nodejs/ref_modules.asp>`_

引用模块
========

使用 ``require`` 函数，来引用模块：

.. code-block:: javascript

    var http = require('http')


现在，你的应用已经可以使用 ``HTTP`` 模块，能够创建一个服务器( ``server`` )：

.. code-block:: javascript

    http.createServer(function (req, res) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end('Hello World!');
    }).listen(8080);


创建自己的模块
============

你可以创建自己的模块，并且可以很方便地在应用里引用他们。

下面的例子，创建了一个返回日期和时间对象的模块：

.. code-block:: javascript

    exports.myDateTime = function () {
        return Date();
    };

使用 ``export`` 关键字，导出可以供外部访问的属性和方法。

保存上述模块代码到一个 ``myfirstmodule.js`` 的文件。

引用自己的模块
============

现在，你可以在任何 `Node.js` 文件里引入这个模块：

.. code-block:: javascript

    // 引用myfirstmodule
    var http = require('http');
    var dt = require('./myfirstmodule');

    http.createServer(function (req, res) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write("The date and time are currently: " + dt.myDateTime());
        res.end();
    }).listen(8080);


注意到我们使用 ``./`` 来定位这个模块，这表明，这个模块和该 ``Node.js`` 文件处在同一个文件夹下。

把上述代码保存到一个命名为 ``demo_module.js`` 的文件中，并在终端运行：

.. code-block:: shell-session

    // 初始化demo_module.js
    C:\Users\Your Name>node demo_module.js

如果你遵循了上述的步骤，访问 `<http://localhost:8080>`_ ，你将在浏览器看到和例子一样的运行结果。

下一步
======

.. include:: /_fragments/next-step-to-wechat-mp.rst

.. include:: /_fragments/wechat-reward.rst