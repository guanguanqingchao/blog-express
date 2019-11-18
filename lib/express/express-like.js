const http = require('http');


class LikeExpress {
    constructor() {
        //存放中间件列表
        this.routes = {
            all: [], //app.use注册的中间件
            get: [], //app.get
            post: [], //app.post
        }
    }

    //返回注册的路由、中间件等信息
    register(path) {
        let info = {}
        if (typeof path === 'string') {
            info.path = path;
            info.stack = [...arguments].slice(1)
        } else {
            info.path = '/';
            info.stack = [...arguments].slice(0)
        }
        return info;
    }

    use() {
        const info = this.register.apply(this, arguments)
        this.routes.all.push(info)
    }

    get() {
        const info = this.register.apply(this, arguments)
        this.routes.get.push(info)

    }

    post() {
        const info = this.register.apply(this, arguments)
        this.routes.post.push(info)

    }

    //获取匹配路径的中间件
    match(url, method) {
        let stack = [];
        if (url === '/favicon.icon') {
            return stack
        }

        let curRoute = [];
        curRoute = curRoute.concat(this.routes.all)
        curRoute = curRoute.concat(this.routes[method])

        curRoute.forEach(route => {
            // url === /api/get-cookie      path === '/'
            // url === /api/get-cookie      path === '/api'
            // url === /api/get-cookie      path === /api/get-cookie 
            if (url.indexOf(route.path) === 0) {
                stack = stack.concat(route.stack)
            }
        })
        return stack
    }

    //核心next机制
    handle(req, res, stack) {

        //依次执行stack中的中间件
        const next = () => {
            const middleware = stack.shift();
            if (middleware) {
                middleware(req, res, next)
            }
        }
        next()
    }

    callback() {
        return (req, res) => {

            res.json = (data) => {
                res.setHeader('Content-type', 'application/json')
                res.end(JSON.stringify(data))
            }

            const url = req.url;
            const method = req.method.toLowerCase();
            const resList = this.match(url, method)

            this.handle(req, res, resList)
        }
    }

    listen(...args) {
        const server = http.createServer(this.callback())
        server.listen(...args)
    }
}

//工厂函数
module.exports = () => {
    return new LikeExpress()
}