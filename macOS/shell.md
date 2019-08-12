# shell

[TOC]

## iTerm2

### 安装 iTerm2

[iTerm2 官网](http://www.iterm2.com/index.html) 下载安装。

### 设置 iTerm2

设置 iTerm 2 为默认的终端工具： `iTerm2` > `Make iTerm2 Default Term`。

## Oh-My-Zsh

### 设置 Zsh 为默认 shell

macOS 自带的有 Zsh，确保版本号 `>=4.3.9` ：

```shell
zsh --version
```

查看 Zsh 安装路径：

```shell
which zsh
```

> /bin/zsh

查看当前默认的 shell：

```shell
echo $SHELL
```

> /bin/bash

设置 Zsh 为默认的 shell：

```shell
chsh -s /bin/zsh
```

重启终端工具，并确认当前默认的 shell：

```shell
echo $SHELL
```

> /bin/zsh

> **Tips:** 
>
> 如需设置回 bash 为默认 shell：
>
> ```shell
> chsh -s /bin/bash
> ```

### 安装 Oh-My-Zsh

使用 curl 下载并执行安装脚本：

```shell
sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

### 配置 Oh-My-Zsh

打开配置文件：

```shell
vim ~/.zshrc
```

修改主题名称为自己想要的：

```shell
ZSH_THEME="ys"
```

> **TIps:** [Oh-My-Zsh 预置主题预览](https://github.com/robbyrussell/oh-my-zsh/wiki/Themes) ，

修改需要启用的插件，多个插件空格隔开：

```shell
plugins=(git z)
```

> **Tips:**
>
> [Oh-My-Zsh 插件列表](https://github.com/robbyrussell/oh-my-zsh/wiki/Plugins-Overview)（使用过多插件会明显降低终端打开速度）。
>
> `git` 插件用于增强显示 git 相关信息。
>
> `z` 插件会记录经常访问的路径，并提供模糊匹配，使用方式如下：
>
> ```shell
> # 比如经常访问下面目录
> cd ~/aaa/bbb/ccc/ddd
> 
> # 下次只需要以下命令即可
> z ddd
>```
> 

保存退出，并刷新 Zsh 配置：

```shell
source ~/.zshrc
```

## 参考文献

- [Installing ZSH](https://github.com/robbyrussell/oh-my-zsh/wiki/Installing-ZSH)

