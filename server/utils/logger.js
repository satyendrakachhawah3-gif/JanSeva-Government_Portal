const fs = require('fs');
const path = require('path');

const logDirectory = path.join(__dirname, '../logs');
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory, { recursive: true });
}

const getTimestamp = () => new Date().toISOString();

const log = (level, message, meta = {}) => {
  const logEntry = {
    timestamp: getTimestamp(),
    level: level.toUpperCase(),
    message,
    ...(Object.keys(meta).length > 0 && { meta })
  };

  const formattedLog = `[${logEntry.timestamp}] [${logEntry.level}] ${message} ${Object.keys(meta).length ? JSON.stringify(meta) : ''}\n`;
  
  // Log to console
  if (level === 'error') {
    console.error(formattedLog.trim());
  } else if (level === 'warn') {
    console.warn(formattedLog.trim());
  } else {
    console.log(formattedLog.trim());
  }

  // Append to log file
  const logFile = path.join(logDirectory, `${level}.log`);
  fs.appendFile(logFile, formattedLog, (err) => {
    if (err) console.error('Failed to write to log file:', err);
  });
};

module.exports = {
  info: (msg, meta) => log('info', msg, meta),
  warn: (msg, meta) => log('warn', msg, meta),
  error: (msg, meta) => log('error', msg, meta),
  debug: (msg, meta) => log('debug', msg, meta)
};
