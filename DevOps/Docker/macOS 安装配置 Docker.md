# macOS 安装配置 Docker

## 下载安装

下载安装 Docker Desktop：

* [Docker 官方下载](https://download.docker.com/mac/stable/Docker.dmg)
* [阿里云镜像下载](http://mirrors.aliyun.com/docker-toolbox/mac/docker-for-mac/stable/Docker.dmg)

## 镜像加速器

打开 Docker Desktop 的 `Preferences` 面板，进入 `Daemon` >`Basic` > `Registry mirrors:` ，根据需要添加第三方提供的镜像加速地址：

* [七牛云](https://kirk-enterprise.github.io/hub-docs/#/user-guide/mirror)： `https://reg-mirror.qiniu.com`
* [Azure China](https://github.com/Azure/container-service-for-azure-china/blob/master/aks/README.md#22-container-registry-proxy):  `https://dockerhub.azk8s.cn`
* [DaoCloud](https://www.daocloud.io/mirror): `http://f1361db2.m.daocloud.io`
* [阿里云](https://cr.console.aliyun.com/cn-shanghai/instances/mirrors)：登录阿里云后获取

点击 `Apply & Restart` 按钮，等待 Docker 重启后生效。

检查配置是否生效：

```shell
docker info
```

如包含自己已添加的加速地址即表示已生效：

> Registry Mirrors:
> https://reg-mirror.qiniu.com/
> https://dockerhub.azk8s.cn/
> http://f1361db2.m.daocloud.io/

## 参考文献

* [Install Docker Desktop on Mac](https://docs.docker.com/docker-for-mac/install/)
* [Docker —— 从入门到实践](https://legacy.gitbook.com/book/yeasy/docker_practice/details)

