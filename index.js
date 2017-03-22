const
  path = require('path'),
  exec = require('child_process').exec,
  colors = require('colors');

const config = require('./config/config.json');

/**
 * clone对应模板项目
 * @param type build tools type
 */
function gitClone(type) {
  exec(`git clone ${config.gitRepo[type]} ${process.cwd()}`,  cloneFinished)
}

/**
 * clone完毕移除本地的.git目录
 */
function cloneFinished(err, stdout, stderr) {
  if (err) {
    throw colors.red(err.message);
  }

  // print Cloning git repo
  console.log(colors.yellow(stderr));

  exec(`rm -rf ${path.resolve(process.cwd(), './.git')}`, function () {
    console.log(colors.green('Template project clone finished'));
  })
}

function installDependencies() {
  exec('yarn install')
}

function run() {
  gitClone('webpack');
}

run();