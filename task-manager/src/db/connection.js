const protocol = 'mongodb://';
const host = '127.0.0.1';
const port = '27017';
const database = 'task-manager-api';
const connectionUrl = `${protocol}${host}:${port}/${database}`;

module.exports = {
    protocol, host, port, database, connectionUrl
}