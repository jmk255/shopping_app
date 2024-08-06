const { createProxyMiddleware} = require("http-proxy-middleware");

module.exports = function(app){
  app.use(
    '/product',
    createProxyMiddleware({
      target : 'http://localhost:3090/product',
      changeOrigin : true,
    })
  );
};