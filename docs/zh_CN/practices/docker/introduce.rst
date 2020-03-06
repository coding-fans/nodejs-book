.. 
    Author: huangxiaoyan
    Created time: 2020-03-06 13:12:04
    Last Modified by: huangxiaoyan
    Last Modified time: 2020-03-06 13:37:38

=======================
前端工程师眼中的 Docker
=======================

笔者最近在整理 *Node.js* 操作各数据库的方法，却不料遇到一个很棘手的问题：很多数据库，都需要同时下载 *Server* 端和 *Client* 端，并进行相应的配置，着实是麻烦。那有没有方法可以省去这些步骤呢？

答案肯定是有的，这就是今天要介绍的主题 —— `Docker`_。

Docker 概述
===========

那 *Docker* 是什么呢？

通俗地讲，当我们部署代码到生产服务器时，第一次都需要先进行环境配置，比如你有 *100* 台机器，你就要手动配置 *100* 台服务器的环境，这样难保不会出错。 *Docker* 则将软件服务制作成标准化的模板，也就是镜像，从而实现快捷部署。每次部署新机器，只需要拉取相关镜像，即可一键完成。

*Docker* 官方提供了很多标准镜像，涵盖 *MySQL*、*MongoDB*、*Node.js* 等常见开源软件。此外，开发者也可以在已有镜像的基础上，打造属于自己的定制化镜像。

接下来以 *MySQL* 为例，快速入坑 *Docker*。

镜像和镜像库
============

那么如何获取镜像呢？

*Docker* 镜像一般存储在 `镜像库`_ ( *registry* ) 中。 `Docker Hub`_ 和 `Docker Cloud`_ 是公共镜像库，任何人均可使用。 *Docker* 默认使用 *Docker Hub* 。同时，用户也可以部署自己的私有镜像库。

拉取镜像
--------

首先，从镜像库中拉取 *MySql 8.0* 版本的镜像：

.. code-block:: shell-session

    $ docker pull mysql:8.0

镜像列表
--------

读取镜像列表，验证 *MySQL* 镜像是否拉取成功：

.. code-block:: shell-session

    $ docker images
    REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
    mysql               8.0                 c8ad2be69a22        3 days ago          465MB

可以看到 *MySQL* 已经在镜像列表中，版本号为 *8.0* 。

容器
====

**容器** 是通过 **镜像** 创建的可执行环境，同个镜像可以实例化多个容器。

创建容器
--------

现在，让我们使用 *MySQL* 镜像创建容器：

.. code-block:: shell-session

    $ docker run --name first-mysql -e MYSQL_ROOT_PASSWORD=123456 -d mysql:8.0

命令有点长，且听我细细讲述。

``docker run`` 命令用于创建并执行新容器：``--name``，用于指定容器名，在此我们将新容器命名为 ``first-mysql``；``-e`` ，即 ``--environment``，指定环境变量，``MYSQL_ROOT_PASSWORD`` 环境变量用于配置数据库 *root* 用户的密码；``-d``，让容器在后台运行；最后指定镜像名和版本号，这里用的是 ``mysql:8.0``。

容器列表
--------

``docker ps`` 命令用于读取正在运行的容器列表：

.. code-block:: shell-session

    $ docker ps
    CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                 NAMES
    a68be49896f8        mysql:8.0           "docker-entrypoint.s…"   6 seconds ago       Up 5 seconds        3306/tcp, 33060/tcp   first-mysql


``docker ps -a`` 命令用于读取所有容器列表，包括停止的容器：

.. code-block:: shell-session

    $ docker ps -a
    CONTAINER ID        IMAGE               COMMAND                  CREATED              STATUS                      PORTS                      NAMES
    a68be49896f8        mysql:8.0           "docker-entrypoint.s…"   About a minute ago   Up About a minute           3306/tcp, 33060/tcp        first-mysql
    c344ce31b67e        mongo:3.6           "docker-entrypoint.s…"   3 months ago         Exited (255) 3 months ago   0.0.0.0:27017->27017/tcp   docker-service_mongo_1


列表中一共有两个容器，从 *STATUS* 列可以获知容器的状态。*first-mysql* ，处于运行的状态；*docker-service_mongo_1* 处于退出状态。

停止容器
--------

使用 ``docker stop`` 命令停止容器。

.. code-block:: shell-session

    $ docker stop a68be49896f8

``a68be49896f8`` 是 *first-mysql* 的 容器 *ID*。

查看容器列表，发现 *first-mysql* 容器此时已处于退出状态：

.. code-block:: shell-session

    $ docker ps -a
    CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS                      PORTS                      NAMES
    a68be49896f8        mysql:8.0           "docker-entrypoint.s…"   20 minutes ago      Exited (0) 3 seconds ago                               first-mysql

开启容器
--------

使用 ``docker start`` 开启已被停止的容器，这里，我们开启刚刚被停止的 *first-mysql*。

.. code-block:: shell-session

    $ docker start a68be49896f8

查看容器列表，此时 *first-mysql* 容器已经是运行中状态。

