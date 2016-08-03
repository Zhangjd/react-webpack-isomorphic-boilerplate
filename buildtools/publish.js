var colors = require('colors');
var FTPS = require('ftps');
var client = require('scp2')
var path = require('path');
var fs = require('fs');
var config = require('./config');

var SSH = require('simple-ssh');

const TARGET = process.env.npm_lifecycle_event;

var ssh = new SSH({
    host: config[TARGET].host,
    user: config[TARGET].user,
    pass: config[TARGET].pass,
    baseDir:config[TARGET].baseDir
});

var ftps = new FTPS({
    host: config[TARGET].host,
    username: config[TARGET].user,
    password: config[TARGET].pass,
    protocol: 'sftp',
    port: 22,
    escape: true,
    retries: 2,
    timeout: 1000,
    requiresPassword: true,
    autoConfirm: true,
    cwd: ''
});

console.log(colors.yellow('正在发布文件到'+config[TARGET].name+' ...'));
client.scp('dist/', config[TARGET].user+':'+config[TARGET].pass+'@'+config[TARGET].host+':'+config[TARGET].baseDir, function(err) {

  if(err){
    console.error(err)
  }
  else {
    console.log('发布成功'.green);
    console.log('正在修改文件权限'.yellow);
    //修改权限
    ssh.exec('chmod -R 777 .',{
      err: function(stderr) {
          console.log(stderr); // this-does-not-exist: command not found
      }
    }).start()
  }
})
