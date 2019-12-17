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

在这里我们引入了 `node_api.h` 的头文件，这个头文件提供了 `N-API` 封装的函数，是开发 `C/C++` 模块的基础。
然后，还可以根据需要，引入其他头文件，比如 `stdio.h`，主要用来处理输入输出问题。

逻辑函数
--------

接着，定义一个 `SayHello` 的函数：

.. literalinclude:: /_src/napi/demo/demo.cc
    :language: c
    :lines: 4-8

这个函数逻辑很简单，就是输出 `hello world`。

我们重点看看 `napi_value` 、 `napi_env` 和 `napi_callback_info`。

`N-API` 封装了一些基本的数据类型。
其中，`napi_value` 是对所有 `javascript` 基本类型的一个密闭封装，简单来说，就是表示 `javascript` 类型；
`napi_env` 表示上下文变量；
`napi_callback_info` 代表传递给回调函数的一个封装的数据类型，可以用于获取有关调用时的上下文信息，也可以用于设置回调函数的返回值。

模块注册
--------

.. literalinclude:: /_src/napi/demo/demo.cc
    :language: c
    :lines: 10-26
    :linenos:

第 `3` 行，`napi_status` 是一个状态枚举，代表 `N-API` 函数的执行状态，若返回 `napi_ok` ，则表示执行成功。

第 `6-8` 行，将 `C/C++` 函数通过 `napi_create_function` 转变成 `Javascript` 类型函数，其实也就是将 `SayHello` 赋值给了 `fn` 。

第 `10-12` 行，设置 exports 对象的一个属性为 `sayHello`，对应属性值为 `fn`，相当于 `javascript` 代码中的 `exports.sayHello = fn`；
`Init` 函数最终返回一个 `exports` 对象，也就是最终导出的对象。

第 `17` 行，`NAPI_MODULE` 用于进行模块注册。注意到，这行代码并没有分号，因为，`NAPI_MODULE` 并不是一个函数，而是定义的一个宏。

在本例中，我们采用 `node-gyp` 来构建插件，使用宏 `NODE_GYP_MODULE_NAME` 作为 `NAPI_MODULE()` 的第一个参数将确保会将最终二进制文件的名称传给 `NAPI_MODULE()`。

构建插件
========

binding.gyp
-----------

构建前，需要先提供一个 `binding.gyp` 的配置文件，`node-gyp` 通过读取该配置文件来进行构建。

.. literalinclude:: /_src/napi/demo/binding.gyp
    :language: json

生成.node文件
-------------

在 `binding.gyp` 同一目录下，执行构建命令，生成 `.node` 文件，这个文件将会被放进 `build/Release` 目录：

.. code-block:: shell-session

    $ node-gyp build

调用.node文件
=============

生成 `.node` 文件后，我们新建 `deom.js`，并通过 `require` 来引入文件：

.. literalinclude:: /_src/napi/demo/demo.js
    :language: javascript

执行 `demo.js`，输出以下结果：

.. code-block:: shell-session

    $ node demo.js
    Hello World

下一步
======

.. include:: /_fragments/next-step-to-wechat-mp.rst

.. include:: /_fragments/disqus.rst

.. _Docker: https://www.docker.com/
.. _客户端: https://hub.docker.com/?overlay=onboarding
.. _官网: https://hub.docker.com/_/mongo
.. _Robo3t: http://nodejs.local:8000/database/mongodb/prepare.html#