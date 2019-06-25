const path = require('path');
const ROOT = path.dirname(path.dirname(__filename));
const Config = require(ROOT+'/brandhall/common/config/config')(ROOT);
const Base = require(ROOT+'/lamborghiniJS/base/Base.class');
const System = require(ROOT+'/lamborghiniJS/base/System');
System.bootstrap(Config,Base);
