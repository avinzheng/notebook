# npm & Yarn 常见错误处理

## 依赖安装错误

### 缺少 Xcode CLT

**错误信息**

macOS Catalina 上安装含有 `node-gyp` 依赖的软件可能出现以下错误信息：

> gyp: No Xcode or CLT version detected!

手动安装 Xcode CLT 工具：

```shell
xcode-select --install
```

提示 Xcode CLT 已经安装：

> xcode-select: error: command line tools are already installed, use "Software Update" to install updates

**解决办法**

先删除已经安装的 Xcode CLT，再重新安装：

```shell
sudo rm -rf $(xcode-select -print-path)
xcode-select --install
```

**参考文献**

* [npm install fails on node-gyp rebuild with "gyp: No Xcode or CLT version detected!"](https://stackoverflow.com/questions/60573595/npm-install-fails-on-node-gyp-rebuild-with-gyp-no-xcode-or-clt-version-detec)

