/**
 * Client Telemetry & Page Analytics Helper
 */

export const trackPageView = (pathName) => {
  if (process.env.NODE_ENV === 'production') {
    console.log(`[JanSeva Analytics] PageView: ${pathName} at ${new Date().toISOString()}`);
  }
};

export const trackSchemeView = (schemeId, schemeName) => {
  console.log(`[JanSeva Analytics] Scheme Viewed: ${schemeName} (${schemeId})`);
};
