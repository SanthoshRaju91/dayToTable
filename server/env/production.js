/**
* Production enviroment configuration settings
*/

module.exports = {
  config: {
    host: '127.0.0.1',
    port: '8080',
    database: 'prod',
    user: 'user',
    password: 'user',
    charset: 'utf8'
  },
  mongodb: {
    url: 'mongodb://localhost:27017/prod'
  },
  session: 'veryverysecret'
}
