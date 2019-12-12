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

首先新建一个文件，命名为 `demo.cc`，并引入依赖的头文件。

.. literalinclude:: /_src/napi/demo/demo.cc
    :language: c
    :lines: 1-2
    :linenos:

在这里我们引入了 `node_api.h` 的头文件，这个头文件非常重要，可以说我们后续的代码都是建立在此基础上。
然后，还可以根据需要，引入其他头文件，比如 `stdio.h`，主要用来处理输入输出问题。


接着，定义一个 `SayHello` 的函数：

.. literalinclude:: /_src/napi/demo/demo.cc
    :language: c
    :lines: 4-8
    :linenos:

这个函数逻辑很简单，就是输出 `hello world`。
我们重点来看看 `napi_value`、 `napi_env` 和 `napi_callback_info`。

这三个，都是属于基本的 `N-API` 数据类型。
其中，`napi_value` 表示一个 `Javascript` 值。
`napi_env`
`napi_callback_info`


.. literalinclude:: /_src/napi/demo/demo.cc
    :language: c
    :lines: 10-24
    :linenos:

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