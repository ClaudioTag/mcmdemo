var proxy = require('express-http-proxy');
var app = require('express')();

const targetAddress = 'https://184.172.241.11/';

app.use('/proxy', proxy(targetAddress, {
    proxyReqOptDecorator: function(proxyReqOpts, originalReq) {
      proxyReqOpts.rejectUnauthorized = false
      console.log('proxy call');
      return proxyReqOpts;
    }
}
));

module.exports = app.listen(2345);