# 常见 Git 操作

## 创建 Git 仓库

### 在远程仓库初始化

在 Git 仓库托管平台（Github、Gitee 等）创建 Git 仓库，并使用 README 初始化，此时远程仓库拥有 master 分支，有提交记录。

克隆远程仓库到本地：

```shell
git clone <repository> [<directory>]
```

> **Tips:** 
>
> `<repository>` 为远程仓库 HTTPS 或 SSH 格式地址。只有配置了远程仓库托管平台的 SSH key 才能使用 SSH 格式地址。
>
> `<directory>` 为需要新建的项目目录或者已有的空白项目目录。默认使用远程仓库名称在当前目录创建项目目录。

克隆到本地时，会将远程仓库标记为 origin，并自动创建和 origin/master 有追踪关系的本地 master 分支。

### 在本地仓库初始化

在 Git 仓库托管平台（Github、Gitee 等）创建 Git 仓库（不初始化），此时远程仓库空白，无任何分支，无任何提交记录。

进入本地已经初始化过的 Git 仓库（本地 Git 仓库已有 master 分支，有提交记录），添加远程仓库，并标记为 origin：

```shell
git remote add origin <repository>
```

将本地 master 分支推送到 origin，并建立和 origin/master 的追踪关系：

```shell
git push -u origin master:master
```

### 合并两个已初始化过的仓库

在 Git 仓库托管平台（Github、Gitee 等）创建 Git 仓库，并使用 README 初始化，此时远程仓库拥有 master 分支，有提交记录。

进入本地已经初始化过的 Git 仓库（本地 Git 仓库已有 master 分支，有提交记录），添加远程仓库，并标记为 origin：

```shell
git remote add origin <repository>
```

拉取并合并 origin/master 分支到本地 master 分支：

```shell
git pull origin master:master --allow-unrelated-histories
```

自动进入 commit 编辑器，可输入提交信息，按 `:` ，输入 `q` 退出编辑。

将本地 master 分支推送到 origin，并建立和 origin/master 的追踪关系：

```shell
git push -u origin master:master
```

