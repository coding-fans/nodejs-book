.. 
    Author: huangxiaoyan
    Created time: 2020-03-07 10:28:02
    Last Modified by: huangxiaoyan
    Last Modified time: 2020-03-07 10:30:11

========
环境准备
========

Node 版本
=========

由于 `N-API` 是 `Node` 在 `8.x` 版本提出的，所以要使用这一新特性，理论上安装 `8.x` 以上的版本即可。
但是，`8.x` 版本提出的时候，该特性还处于试验阶段，因此，最好的版本建议是 `10.x` 以上。

可以通过执行以下命令，来查看 `Node` 的版本信息：

.. code-block:: shell-session

    $ node -v

安装node-gyp
============

`node-gyp` 是用 `Node` 编写的一个跨平台命令行工具，主要用于编译 `Node` 的原生模块。
它依据 `binding.gyp` 配置文件，将原生模块文件编译成 `.node` 文件，也就是动态链接库。

使用 `npm` 安装 `node-gyp`：

.. code-block:: shell-session

    $ npm i -g node-gyp


安装编译工具
============

由于 `node-gyp` 在编译时，依赖于不同平台的编译器，因此，针对不同平台，还需要安装不同的编译工具。

macOs平台
---------

对于 `macOs` 平台，需要安装以下依赖：

安装 `Python`，版本为 `2.7` , `3.5` , `3.6` , 或者 `3.7` 。

安装 `XCode` 命令行工具：

.. code-block:: shell-session

    $ xcode-select --install

Windows平台
-----------

使用 `Windows` 平台的，执行如下命令：

.. code-block:: shell-session

    $ npm install --global --production windows-build-tools


至此，环境准备结束，可以进行下一步的学习：

:doc:`quick-start`

下一步
======

.. include:: /_fragments/next-step-to-wechat-mp.rst

.. include:: /_fragments/disqus.rst

.. _Docker: https://www.docker.com/
.. _客户端: https://hub.docker.com/?overlay=onboarding
.. _官网: https://hub.docker.com/_/mongo
.. _Robo3t: http://nodejs.local:8000/database/mongodb/prepare.html#


