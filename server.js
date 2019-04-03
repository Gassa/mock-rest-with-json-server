const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./data/db.json');
const middlewares = jsonServer.defaults();

const port = process.env.PORT || 3000;
const JSON_DB = process.env.JSON_DB || './data/db.json'

// var db = require('./data/db.json');
var db = require(JSON_DB)

server.use(middlewares);

// rewrite router
server.use(jsonServer.rewriter({
    '/api/users': '/users'
}));

// GET method
server.get('/get/user', (req, res) => {
    let userId = req.query['userId'];
    if (userId != null && userId >= 0) {
        let result = db.users.find(user => {
            return user.userId == userId;
        })
        if (result) {
            let {id, ...user} = result;
            res.status(200).jsonp(user);
        } else {
            res.status(400).jsonp({
                error: "Bad userId"
            });
        }
    } else {
    res.status(400).jsonp({
        error: "No valid userId"
    });
    }
});

// POST method
server.use(jsonServer.bodyParser)
server.post('/post/user', (req, res) => {
if (req.method === 'POST') {
    let userId = req.body['userId'];
    if (userId != null && userId >= 0) {
    let result = db.users.find(user => {
        return user.userId == userId;
    })

    console.info('I am here')

    if (result) {
        let {id, ...user} = result;
        res.status(200).jsonp(user);
    } else {
        res.status(400).jsonp({
        error: "Bad userId"
        });
    }
    } else {
    res.status(400).jsonp({
        error: "No valid userId"
    });
    }
}
});

server.use(router);
server.listen(port);
