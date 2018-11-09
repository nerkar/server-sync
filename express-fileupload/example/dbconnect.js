// sqlcmd -S kazaweb.database.windows.net -d TestingDB -U kazaadmin -P P@ssw0rd -I
var chokidar = require('chokidar');

const sql = require('mssql')
const config = {
    user: 'kazaadmin',
    password: 'P@ssw0rd',
    acquireTimeout: 1000000,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    server: 'kazaweb.database.windows.net', // You can use 'localhost\\instance' to connect to named instance
    database: 'TestingDB',


    options: {
        encrypt: true // Use this if you're on Windows Azure
    }
}


chokidar.watch('.\/uploads', { persistant: true, ignoreInitial: true }).on('all', (accessMode, path) => {
    console.log(accessMode, path);


    sql.close()

    var fileName = path;
    var filePath = 'uploads/' + path;
    var fileURL = 'http://localhost:3000/' + path;
    insertData(fileName);

});






function insertData(fileName) {
    sql.connect(config).then(pool => {
        // Query

        return pool.request()
            //    .query(`select  * from fileinfo`)
            .input('filename', sql.Text, fileName)
            .query(`insert into fileinfo(filename) values(@filename)`)
    }).then(result => {
        console.dir(result)

        // Stored procedure

    }).catch(err => {
        // ... error checks
        console.log(err);
    })
}

sql.on('error', err => {
    // ... error handler
})
