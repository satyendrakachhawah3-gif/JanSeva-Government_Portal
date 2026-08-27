const { generateAssistantResponse } = require('../services/aiService');

const chatWithAssistant = async (req, res, next) => {
  try {
    const { query, history } = req.body;
    if (!query) {
      return res.status(400).json({ success: false, message: 'Please provide a search question or query.' });
    }

    const response = await generateAssistantResponse(query, history || []);

    res.json({
      success: true,
      data: response
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  chatWithAssistant
};
