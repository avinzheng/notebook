# 阿里云 CentOS 主机常见设置

## 卸载云盾和安骑士

使用官方卸载脚本卸载：

```shell
curl -sSL http://update.aegis.aliyun.com/download/quartz_uninstall.sh | sudo bash
```

删除残留文件：

```shell
sudo rm -rf /usr/local/aegis
sudo rm /usr/sbin/aliyun-service
sudo rm /lib/systemd/system/aliyun.service
```

