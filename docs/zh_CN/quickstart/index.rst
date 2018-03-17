.. 快速开始
    FileName:   index.rst
    Author:     Fasion Chan
    Created:    2018-03-17 15:57:40
    @contact:   fasionchan@gmail.com
    @version:   $Id$

    Description:

    Changelog:

========
快速开始
========

你好世界
========

`Node` 安装完毕后，通过命令行可以访问到 ``node`` 命令：

.. code-block:: shell-session

	fasion@MacKhaos:~$ node --version
	v4.3.2

运行 ``node`` 命令，进入 **交互式模式** 。

在交互式模式中，可以直接输入代码并执行。
先向屏幕输出一句话吧：

.. code-block:: shell-session

	fasion@MacKhaos:~$ node
	> console.log('Hello, 世界!')
	Hello, 世界!

虽然很不可思议，我们成功地运行了第一个 ``Node.js`` 程序！

Web服务器
---------

作为一门 `Web` 开发语言， `Node.js` 实现 `Web` 服务器也是小菜一碟。
新建一个文件 ``app.js`` ，编写代码如下：

.. literalinclude:: /_src/quickstart/app.js
    :caption:
    :name: quickstart/app.js
    :language: javascript
    :linenos:

编辑完毕后，在命令行下运行：

.. code-block:: shell-session

    fasion@MacKhaos:~$ node quickstart/app.js
    Server running at http://127.0.0.1:3000/

此时，一个 `Web` 服务器已经在运行了，监听端口为 ``3000`` 。
用浏览器访问 `http://localhost:3000 <http://localhost:3000>`_ ，将看到 ``Hello, 世界!`` 。

回过头来分析程序代码：

第 ``13`` 行引入 ``http`` 模块；
``15`` - ``16`` 行定义服务器监听地址及端口；
第``18`` 行创建一个 ``http`` 服务器，参数是一个回调函数，在请求到达时调用；
在回调函数里，向客户端响应状态码、头部以及数据；
第 ``24`` 行调用 ``listen`` 方法，看是监听指定端口并对外服务。

下一步
======

.. include:: /_fragments/next-step-to-wechat-mp.rst

.. include:: /_fragments/wechat-reward.rst
