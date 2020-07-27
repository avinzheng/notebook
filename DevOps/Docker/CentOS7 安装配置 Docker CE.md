# CentOS7 安装配置 Docker CE

## 安装 Docker CE

使用 yum 安装依赖软件：

```shell
sudo yum -y install yum-utils device-mapper-persistent-data lvm2
```

添加 yum 软件源：

```shell
# 使用官方源
sudo yum-config-manager \
  --add-repo \
  https://download.docker.com/linux/centos/docker-ce.repo

# 使用中科大镜像源
sudo yum-config-manager \
  --add-repo \
  https://mirrors.ustc.edu.cn/docker-ce/linux/centos/docker-ce.repo

# 使用阿里云镜像源
sudo yum-config-manager \
  --add-repo \
  http://mirrors.aliyun.com/docker-ce/linux/centos/docker-ce.repo
```

重建 yum 缓存：

```shell
sudo yum makecache fast
```

安装 Docker CE：

```shell
sudo yum -y install docker-ce docker-ce-cli containerd.io
```

## 启动 Docker CE

设置开机启动：

```shell
sudo systemctl enable docker
```

启动 Docker CE：

```shell
sudo systemctl start docker
```

## 设置用户组

如果使用非 root 用户运行 Docker CE，需要将该用户加入 `docker` 用户组。

创建 `docker` 用户组：

```shell
sudo groupadd docker
```

添加当前用户到 `docker` 用户组：

```shell
sudo usermod -aG docker $USER
```

## 运行测试

退出当前终端工具，重新登录，并运行 `hello-world` ：

```shell
docker run hello-world
```

> Hello from Docker!
> This message shows that your installation appears to be working correctly.
>
> ......

查看所有的 container：

```shell
docker ps -a
```

> CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS                      PORTS               NAMES
> b897fbbdeccd        hello-world         "/hello"            5 minutes ago       Exited (0) 5 minutes ago                        loving_bassi

删除运行测试生成的 container：

```shell
docker rm b897fbbdeccd
```

> **Tips:** `b897fbbdeccd` 为上面查看到的 `CONTAINER ID ` 。

删除运行测试使用的 image：

```shell
docker rmi hello-world
```

## 镜像加速器

如果是在国内主机使用 Docker，可根据需要添加第三方提供的镜像加速地址：

- [七牛云](https://kirk-enterprise.github.io/hub-docs/#/user-guide/mirror)： `https://reg-mirror.qiniu.com`
- [Azure China](https://github.com/Azure/container-service-for-azure-china/blob/master/aks/README.md#22-container-registry-proxy):  `https://dockerhub.azk8s.cn`
- [DaoCloud](https://www.daocloud.io/mirror): `http://f1361db2.m.daocloud.io`
- [阿里云](https://cr.console.aliyun.com/cn-shanghai/instances/mirrors)：登录阿里云后获取

修改（新建）配置文件：

```shell
sudo vim /etc/docker/daemon.json
```

按照 JSON 格式，插入以下配置：

```json
{
  "registry-mirrors": [
    "https://reg-mirror.qiniu.com",
    "https://dockerhub.azk8s.cn",
    "http://f1361db2.m.daocloud.io"
  ]
}
```

保存退出，并重启 Docker CE：

```shell
sudo systemctl daemon-reload
sudo systemctl restart docker
```

## 参考文献

* [Get Docker Engine - Community for CentOS](https://docs.docker.com/install/linux/docker-ce/centos/)
* [Docker —— 从入门到实践](https://legacy.gitbook.com/book/yeasy/docker_practice/details)

