# macOS 安装配置 Ionic

## 准备工作

### 环境依赖

* Node.js & Yarn
* Android Environment
* iOS Environment

### Node.js 环境

**Node.js**

安装最新版本的 Node.js LTS。

检查 Node.js 版本：

```shell
node -v
```

> v10.17.0

**Yarn**

安装最新版本的 Yarn。

检查 Yarn 版本：

```shell
yarn -v
```

> 1.19.1

### Android 环境

**JDK 8**

下载安装 [Java SE Development Kit 8](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) 。

检查 Java 版本：

```shell
java -version
```

> java version "1.8.0_231"
> Java(TM) SE Runtime Environment (build 1.8.0_231-b11)
> Java HotSpot(TM) 64-Bit Server VM (build 25.231-b11, mixed mode)

添加环境变量到当前用户 shell 配置文件：

```shell
# JAVA_HOME
echo 'export JAVA_HOME="$(/usr/libexec/java_home -v 1.8)"' >> ~/.zshrc
echo 'export PATH="$JAVA_HOME/bin:$PATH"' >> ~/.zshrc

# CLASS_PATH
echo 'export CLASS_PATH="$JAVA_HOME/lib"' >> ~/.zshrc

# 重新执行配置文件
source ~/.zshrc
```

> **Tips:** 如使用的是 bash（macOS 默认的 shell），则配置文件为 `~/.bash_profile` 。

查看环境变量：

```shell
echo $JAVA_HOME && echo $CLASS_PATH
```

> /Library/Java/JavaVirtualMachines/jdk1.8.0_231.jdk/Contents/Home
> /Library/Java/JavaVirtualMachines/jdk1.8.0_231.jdk/Contents/Home/lib

**Gradle**

使用 Homebrew 安装 Gradle：

```shell
brew cleanup && brew update && brew install gradle
```

检查 Gradle 版本：

```shell
gradle -v
```

> Welcome to Gradle 6.0.1!
>
> ......

**Android Studio**

下载安装 [Android Studio](https://developer.android.google.cn/studio#downloads) 。

启动 Android Studio，报错提示：

> unable to access android sdk add-on list

点击 `Cancel` ，进入到 `SDK Components Setup` 界面，默认的 `Android SDK Location` 为 Android SDK 存放目录，不建议修改。

下载默认勾选的最新版本 Android SDK，完成后在 `Welcome to Android Studio` 界面点击 `Configure > SDK Manager` 打开 Android SDK 管理界面。

下载 [Cordova 支持的最高版本的 API Level](https://cordova.apache.org/docs/en/latest/guide/platforms/android/index.html#requirements-and-support) （这里是 28），关闭 Android Studio。

添加环境变量到当前用户 shell 配置文件：

```shell
# Android SDK Location
echo 'export ANDROID_SDK_ROOT="$HOME/Library/Android/sdk"' >> ~/.zshrc

# avdmanager, sdkmanager
echo 'export PATH="$PATH:$ANDROID_SDK_ROOT/tools/bin"' >> ~/.zshrc

# adb, logcat
echo 'export PATH="$PATH:$ANDROID_SDK_ROOT/platform-tools"' >> ~/.zshrc

# emulator
echo 'export PATH="$PATH:$ANDROID_SDK_ROOT/emulator"' >> ~/.zshrc

# 重新执行配置文件
source ~/.zshrc
```

查看打包工具目录：

```shell
ls $ANDROID_SDK_ROOT/build-tools
```

> 29.0.2

该目录下的 `zipalign` 为优化应用体积的工具，需要将其路径添加到环境变量 `PATH` 中：

```shell
# zipalign
echo 'export PATH="$PATH:$ANDROID_SDK_ROOT/build-tools/29.0.2"' >> ~/.zshrc

# 重新执行配置文件
source ~/.zshrc
```

查看环境变量：

```shell
echo $ANDROID_SDK_ROOT
```

> /Users/avinc/Library/Android/sdk

**Android 模拟器**

启动 Android Studio，点击 `Configure > AVD Manager` 打开 Android 模拟器管理界面。

创建 Android 模拟器，在镜像选择界面，下载上面安装的 Cordova 支持的最高版本的 API（这里是 28）对应的镜像。

下载完成后选择该镜像并完成创建，关闭 Android Studio。

### iOS 环境

**Xcode**

从 App Store 安装 [Xcode](https://apps.apple.com/cn/app/xcode/id497799835?mt=12) ，打开 Xcode，提示 `Install Additional required components?  ` ，点击 `Install` 完成安装。

确保 Xcode CLT 工具已安装：

```shell
xcode-select --install
```

> xcode-select: error: command line tools are already installed, use "Software Update" to install updates

打开 Xcode，在导航栏依次点击 `Xcode` > `Preferences` > `Accounts` 添加自己的 Apple ID。

**iOS 模拟器**

打开 Xcode，在导航栏依次点击 `Window` > `Devices and Simulators` > `Simulators` 进入 iOS 模拟器管理界面，可删除所有不需要的模拟器，只保留一个需要的即可。

## 安装 Ionic

### 安装 Ionic

使用 Yarn 全局安装 Ionic：

```shell
yarn global add ionic --registry=https://registry.npm.taobao.org
```

检查 Ionic 版本：

```shell
ionic -v
```

> 5.4.13

### 安装 Cordova

使用 Yarn 全局安装 Cordova：

```shell
yarn global add cordova --registry=https://registry.npm.taobao.org
```

检查 Cordova 版本：

```shell
cordova -v
```

> 9.0.0 (cordova-lib@9.0.1)

## 构建测试

### 创建 Ionic 应用

创建一个名为 ionic-demo 的示例应用，跳过依赖安装：

```shell
ionic start ionic-demo my-first-app --cordova --type=angular --no-deps
```

进入 ionic-demo 应用目录，使用 Yarn 安装依赖：

```shell
yarn --ignore-optional --registry=https://registry.npm.taobao.org
```

### 构建 Android 应用

生成 Cordova 平台 Android 资源文件：

```shell
ionic cordova platform add android
```

打包 debug 应用：

```shell
ionic cordova build android --prod --debug
```

生成的应用路径为 `platforms/android/app/build/outputs/apk/debug/app-debug.apk` ，打开之前创建的 Android 模拟器（第一次打开后关闭 WiFi），将应用拖入其中即完成安装。

### 构建 iOS 应用

构建 iOS 应用需要付费加入 [Apple Developer Program](https://developer.apple.com/programs/)，否则只能在模拟器中运行。

生成 Cordova 平台 iOS 资源文件：

```shell
ionic cordova platform add ios
```

复制 iOS 资源文件到 Cordova 平台目录：

```shell
ionic cordova prepare ios --prod
```

打开 Xcode，在导航栏依次点击 `Xcode` > `File` > `Open` ，选择项目目录下的 `platforms/ios` 目录打开，点击 Xcode 标题栏左边的三角按钮，即可在模拟器中运行应用。

## 参考文献

* [Ionic Framework](https://ionicframework.com/docs/)
* [Where is JAVA_HOME on macOS Mojave (10.14) to Lion (10.7)?](https://stackoverflow.com/questions/6588390/where-is-java-home-on-macos-mojave-10-14-to-lion-10-7)
* [How to solve npm install throwing fsevents warning on non-MAC OS?](https://stackoverflow.com/questions/46929196/how-to-solve-npm-install-throwing-fsevents-warning-on-non-mac-os/59348956#59348956)

