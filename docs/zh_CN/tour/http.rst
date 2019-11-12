.. 标准库
    FileName:   index.rst
    Author:     Huang Xiaoyan
    Created:    2018-06-03 16:14:00
    @contact:   hxysnail@gmail.com
    @version:   $Id$

    Description:

    Changelog:

========
HTTP模块
========

`Node.js` 有一个内置的HTTP模块，允许 `Node.js` 使用超文本传输协议(HTTP)传输数据。

我们使用 ``require`` 函数来引入 `HTTP` 模块。

.. code-block:: javascript

    var http = require('http')


Node.js作为web服务器
====================

`HTTP` 模块可以创建一个 `HTTP` 服务器，监听服务器端口，并给客户端返回响应信息。

使用 ``createServer`` 方法来创建一个 `HTTP` 服务器：

.. code-block:: javascript

    var http = require('http');

    //create a server object:
    http.createServer(function (req, res) {
        res.write('Hello World!'); //write a response to the client
        res.end(); //end the response
    }).listen(8080); //the server object listens on port 8080


传递到 ``http.createServer()`` 中的回调函数，将会在访问 `8080` 端口时被执行。

把上述代码保存到一个命名为 ``demo_http.js`` 的文件中，并初始化该文件：

.. code-block:: shell

    C:\Users\Your Name>node demo_http.js

如果你遵循了上述步骤，访问 `<http://localhost:8080>`_ ，你将会看到和例子中一样的结果。

添加HTTP头部
============

如果 `HTTP` 服务器返回的内容需要以 ``HTML`` 的格式展示，你需要在 `HTTP` 头部中包含一个正确的文本类型：

.. code-block:: javascript

    var http = require('http');
    http.createServer(function (req, res) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('Hello World!');
        res.end();
    }).listen(8080);

``res.writeHead()`` 函数的第一个参数是状态码，``200`` 表示 ``ok`` 。第二个参数是一个包含响应头部的对象。

读取查询字符串
==============

``http.createServer()`` 的回调函数中，有一个 ``req`` 参数，代表从客户端传来的请求对象(继承于 ``http.IncomingMessage`` 对象)。

这个对象有一个 ``url`` 的属性，保存着域名之后的 `url参数部分`。

.. code-block:: javascript

    // demo_http_url.js

    var http = require('http');
    http.createServer(function (req, res) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(req.url);
        res.end();
    }).listen(8080);

把上述代码保存到一个名为 ``demo_http_url.js`` 的文件中，并初始化文件。

.. code-block:: shell

    C:\Users\Your Name>node demo_http_url.js

如果你遵循了上述的步骤，访问以下两个地址，你将会得到两个不同的结果。

`<http://localhost:8080/summer>`_

会产生这个结果： ``/summer``

`<http://localhost:8080/winter>`_

会产生这个结果： ``/winter``

分割查询字符串
==============

有一些内置模块可以很容易地把查询字符串分割为可读的结构，比如 `URL` 模块。

.. code-block:: javascript

    // 分割查询字符串为可读结构
    var http = require('http');
    var url = require('url');

    http.createServer(function (req, res) {
        res.writeHead(200, {'Content-Type': 'text/html'});
        var q = url.parse(req.url, true).query;
        var txt = q.year + " " + q.month;
        res.end(txt);
    }).listen(8080);

把上述代码保存到一个名为``demo_querystring.js``的文件，并初始化文件。

.. code-block:: shell

    C:\Users\Your Name>node demo_querystring.js

访问以下地址：

`<http://localhost:8080/?year=2017&month=July>`_

会产生这个结果： ``2017 July``

下一步
======

.. include:: /_fragments/next-step-to-wechat-mp.rst

.. include:: /_fragments/wechat-reward.rst