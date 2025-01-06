const { createProxyMiddleware } = require('http-proxy-middleware');
const { initialApps } = require('./App');

module.exports = function(app) {
  initialApps.forEach(appConfig => {
    const target = appConfig.url;

    app.use(
      createProxyMiddleware(`/api/${appConfig.name}`, {
        target: target,
        changeOrigin: true,
      })
    );
  });
};