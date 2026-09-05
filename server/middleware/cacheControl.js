/**
 * Cache-Control response header middleware for JanSeva AI API
 */

const setCacheHeader = (maxAgeSeconds = 300, isPublic = true) => {
  return (req, res, next) => {
    // Only cache GET requests
    if (req.method === 'GET') {
      const scope = isPublic ? 'public' : 'private';
      res.set('Cache-Control', `${scope}, max-age=${maxAgeSeconds}, must-revalidate`);
    } else {
      res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    }
    next();
  };
};

const noCache = (req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  next();
};

module.exports = {
  setCacheHeader,
  noCache
};
