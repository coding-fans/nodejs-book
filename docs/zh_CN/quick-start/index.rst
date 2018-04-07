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

安装
========
`Node.js官网 <https://nodejs.org/en/>`_ 上提供了 `Windows` 与 `Mac` 版本的安装程序，以及 `Linux` 版本的源代码。

下面以 `Mac` 系统为例来安装 `Node` ：

进入官网，可以看到有两个版本的 `Node`，在这里，我们推荐大家使用 `LTS` 版本，因为这个版本是稳定的，并且可以使你从老版本丝滑过渡到新版本。

点击下载，下载完毕后，打开安装程序，进行安装。

.. figure:: /_images/quick-start/ba4e6179e73a070345e6e0d6dcd35f5d.jpg
    :width: 400px

在安装 `Node` 的同时，也会自动帮我们安装对应版本的 `Npm` ， `Npm` 是一个强大的库管理工具，在以后的开发中，我们会经常接触到。

.. figure:: /_images/quick-start/f0c85bfc1365d5461699254a1e5ae256.jpg
    :width: 400px

点击继续，进行安装，一般按照默认的安装位置进行安装即可。
在 `Windows` 中，默认的安装路径是 ``C:\Program Files\nodejs``。
在 `Mac` 中，默认的安装路径是 ``/usr/local/bin``

.. figure:: /_images/quick-start/ad02bac99889aae7e78b65ea8f092e5b.jpg
    :width: 400px

`Node` 安装成功。

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
