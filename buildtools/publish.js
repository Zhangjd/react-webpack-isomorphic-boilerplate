var colors = require('colors');
var FTPS = require('ftps');
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

//远程创建文件夹
var fileList = []
function walk(dir){
  var dirList = fs.readdirSync(dir);
  dirList.forEach(function(item){
    if(fs.statSync(dir + path.sep + item).isDirectory()){
      ssh.exec('mkdir -p '+(dir + '/' + item).replace('dist'+path.sep,''), {
          err: function(stderr) {
              console.log(stderr); // this-does-not-exist: command not found
          }
      })
      walk(dir + path.sep + item);
    }else{
      fileList.push(dir + path.sep + item);
    }
  })
}

walk('dist')
ssh.start()

//上传文件
ftps.cd(config[TARGET].baseDir)
fileList.forEach((item)=>{
  const destPath = item.replace('dist'+path.sep,'').replace(new RegExp('\\\\','g'),'/')
  ftps.put(item, destPath)
})
ftps.exec(function (err, res) {
  // err will be null (to respect async convention)
  // res is an hash with { error: stderr || null, data: stdout }
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