.. code-block:: shell-session

    $ docker ps
    CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                 NAMES
    a68be49896f8        mysql:8.0           "docker-entrypoint.s…"   25 minutes ago      Up 6 seconds        3306/tcp, 33060/tcp   first-mysql


在容器内执行命令
----------------

掌握了镜像和容器的基本操作后，接下来，让我们来看看如何操作 *MySQL*。我们拉取的 *MySQL* 镜像，已经内置了客户端程序 *mysql* 命令，可以直接连接并操作 *MySQL* 。那么，如何在容器内执行命令呢？

这就要用到 ``docker exec`` 命令了：

.. code-block:: shell-session

    $ docker exec -it first-mysql bash


这个命令在容器 *first-mysql* 内执行 ``bash`` 命令，启动一个交互式 *Shell* 。注意到，命令行参数 ``-it`` 表示提供交互式的终端。

执行完上述命令，不出意外，便进入容器 *Shell* 环境：

.. code-block:: shell-session
    
    root@a68be49896f8:/#

在 *Shell* 中，执行 *mysql* 命令即可连接数据库：

.. code-block:: shell-session

    root@a68be49896f8:/# mysql -u root -p
    Enter password:
    Welcome to the MySQL monitor.  Commands end with ; or \g.
    Your MySQL connection id is 9
    Server version: 8.0.19 MySQL Community Server - GPL

    Copyright (c) 2000, 2020, Oracle and/or its affiliates. All rights reserved.

    Oracle is a registered trademark of Oracle Corporation and/or its
    affiliates. Other names may be trademarks of their respective
    owners.

    Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

    mysql>

``-u``，即用户名，此处是 ``root``；``-p``，表示密码，即一开始我们创建容器时指定的密码。在容器内成功连接数据库后，就可以愉快地进行各种数据操作了。

容器端口映射
------------

如果我们要在实际中应用 *Docker* 技术，仅在容器内操作显然是不够的。试想一下，当我们需要在本机连接容器内的 *MySQL*，又该如何操作呢？有办法将容器的端口映射出来吗？

先看一下我们的 *MySQL* 容器都有哪些端口：

.. code-block:: shell-session

    $ docker ps
    CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                 NAMES
    eff3e64f65bb        mysql:8.0           "docker-entrypoint.s…"   6 minutes ago       Up 6 minutes        3306/tcp, 33060/tcp   first-mysql


可以看到，*MySQL* 容器暴露了两个端口，分别是 ``3306`` 和 ``33060`` ，其中 ``3306`` 用于连接数据库。但遗憾的是，这两个端口目前还无法被外部访问，除非将它们映射出来。

创建容器时，可以指定 ``-p`` 参数，将本地指定端口映射到容器内：

.. code-block:: shell-session

    $ docker run --name first-mysql -e MYSQL_ROOT_PASSWORD=123456 -d -p 3306:3306 mysql:8.0

这个命令在本机开启 ``3306`` 端口，并映射到容器的 ``3306`` 端口。

现在，我们再来看下容器发生了什么变化：

.. code-block:: shell-session

    CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS              PORTS                               NAMES
    e1c17ca83541        mysql:8.0           "docker-entrypoint.s…"   8 seconds ago       Up 6 seconds        0.0.0.0:3306->3306/tcp, 33060/tcp   first-mysql

``PORTS`` 列显示 ``0.0.0.0:3306->3306/tcp``， 这表示本地 ``3306`` 端口映射到容器 ``3306`` 端口。``0.0.0.0`` 代表全网可连接。

下载 *MySQL* 客户端，连接容器内的 *MySQL* 服务器。这里笔者用的是 *Homebrew* 下载的 *mysql-client*。由于本机端口配置了全网可连，所以我们的 ``host`` 设定为 ``127.0.0.1`` 即可，端口指定 ``3306``。执行如下命令连接 *MySQL*：

.. code-block:: shell-session

    $ /usr/local/Cellar/mysql-client/8.0.18/bin/mysql -u root -h 127.0.0.1 -P 3306 -p
    Enter password:
    Welcome to the MySQL monitor.  Commands end with ; or \g.
    Your MySQL connection id is 8
    Server version: 8.0.19 MySQL Community Server - GPL

    Copyright (c) 2000, 2019, Oracle and/or its affiliates. All rights reserved.

    Oracle is a registered trademark of Oracle Corporation and/or its
    affiliates. Other names may be trademarks of their respective
    owners.

    Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

    mysql>

成功连接了！

小结
====

- *Docker* 将软件服务制作成模板，称为 **镜像** ；
- **镜像** 存储在 **镜像库** 中， `Docker Hub`_ 和 `Docker Cloud`_ 是公共镜像库；
- 通过 **镜像** 可快速创建可执行环境，这就是 **容器** ；

附录
====

.. include:: /_fragments/next-step-to-wechat-mp.rst

.. include:: /_fragments/disqus.rst

.. _Docker: https://www.docker.com/
.. _镜像库: https://docker-note.readthedocs.io/zh_CN/latest/quick-start/registries.html
.. _Docker Hub: https://hub.docker.com/
.. _Docker Cloud: https://cloud.docker.com/