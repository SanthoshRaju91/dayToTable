/**
* Development environment configuration
*/

module.exports = {
  config: {
    host: '127.0.0.1',
    port: '3000',
    database: 'dev',
    user: 'user',
    password: 'user',
    charset: 'utf8'
  },
  adminEmail: 'admin@daytable.com',
  smptConfig: {
    host: 'secure166.inmotionhosting.com',
    port: 465,
    secure: true,
    auth: {
      user: 'admin@daytable.com',
      password: ''
    }
  },
  loggerFileLocation: 'logs/app.log',
  mongodb: {
    //url: 'mongodb://root:root@ds013216.mlab.com:13216/daytotable'
    url: 'mongodb://104.131.49.30:27017/daytotable'
  },
  session: 'veryverysecret',
  mail: {
    register: {
      subject: 'Registeration Successfull',
      body: '<h1>Thank you for registering</h1>'
    },
    resetPassword: {
      subject: 'Password has been reset',
      body: '<h1>Your password has been reset Successfully'
    }
  }
};
