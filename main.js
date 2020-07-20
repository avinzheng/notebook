/** ----------------------------------------------------------------------------
 * @author  Avin Cheng
 * @desc    Generate README.md
 ** --------------------------------------------------------------------------*/
/**
 * @typedef {{name: string, type: 'file', dirs: string[],  path: string}} File
 * @typedef {{name: string, type: 'directory', depth: number, children: (File|Dir)}} Dir
 */
'use strict';

const fs = require('fs');
const path = require('path');

/** @link https://github.com/isaacs/node-glob */
const glob = require('glob');

/**
 * Configuration
 */
const config = {
  // 目录白名单
  dirs: [
    'Web',
    'Mobile',
    'Server',
    'Linux',
    'Cross-Platform',
    'DevOps',
    'Network',
    'Development Environment',
    'Data Structure & Algorithm'
  ],

  // 文件扩展名白名单
  extnames: ['.md'],

  // glob options 忽略项
  ignores: ['_*', '.*', '**/*/_*', '**/*/.*', 'node_modules/**/*'],

  // 生成的文件名
  readmeFile: 'README.md'
};

/**
 * 指定单个目录和单个文件扩展名匹配 glob
 * @param {string} dir
 * @param {string} extname
 * @returns {Promise<string[]>}
 */
function getFiles(dir, extname) {
  const pattern = '**/*' + extname;
  const options = {
    cwd: dir,
    ignore: config.ignores,
    nodir: true,
    nosort: true
  };

  return new Promise((resolve, reject) => {
    glob(pattern, options, (err, matches) => {
      err && reject(err);
      resolve(matches.map(file => path.join(dir, file)));
    });
  });
}

/**
 * 单一目录多个文件扩展名匹配 glob
 * @param {string} dir
 * @returns {Promise<string[]>}
 */
function getFilesByDir(dir) {
  const arr = Promise.all(
    config.extnames.map(extname => getFiles(dir, extname))
  );
  return arr.then(arr => [].concat(...arr));
}

/**
 * 多个目录多个文件扩展名匹配 glob
 * @param {string[]} dirs
 * @returns {Promise<string[]>}
 */
function getFilesByDirs(dirs) {
  const arr = Promise.all(dirs.map(dir => getFilesByDir(dir)));
  return arr.then(arr => [].concat(...arr));
}

/**
 * 文件路径格式化成文件描述对象
 * @param {string} filePath
 * @returns {File}
 */
function formatFile(filePath) {
  return {
    name: path.basename(filePath, path.extname(filePath)),
    type: 'file',
    dirs: filePath.split('/'),
    path: encodeURI(filePath)
  };
}

/**
 * 生成文件描述对象树
 * @param {string[]} dirs
 * @returns {Promise<(File|Dir)[]>}
 */
function genFileTree(dirs) {
  const fileTree = [];

  /**
   * 根据目录名称查找一个数组中指定目录对象的索引
   * @param {string} name
   * @param {Dir[]} arr
   * @returns {number}
   */
  function dirIndexOfArr(name, arr) {
    if (arr.length === 0) {
      return -1;
    }

    for (let i = 0, l = arr.length; i < l; i++) {
      if (arr[i].name === name && arr[i].type === 'directory') {
        return i;
      }
    }

    return -1;
  }

  /**
   * 将文件描述对象插入到其目录描述对象的 "children" 属性中
   * @param {File} file
   * @param {(File|Dir)[]} children
   * @param {number} depth
   */
  function addFileInDirChildren(file, children, depth) {
    if (!file.dirs || file.dirs.length === 0) {
      throw new Error('Invalid file!');
    }

    if (file.dirs.length === depth) {
      children.push(file);
      return;
    }

    const index = dirIndexOfArr(file.dirs[depth - 1], children);

    if (index === -1) {
      children.push({
        name: file.dirs[depth - 1],
        type: 'directory',
        depth: depth,
        children: []
      });
    }

    addFileInDirChildren(
      file,
      children[children.length - 1].children,
      depth + 1
    );
  }

  return getFilesByDirs(dirs)
    .then(files => {
      files.forEach(file =>
        addFileInDirChildren(formatFile(file), fileTree, 1)
      );
      return fileTree;
    })
    .catch(err => console.error(err));
}

/**
 * 生成文档内容
 * @param {(File|Dir)[]} filesTree
 * @returns {string}
 */
function genReadMeContent(filesTree) {
  const start =
    '# Notebook\n\n已同步到 [GitBook](https://avincheng.gitbook.io/notebook/) 。\n';
  let toc = '';
  const end = '\n';

  /**
   * 根据文件描述对象树的节点生成对应文档
   * @param {(File|Dir)} node
   * @returns {string}
   */
  function stringify(node) {
    switch (node.type) {
      case 'directory':
        return `\n${'#'.repeat(node.depth + 1)} ${node.name}\n\n`;
      case 'file':
        return `* [${node.name}](${node.path})\n`;
    }
  }

  /**
   * 指定目录递归生成 TOC
   * @param {(File|Dir)[]} arr
   */
  (function genToc(arr) {
    arr.forEach(node => {
      toc += stringify(node);
      node.type === 'directory' &&
        node.children.length > 0 &&
        genToc(node.children);
    });
  })(filesTree);

  /**
   * 格式化 TOC 文本
   */
  (function formatToc() {
    toc = toc.replace(/\n\n\n/g, '\n\n');
  })();

  return start + toc + end;
}

/**
 * 生成 README.md
 * @param content
 * @returns {Promise<boolean>}
 */
function genReadmeFile(content) {
  return new Promise((resolve, reject) => {
    fs.writeFile(config.readmeFile, content, err => {
      err && reject(err);
      resolve(true);
    });
  });
}

/**
 * Workflow
 * @returns {Promise<boolean>}
 */
async function defaultTask() {
  console.time('done');
  const filesTree = await genFileTree(config.dirs);
  const content = genReadMeContent(filesTree);
  return genReadmeFile(content);
}

/**
 * Start
 */
defaultTask()
  .then(
    status => status && console.timeEnd('done'),
    reason => console.error(reason)
  )
  .catch(err => console.error(err));
