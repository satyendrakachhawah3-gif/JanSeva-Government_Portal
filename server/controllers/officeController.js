const GovernmentOffice = require('../models/GovernmentOffice');

const getOffices = async (req, res, next) => {
  try {
    const { state, district, search } = req.query;
    const filter = {};

    if (state && state !== 'All') filter.state = state;
    if (district && district !== 'All') filter.district = district;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { address: { $regex: search, $options: 'i' } },
        { department: { $regex: search, $options: 'i' } }
      ];
    }

    const offices = await GovernmentOffice.find(filter).sort({ name: 1 });

    res.json({
      success: true,
      count: offices.length,
      offices
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getOffices
};
