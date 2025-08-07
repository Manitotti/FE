module.exports = function override(config, env) {
  config.resolve.fallback = {
    http: false,
    https: false,
    stream: false,
    zlib: false,
  };
  return config;
};
