.. 
    Author: huangxiaoyan
    Created time: 2019-11-09 11:35:55
    Last Modified by: huangxiaoyan
    Last Modified time: 2019-11-17 10:52:36

=====
N-API
=====
`N-API` 是 `Node` 在 `8.x` 版本提出的一个新特性，主要为开发者编写 `Nodejs` 原生 `C/C++` 插件提供了一个更为便捷和易于理解的方式。

在早期，开发者在开发原生 `C/C++` 模块时，需要理解 `V8` 引擎的原理，并且可能面临由于 `V8` 引擎的变更或者 `Node` 版本的升级而需要重新开发的风险。
再后来，出现了 `NAN(Native Abstractions for Node.js)`，即 `Node.js` 原生模块抽象接口，这个方案解决了依赖 `V8` 引擎和 `Node` 版本的风险。
但是，即便如此，在不同版本的 `Node` 下，同一份代码也需要重新编译，才可使用。
于是，`N-API` 应运而生，它将 `Node` 底层的数据结构全部黑盒化，抽象成统一的接口。

在本系列文章中，我们将一步步学习如何使用 `N-API` 进行 C/C++ 模块开发。

.. toctree::
    :titlesonly:

    环境准备 <prepare>
    快速上手 <quick-start>
