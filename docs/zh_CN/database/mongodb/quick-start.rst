.. 
    Author: huangxiaoyan
    Created time: 2019-11-13 17:23:38
    Last Modified by: huangxiaoyan
    Last Modified time: 2019-11-17 13:17:27

===============
MongoDB快速上手
===============

前面我们介绍了 `NeDB` 数据库，它是一个 *NoSQL* 的嵌入式数据库。今天我们再来介绍一款 *NoSQL* 的数据库 `MongoDB`_ 。

在开始学习前，需要准备 *MongoDB* 的环境。如果还没有 *MongoDB* 环境，请先阅读 :doc:`prepare` 一节。

安装mongodb
===========

*npm* 库提供了 `mongodb模块`_ 。执行如下命令，安装该模块：

.. code-block:: shell-session

    $ npm install mongodb --save

引入依赖
========

使用 *require* 引入 *mongodb* 模块，并获取 *MongoClient* 对象。

.. literalinclude:: /_src/database/mongodb/demo/demo.js
    :language: javascript
    :lines: 1
    :linenos:

连接数据库服务器
================

与 *NeDB* 不同的是，我们在操作 *MongoDB* 数据库前，需要先连接数据库。

.. code-block:: javascript
    :linenos:

    const url = 'mongodb://root:to0r@localhost:27017'
    MongoClient.connect(
        url, 
        function(err, client) {
            // 其他数据操作
            ...
        }
    )

使用 *connect* 方法建立连接，*connect* 方法接收两个参数： *url* 和 *callback*。
其中，*url* 表示数据库服务器的地址，格式为：

.. code-block:: text

    mongodb://{username}:{password}@{host}:{port}

回到本文中具体的例子，即：

.. literalinclude:: /_src/database/mongodb/demo/demo.js
    :language: javascript
    :lines: 2

*callback* 接收两个参数，*err* 和 *client* 。
*client* 表示已连接的 *MongoClient* 对象实例。

新建数据库
==========

连上了数据库服务器，我们现在还没有任何数据库，因此需要先新建一个：

.. literalinclude:: /_src/database/mongodb/demo/demo.js
    :language: javascript
    :lines: 6-8
    :linenos:

定义数据库名为 *user*，使用 *db* 方法建立数据库。

建表
====

在 *MongoDB* 中，表被称为 *collection*。建表，也即是建立 *collection* 。

.. literalinclude:: /_src/database/mongodb/demo/demo.js
    :language: javascript
    :lines: 9-11
    :linenos:

定义表名为 *user*，使用 *createCollection* 方法建表。

数据操作
========

插入
----

建表后，我们往 *user* 表中插入一条数据：

.. literalinclude:: /_src/database/mongodb/demo/demo.js
    :language: javascript
    :lines: 13-22
    :linenos:

学过 *NeDB* 的同学就会发现，这样的数据操作跟 *NeDB* 的写法如出一辙。
实际上，*NeDB* 是 *MongoDB* 的简化版，因此在写法上延续了 *MongoDB* 的风格。

查询
----

查询 *Alice* 的数据：

.. literalinclude:: /_src/database/mongodb/demo/demo.js
    :language: javascript
    :lines: 23-29
    :linenos:

*find* 方法并不会返回最终结果集，而是返回一个游标 *Cursor*。
要想获取全部结果，需要操作游标一个个寻找数据。
第4行，*toArray* 方法封装了这样的操作，并将数据组织成数组返回。

更新
----

将 *Alice* 的年龄更改为 *20* ：

.. literalinclude:: /_src/database/mongodb/demo/demo.js
    :language: javascript
    :lines: 30-43
    :linenos:

与 *updateOne* 对应的，有 *updateMany* 方法，用于更新多条数据。

验证下是否更改了 *Alice* 的数据：

.. literalinclude:: /_src/database/mongodb/demo/demo.js
    :language: javascript
    :lines: 44-50
    :linenos:

删除
----

删除 *Alice* 的数据：

.. literalinclude:: /_src/database/mongodb/demo/demo.js
    :language: javascript
    :lines: 51-60
    :linenos:

*deleteOne* 用于删除一条数据。如要删除多条数据，可以使用 *deleteMany* 方法。

关闭数据库
==========

最后，使用 *close* 方法关闭数据库：

.. literalinclude:: /_src/database/mongodb/demo/demo.js
    :language: javascript
    :lines: 61-68
    :linenos:

运行demo
========

执行命令：

.. code-block:: shell-session

    $ node demo.js

终端输出如下结果：

.. code-block:: text

    insert data:  { n: 1, ok: 1 }
    update Alice data
    find Alice:  [ { _id: 5dcd1195c792ec2f720e8dc7, name: 'Alice', age: 19 } ]
    find Alice new data:  [ { _id: 5dcd1195c792ec2f720e8dc7, name: 'Alice', age: 20 } ]
    remove data
    close database

下一步
======

.. include:: /_fragments/next-step-to-wechat-mp.rst

.. include:: /_fragments/disqus.rst

.. _mongodb模块: https://mongodb.github.io/node-mongodb-native/
.. _MongoDB: https://www.mongodb.com/