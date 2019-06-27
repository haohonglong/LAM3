const System =(typeof LAM3 !== 'undefined') ? LAM3 : require('./System');
const Component = require('./Component.class');
class Module extends Component{
    constructor(){
        super();
    }
}
module.exports = Module;


