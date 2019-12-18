.. 
    Author: huangxiaoyan
    Created time: 2019-11-15 13:24:17
    Last Modified by: huangxiaoyan
    Last Modified time: 2019-11-23 10:06:13

===============
MongoDB环境准备
===============

在开始学习 *MongoDB* 前，我们需要部署 *MongoDB* 数据库服务。
但是，鉴于我们学习的重点是使用 *Node.js* 操作 *MongoDB* 数据库，
所以在此我们选择了另外一种方式，来跳过琐碎的部署与配置。

感谢 `Docker`_，提供了 *MongoDB* 镜像，供我们快速地安装与使用。

安装Docker
===========

由于 *Docker* 的用法不在我们的讨论范围。
因此，本节中只简单介绍如何安装 *Docker* 和在 *Docker* 中运行 *MongoDB* 数据库服务。

首先在 `Docker`_ 官网下载 `客户端`_。以下的安装与使用均以 *Mac* 为例。
下载完毕后，双击 *docker.dmg*，出现如下界面，按提示步骤完成，即安装成功。

.. figure:: /_images/database/mongodb/a609aaf1de097cc8fa48f04a5531b13d.png
    :width: 400px

下载MongoDB镜像
=================

安装完 *docker* 后，我们接下来需要下载 MongoDB 的镜像。可以在 `官网`_ 上查找有关 *MongoDB* 的镜像包。
在这，我们拉取 *MongoDB* 的 *3.6* 版本，执行命令：

.. code-block:: shell-session

    docker pull mongo:3.6


运行MongoDB服务
===============

在运行服务之前，我们需要新建一个 *service.yml* 文件，并写入以下内容：

.. code-block:: text

    // serivce.yml
    
    version: '3.1'

    services:
    mongo:
        image: mongo:3.6
        ports:
        - 27017:27017
        environment:
        MONGO_INITDB_ROOT_USERNAME: root
        MONGO_INITDB_ROOT_PASSWORD: to0r

这个文件定义了一个 *MongoDB* 服务，包含了 *mongdb* 服务的一些信息，包括 *mongodb* 的版本、服务运行的端口、
数据库用户名和密码。将 *service.yml* 保存在固定目录下，接下来我们需要使用它来创建并运行 *MongoDB* 服务。
需要注意的是，请尽量不要移动 *service.yml* 文件位置，不然已创建的服务需要重建。

打开终端，定位到 *service.yml* 文件所在的目录，并执行如下命令：

.. code-block:: shell-session

    $ docker-compose -f service.yml up -d mongo

执行成功后，我们来查看下 *MongoDB* 服务是否真的已经运行了：

.. code-block:: shell-session

    $ docker ps

可以看到出现了容器的信息：

.. code-block:: text

    CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                      NAMES
    c344ce31b67e        mongo:3.6           "docker-entrypoint.s…"   8 seconds ago       Up 6 seconds        0.0.0.0:27017->27017/tcp   docker-service_mongo_1

此时，*MongoDB* 服务正运行在 *27017* 的端口上。

安装Robo3t
==========

为了方便我们观察数据的变化，我们可以安装一个 *MongoDB* 的 *GUI* 客户端 —— `Robo3t`_ 。
下载后，双击安装程序，进入安装界面，按照提示进行，此处不再赘述。

打开 *Robo3t*，弹出下面弹框，我们可以遵循步骤，来连接 *MongoDB* 数据库。

.. figure:: /_images/database/mongodb/a192a6c8d623b2c4fd884d6db0969f89.png
    :width: 600px

点击左上角的 *Create* 按钮，填写对应信息，创建连接。

.. figure:: /_images/database/mongodb/fd5d6f3bafc18bef1faa5ff241c7b954.png
    :width: 600px

上图中，我们看到，需要连接的地址为：*localhost:27017*，端口与 *service.yml* 的一样，
不需修改。接下来，我们选择使用 *认证* 的方式连接。

.. figure:: /_images/database/mongodb/ba25d3187412c5fb37ec79bf93d90ad5.png
    :width: 600px

从 *service.yml* 文件中，我们可以很轻松得到用户名和密码，并填写。点击 *save* 按钮，
回到主界面后，点击 *connect* 按钮。就这样，我们连接了数据库，并且可以界面化操作数据库。

.. figure:: /_images/database/mongodb/cfb560de9e8b54d9e359a522b3d02961.png
    :width: 600px

至此，全部准备工作完毕，我们可以愉快地继续 *MongoDB* 的下一步学习：

:doc:`quick-start`

下一步
======

.. include:: /_fragments/next-step-to-wechat-mp.rst

.. include:: /_fragments/disqus.rst

.. _Docker: https://www.docker.com/
.. _客户端: https://hub.docker.com/?overlay=onboarding
.. _官网: https://hub.docker.com/_/mongo
.. _Robo3t: http://nodejs.local:8000/database/mongodb/prepare.html#