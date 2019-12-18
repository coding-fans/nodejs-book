.. 
    Author: huangxiaoyan
    Created time: 2019-11-10 12:19:51
    Last Modified by: huangxiaoyan
    Last Modified time: 2019-11-23 09:54:20

==============
SQLite快速上手
==============

还记得之前我们学过的 `NeDB`_ 数据库吗？它是一款 `Nodejs`_ 编写的 `NoSQL` 嵌入式数据库。
今天我们来认识另外一款嵌入式数据库，`SQLite`_。

与 *NeDB* 一样，`SQLite`_ 也具有零配置、无服务的特点，遵循 *ACID* 规则，是一款备受欢迎的轻量级数据库。

.. note::

    `ACID` 规则即：A（原子性）、C（一致性）、I（独立性）、D（持久性）

安装sqlite3
===========

使用 *npm* 安装 `sqlite3`_，执行如下命令：

.. code-block:: shell-session

    $ npm i sqlite3 --save

连接数据库
==========

引入依赖
--------

.. literalinclude:: /_src/database/sqlite/demo/demo.js
    :language: javascript
    :lines: 8
    :linenos:

引入 *sqlite3* 模块后，执行了 *verbose* 函数。
*verbose* 函数用于将执行模式设置为输出调用堆栈，也就是说，如果代码出错，
将会定位到具体的代码执行函数，而不仅仅只是提示错误信息，方便我们调试代码。

初始化数据库
------------

.. literalinclude:: /_src/database/sqlite/demo/demo.js
    :language: javascript
    :lines: 14-23
    :linenos:

第 *1* 行，使用 *Database* 函数，初始化数据库对象 *db*；
第 *2* 行，配置数据存储的文件路径为 *user.db* ；
第 *3* 行，指定数据库操作模式为读写模式。
得到一个数据库对象 *db* 后，接下来我们进行建表操作。

run方法
=======

*sqlite3* 模块提供了一个执行 *sql* 语句的方法 *run*。
有了这个方法，我们可以很简单地执行对应的 *sql* 语句，实现除了*查询*操作之外的*建表*、*插入*、*更新* 及 *删除* 操作。
那 *查询* 用什么方法呢？别急，接下来会介绍到。

在操作数据库之前，有必要先介绍 *run* 方法如何使用。
*run* 接收三个参数，分别是，*sql*、*value* 和 *callback*。语法糖如下：

.. code-block:: javascript

    run(sql, value, callback)

其中，*sql* 表示需要执行的语句，*value* 表示 *sql* 语句中需要替换的值，*callback* 则是执行后的回调函数。
具体的例子，可以接着看下面的介绍。

建表
====

我们建立一张表，命名为user：

.. literalinclude:: /_src/database/sqlite/demo/demo.js
    :language: javascript
    :lines: 26-32
    :linenos:

建表没有存储数据的操作，因此不必传入 *value*。

数据操作
========

插入
----

*sqlite* 表示插入的 *sql* 语句为： *INSERT INTO table_name(column_name) VALUES(value)* 。
对应的，可以写出以下代码：

.. literalinclude:: /_src/database/sqlite/demo/demo.js
    :language: javascript
    :lines: 35-40
    :linenos:

第 *1* 行，*run* 方法的第二参数 *value*，主要用于替换 *sql* 语句的 *?* 符号;
第 *5* 行，*callback* 中的 *this* 关键字，存储了插入数据的信息。结构为：
*Statement {sql: 'sql语句', lastID: id, changes: changesNum }*

查询
----

查询数据，我们使用另一个方法：*all*。*all* 方法表示查询所有数据，除此之外，*sqlite3* 还提供了`其他查询方式`。

.. literalinclude:: /_src/database/sqlite/demo/demo.js
    :language: javascript
    :lines: 42-48
    :linenos:

第 *1* 行，*all* 同 *run* 方法一样，接收三个参数：*sql*、*value*、*callback*，用法也同 *run* 方法一样，不再详述；
第 *6* 行，*callback* 除了 *err* 参数，还有 *rows* 参数，表示插入后的数据。

更新
----

将 *name* 的值，由 *Alice* 改为 *Alin*：

.. literalinclude:: /_src/database/sqlite/demo/demo.js
    :language: javascript
    :lines: 50-59
    :linenos:

第 *2* 行，更新的 *sql* 语句中，出现了两个 *?* 符号，因此对应的，可以看到 *value* 数组也传入了两个数据。

验证下是否成功将 *Alice* 改为 *Alin*：

.. literalinclude:: /_src/database/sqlite/demo/demo.js
    :language: javascript
    :lines: 61-66
    :linenos:

删除
----

将 *name* 值改为 *Alin* 后，删除 *Alin* 的数据：

.. literalinclude:: /_src/database/sqlite/demo/demo.js
    :language: javascript
    :lines: 68-74
    :linenos:

关闭数据库
==========

在做完所有操作后，使用 *close* 方法关闭数据库：

.. literalinclude:: /_src/database/sqlite/demo/demo.js
    :language: javascript
    :lines: 76-81
    :linenos:

运行demo
========

ok，至此我们知道了数据库从连接、建表、操作数据到关闭的过程，先来运行下 *demo*：

.. code-block:: shell-session

    $ node demo.js

终端输出如下：

.. code-block:: text

    connect database successfully
    find error:  { [Error: SQLITE_ERROR: no such table: user] errno: 1, code: 'SQLITE_ERROR' }
    SQLITE_ERROR: no such table: user
    update data error:  SQLITE_ERROR: no such table: user
    insert data error:  SQLITE_ERROR: no such table: user
    create table user
    find Alice:  undefined
    close database connection

咦？这结果不对，报错了。仔细看下结果，发现，插入、更新、建表等操作都乱了顺序执行。
建表前进行查询、更新等操作，当然会报 *no such table* 错误。
现在知道问题了，是因为操作没有顺序执行，怎么解决呢？
*sqlite3* 提供了 *serialize* 方法，顾名思义，指定操作串行执行。使用如下：

.. code-block:: javascript

    // 引入依赖
    const sqlite3 = require('sqlite3').verbose()
    // 初始化数据库
    var db = new sqlite.Database(...)
    db.serialize(function() {
    // 建表
    db.run('CREATE ...')
    // 插入数据
    db.run('INSERT ...')
    // 查询数据
    db.all('SELECT ...')
    // 更新数据
    db.run('UPDATE ...')
    // 删除数据
    db.run('DELETE ...')
    })

    // 关闭数据库
    db.close(...)

以上有关数据库的操作均为伪代码，具体的可看上面几小节。

加上 *serialize* 方法后，我们再运行 *demo*，输出如下结果：

.. code-block:: text

    connect database successfully
    create table user
    insert data:  Statement {
    sql: 'INSERT INTO user(name) VALUES(?)',
    lastID: 1,
    changes: 1 }
    find Alice:  [ { name: 'Alice' } ]
    update data:  Statement {
    sql: 'UPDATE user SET name = ? WHERE name = ?',
    lastID: 1,
    changes: 1 }
    find updated data [ { name: 'Alin' } ]
    deleted Alin:  Statement { sql: 'DELETE FROM user WHERE name = ?', lastID: 1, changes: 1 }
    close database connection

成功了！

下一步
======

.. include:: /_fragments/next-step-to-wechat-mp.rst

.. include:: /_fragments/disqus.rst

.. _NeDB: ../nedb/index.html
.. _SQLite: https://www.sqlite.org/index.html
.. _Nodejs: https://nodejs.org/
.. _sqlite3: https://www.npmjs.com/package/sqlite3