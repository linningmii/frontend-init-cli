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
function removeGitDir() {
  return exec(`rm -rf ${path.resolve(process.cwd(), './.git')}`);
}

function installDependencies() {
  return exec('yarn install');
}

async function run() {
  console.log(colors.yellow('Cloning Template Repo...'));

  await gitClone('webpack')
    .then()
    .catch(err => {
      throw colors.red(err.message);
    });

  await removeGitDir()
    .then(() => console.log(colors.green('Template project clone finished')))
    .catch(err => {
      throw colors.red(err.message);
    });

  console.log(colors.yellow('Installing dependencies...'));

  installDependencies()
    .then(() => console.log(colors.green('Dependencies installed')));
}

run();