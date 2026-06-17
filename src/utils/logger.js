// ─── Async Logger (Non-blocking) ──────────────────────────────────────────
const LOG_LEVELS = { ERROR: 0, WARN: 1, INFO: 2, DEBUG: 3 };
const LEVEL = import.meta.env.DEV ? LOG_LEVELS.DEBUG : LOG_LEVELS.WARN;

const log = (lvl, label, msg, data) => {
  if (LEVEL < lvl) return;
  queueMicrotask(() => {
    const methods = [console.error, console.warn, console.info, console.debug];
    methods[lvl]?.(`[ARATAT ${label}]`, msg, data ?? '');
  });
};

const logger = {
  error: (msg, data) => log(0, 'ERROR', msg, data),
  warn:  (msg, data) => log(1, 'WARN',  msg, data),
  info:  (msg, data) => log(2, 'INFO',  msg, data),
  debug: (msg, data) => log(3, 'DEBUG', msg, data),
};

export default logger;
