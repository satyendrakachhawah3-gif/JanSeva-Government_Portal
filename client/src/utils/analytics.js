/**
 * Client-Side Event Telemetry & Usage Metrics Helper for JanSeva AI
 */

class AnalyticsTracker {
  constructor() {
    this.eventsQueue = [];
    this.isEnabled = process.env.NODE_ENV === 'production';
  }

  /**
   * Log user action event safely
   * @param {string} category 
   * @param {string} action 
   * @param {string} label 
   * @param {number} value 
   */
  trackEvent(category, action, label = null, value = null) {
    const eventData = {
      category,
      action,
      label,
      value,
      timestamp: new Date().toISOString(),
      path: window.location.pathname
    };

    if (process.env.NODE_ENV !== 'production') {
      console.log('[Analytics Event]:', eventData);
      return;
    }

    this.eventsQueue.push(eventData);
    if (this.eventsQueue.length >= 5) {
      this.flushEvents();
    }
  }

  /**
   * Track scheme view
   * @param {string} schemeId 
   * @param {string} schemeTitle 
   */
  trackSchemeView(schemeId, schemeTitle) {
    this.trackEvent('Scheme', 'View', `${schemeTitle} (${schemeId})`);
  }

  /**
   * Track chatbot interaction
   * @param {string} queryCategory 
   */
  trackChatbotQuery(queryCategory) {
    this.trackEvent('Chatbot', 'Query', queryCategory);
  }

  /**
   * Flush queued events to analytics endpoint
   */
  async flushEvents() {
    if (this.eventsQueue.length === 0) return;
    const payload = [...this.eventsQueue];
    this.eventsQueue = [];

    try {
      if (navigator.sendBeacon) {
        navigator.sendBeacon('/api/analytics/telemetry', JSON.stringify(payload));
      }
    } catch (err) {
      console.warn('Failed to dispatch analytics payload:', err);
    }
  }
}

export const analytics = new AnalyticsTracker();
