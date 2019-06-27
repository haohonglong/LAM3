const System =LAM3;
const ROOT  = System.SELF;
const Controller = require(System.files[0]['Controller']);
var E = {file_404:System.ERROR_404};
class RoomController extends Controller{
    constructor(init){
        super();
        this.viewpath = System.VIEWS+'/room';
        this.layoutPath = this.layoutPath+'/default';
        this.content = {
            'user':{
                'name':'name',
                'age':28
            }

        };
    }
    listAction(){
        return this.render('list',{
            'VIEWS':System.VIEWS,
            'IMAGE':System.IMAGE,
            'ROOT':ROOT,
            'D':{
                'title':'你好，世界！',
                'content':'This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.'
            }

        },E);
    }
    detailAction(){
        return this.render('detail',{
            'VIEWS':System.VIEWS,
            'IMAGE':System.IMAGE,
            'ROOT':ROOT,
            'D':{
                'title':'你好，世界！',
                'content':'This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.'
            }

        },E);
    }
    releaseAction(){
        return this.render('release',{
            'VIEWS':System.VIEWS,
            'IMAGE':System.IMAGE,
            'ROOT':ROOT,
            'D':{
                'title':'你好，世界！',
                'content':'This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.'
            }

        },E);
    }
}

module.exports = RoomController;
