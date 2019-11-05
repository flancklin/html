console.log(333);
const ViewTest = () => import('./src/test.vue');
var routes = [
    {
        path:'/',
        component:{
            template:'<div><h1>我是首页</h1></div>'
        },
    },{
        path:'/about',
        component:{
            template:'<div><h1>我是关于</h1></div>',
        }
    },{
        path:'/param/:age/:number',
        meta:{//自定义数据
            must_login:true
        },
		name:'myparam',
        component:{
            template:`<div><h1>传参一：年龄{{$route.params.age}}，数量{{$route.params.number}}</h1></div>`,
        }
    },{
        path:'/param',
        component:{
            template:`<div><h1>传参二：年龄{{$route.query.age}}，数量{{$route.query.number}}</h1></div>`,
        }
    },{
        path:'/children/:person',
        component:{//注意 在template中用了单引号、双引号、还有`。不然会报错
            template:`<div>
				<h1>子路由：{{$route.params.person}}</h1>
				<router-link to="more" append><h3>更多一（一直点会一直追加/more）</h3></router-link>
				<router-link :to="'/children/'+$route.params.person+'/more'"><h3>更多二</h3></router-link>
				<router-view></router-view></div>`,
        },
		children:[{
        	path:'more',
			component:{
        		template:"<div><h2>子路由{{$route.params.person}}的更多详情</h2></div>"
			}
		}]
    },{
        path:'/test',
        component:ViewTest
    }
];

var router = new VueRouter({routes:routes});
var loginFlag = false;
router.beforeEach(function (to, from, next) {
	//权限验证
	console.log(to.path);
	//可以反过来设置 to.meta.no_need_login==true
	if(loginFlag == false && (to.path=="/about" || to.meta.must_login == true))next("/param?age=00&number=没登录前往登录");else next();

})
new Vue({
	el:'#app',
	router:router,
	methods:{
		surf:function(){
			setTimeout(function(){
				this.router.push({name:'myparam',params:{age:123,number:456}})
			},2000)
		}
	}
});