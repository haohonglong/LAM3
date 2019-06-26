const path = require('path');
const ROOT = path.dirname(path.dirname(__filename));
const Config = require(ROOT+'/brandhall/common/config/config')(ROOT);
const System = require(Config.autoLoadFile()['System']);

System.bootstrap(Config);
// require('./a')(System);
// process.exit();
const http = require('http');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 8000;
const server = http.createServer((req, res) => {
    const Router = require(System.files[0]['Router'])(System,req,res);
    var content = Router.run(System.routeName,System.moduleID);

    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    if(System.isString(content)){
        res.end(content);
    }else{
        res.end('Hello World\n');
    }


});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
