const
  path = require('path'),
  child_process = require('child_process'),
  colors = require('colors'),
  Promise = require('bluebird');

const config = require('./config/config.json');

/**
 * Callback style => Promise
 * @returns {*}
 */
const exec = Promise.promisify(child_process.exec);

console.log(process.cwd());
/**
 * clone对应模板项目
 * @param type build tools type
 */
function gitClone(type) {
  return exec(`git clone ${config.gitRepo[type]} ${process.cwd()}`)
}

/**
 * clone完毕移除本地的.git目录
 */
function cloneFinished() {
  // print Cloning git repo
  console.log(colors.yellow('Cloning Template Repo...'));

  return exec(`rm -rf ${path.resolve(process.cwd(), './.git')}`);
}

function installDependencies() {
  exec('yarn install')
}

function run() {
  gitClone('webpack')
    .then(cloneFinished)
    .catch(err => {
      throw colors.red(err.message);
    })
    .then(() => console.log(colors.green('Template project clone finished')))
    .catch(err => {
      throw colors.red(err.message);
    });
}

run();