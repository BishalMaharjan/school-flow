const logger = {
  info: (...args) => console.log("[INFO]", ...args), // eslint-disable-line no-console
  warn: (...args) => console.warn("[WARN]", ...args), // eslint-disable-line no-console
  error: (...args) => console.error("[ERROR]", ...args), // eslint-disable-line no-console
};

module.exports = logger;
