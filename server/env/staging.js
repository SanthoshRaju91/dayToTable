/**
* Staging enviroment configuration settings
*/

module.exports = {
  config: {
    host: '127.0.0.1',
    port: '9000',
    database: 'staging',
    user: 'user',
    password: 'user',
    charset: 'utf8'
  },
  mongodb: {
    url: 'mongodb://localhost:27017/staging'
  },
  session: 'veryverysecret'
}
