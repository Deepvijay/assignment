const app = require('./app');
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const PORT = process.env.PORT | 8000;

if (cluster.isMaster) {
    console.log("this is master process ", process.pid);
    for (var i = 0; i < numCPUs; i++) {
        cluster.fork()
    }
    cluster.on('exit', worker => {
        console.log('worker process has died', process.pid);
        console.log(`only ${Object.keys(cluster.workers).length}remeininig`);
        console.log("starting new worker");
        cluster.fork()
    })
}else {
    app.listen(PORT, () => {
        console.log(`server started at http://localhost:${PORT}`)
    }).on('error', (e) => {
        console.log(e.message)
    })
}