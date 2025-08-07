const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = (app) => {
  app.use(
    "/pods",
    createProxyMiddleware({
      target: "https://mini2team.lion.it.kr",
      changeOrigin: true,
    })
  );
};
