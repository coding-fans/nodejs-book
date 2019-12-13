.. 
    Author: huangxiaoyan
    Created time: 
    Last Modified by: huangxiaoyan
    Last Modified time: 

========
快速上手
========

在本节中，我们将以一个简单的例子，入门 `N-API`。
在开始学习前，如果还没有准备好开发环境，请先阅读 :doc:`prepare` 一节。

Hello World
===========

最经典的入门例子，我们从编写 `helloWorld` 程序开始。

头文件
------

首先新建一个文件，命名为 `demo.cc`，并引入依赖的头文件。

.. literalinclude:: /_src/napi/demo/demo.cc
    :language: c
    :lines: 1-2
    :linenos:

在这里我们引入了 `node_api.h` 的头文件，这个头文件提供了 `N-API` 封装的函数，是开发 `C/C++` 模块的基础。
然后，还可以根据需要，引入其他头文件，比如 `stdio.h`，主要用来处理输入输出问题。

逻辑函数
--------

接着，定义一个 `SayHello` 的函数：

.. literalinclude:: /_src/napi/demo/demo.cc
    :language: c
    :lines: 4-8
    :linenos:

这个函数逻辑很简单，就是输出 `hello world`。

我们重点看看 `napi_value` 、 `napi_env` 和 `napi_callback_info`。
`N-API` 封装了一些基本的数据类型，

Init函数
--------

.. literalinclude:: /_src/napi/demo/demo.cc
    :language: c
    :lines: 10-24
    :linenos:

模块注册
--------

.. literalinclude:: /_src/napi/demo/demo.cc
    :language: c
    :lines: 26
    :linenos:

代码编译
========

binding.gyp
-----------

.. literalinclude:: /_src/napi/demo/binding.gyp
    :language: json
    :linenos:

生成.node文件
-------------

.. code-block:: shell-session

    $ node-gyp build


调用.node文件
=============

.. literalinclude:: /_src/napi/demo/demo.js
    :language: javascript
    :linenos: