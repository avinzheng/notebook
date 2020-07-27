# 使用 Ionic & Cordova 构建 Android 应用

## 密钥库和密钥

### 创建密钥库和密钥

创建 PKCS12 格式密钥库，并新建一个密钥：

```shell
keytool -v -genkeypair -keystore <keystore>.keystore -storetype pkcs12 -alias <alias> -keyalg RSA -keysize 2048 -validity 36500
```

> **Tips:** `<keystore>` 为密钥库名称，`<alias>` 为密钥的别名，有效期 36500 天。

输入两次密钥库密码，再输入证书信息，最后输入 `Y` 确认证书信息完成创建。

由于 JDK 8 的 keytool 工具 bug，在 PKCS12 格式密钥库新建密钥时无法同时创建密码，需要手动给新建的密钥设置密码：

```shell
keytool -v -keystore <keystore>.keystore -alias <alias> -keypasswd
```

### 管理密钥库和密钥

查看密钥库信息：

```shell
keytool -v -list -keystore <keystore>.keystore
```

查看密钥库里指定的密钥信息：

```shell
keytool -v -list -keystore <keystore>.keystore -alias <alias>
```

密钥库新增密钥：

```shell
keytool -v -genkeypair -keystore <keystore>.keystore -alias <alias> -keyalg RSA -keysize 2048 -validity 36500
```

删除密钥库里指定密钥：

```shell
keytool -v -delete -keystore <keystore>.keystore -alias <alias>
```

修改密钥库密码：

```shell
keytool -v -keystore <keystore>.keystore -storepasswd
```

修改密钥库指定密钥密码：

```shell
keytool -v -keystore <keystore>.keystore -alias <alias> -keypasswd
```

修改密钥库指定密钥别名：

```shell
keytool -v -keystore <keystore>.keystore -alias <alias> -changealias
```

## Android 平台配置

### Cordova 项目配置

打开 Cordova 配置文件 `config.xml` 。

**widget**

* `id` 应用 ID，一般用倒序写的域名，如 `io.ionic.app` 。
* `version` 应用 Version，采用 `<major>.<minor>.<patch>` 格式的[语义化版本号](https://semver.org/lang/zh-CN/)。

**widget.name**

应用的正式名称，会显示在应用商店以及安装后的设备屏幕上。

**widget.description**

应用描述，会显示在应用商店。

**widget.author**

应用作者姓名，会显示在应用商店。

* `email` 作者邮箱地址，会显示在应用商店。
* `href` 应用官网，会显示在应用商店。

### 生成 Android 项目

使用 Cordova 平台生成 Android 项目：

```shell
ionic cordova platform add android
```

生成 Android 项目时，会安装插件，由于 [Cordova 强制使用 npm 安装插件](https://github.com/apache/cordova-cli/pull/292)，可能会导致依赖安装出错，需要手动重新 使用 Yarn 安装一次依赖：

```shell
# 删除 npm 包锁定文件
rm -rf package-lock.json

# 使用 Yarn 重新安装依赖
yarn --ignore-optional
```

## 构建 Android 应用

### 构建测试版

构建 Android debug 应用：

```shell
ionic cordova build android --prod --debug
```

> **Tips:** 构建 debug 应用会默认使用 `~/.android/debug.keystore` 签名应用。

### 构建发行版

构建 Android release 应用：

```shell
ionic cordova build android --prod --release
```

使用 `zipalign` 对 APK 文件归档对齐：

```shell
zipalign -v 4 platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk app-release.apk
```

使用 `apksigner` 给应用签名：

```shell
apksigner sign --ks <keystore>.keystore --ks-key-alias <alias> app-release.apk
```

验证签名并显示证书信息：

```shell
apksigner verify -v --print-certs app-release.apk
```

## 参考文献

* [keytool](https://docs.oracle.com/javase/8/docs/technotes/tools/windows/keytool.html)
* [How to create a certificate into a PKCS12 keystore with keytool?](https://stackoverflow.com/questions/14375185/how-to-create-a-certificate-into-a-pkcs12-keystore-with-keytool/43603501#43603501)
* [Config.xml](https://cordova.apache.org/docs/en/latest/config_ref/index.html)
* [Android Play Store](https://ionicframework.com/docs/publishing/play-store)
* [为您的应用签名](https://developer.android.google.cn/studio/publish/app-signing.html)
* [apksigner](https://developer.android.google.cn/studio/command-line/apksigner)

