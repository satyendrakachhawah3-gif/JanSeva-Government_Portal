const Grievance = require('../models/Grievance');
const Notification = require('../models/Notification');

// Submit Grievance
const submitGrievance = async (req, res, next) => {
  try {
    const { subject, category, description, department, location } = req.body;
    const citizenId = req.user.id;

    const randomCode = Math.floor(10000 + Math.random() * 90000);
    const grievanceId = `GRV-2026-${randomCode}`;

    const grievance = await Grievance.create({
      grievanceId,
      citizen: citizenId,
      subject,
      category,
      description,
      department: department || 'General Public Grievance',
      location: location || 'National Portal',
      attachmentUrl: req.file ? `/uploads/${req.file.filename}` : '',
      status: 'SUBMITTED'
    });

    await Notification.create({
      user: citizenId,
      title: 'Grievance Registered',
      message: `Your grievance ticket (${grievanceId}) has been registered and routed to the public redressal desk.`,
      type: 'GRIEVANCE_UPDATE',
      link: '/grievances'
    });

    res.status(201).json({
      success: true,
      message: `Grievance registered. Ticket ID: ${grievanceId}`,
      grievance
    });
  } catch (error) {
    next(error);
  }
};

// Get My Grievances (Citizen)
const getMyGrievances = async (req, res, next) => {
  try {
    const grievances = await Grievance.find({ citizen: req.user.id }).sort({ createdAt: -1 });
    res.json({ success: true, count: grievances.length, grievances });
  } catch (error) {
    next(error);
  }
};

// Get All Grievances (Officer/Admin)
const getAllGrievances = async (req, res, next) => {
  try {
    const { status, category } = req.query;
    const filter = {};
    if (status && status !== 'All') filter.status = status;
    if (category && category !== 'All') filter.category = category;

    const grievances = await Grievance.find(filter)
      .populate('citizen', 'name email mobile')
      .populate('assignedOfficer', 'name email')
      .sort({ createdAt: -1 });

    res.json({ success: true, count: grievances.length, grievances });
  } catch (error) {
    next(error);
  }
};

// Update Grievance Status (Officer/Admin)
const updateGrievance = async (req, res, next) => {
  try {
    const { status, resolutionNotes } = req.body;
    const grievance = await Grievance.findById(req.params.id);

    if (!grievance) {
      return res.status(404).json({ success: false, message: 'Grievance ticket not found.' });
    }

    grievance.status = status;
    if (resolutionNotes) grievance.resolutionNotes = resolutionNotes;
    grievance.assignedOfficer = req.user.id;
    await grievance.save();

    await Notification.create({
      user: grievance.citizen,
      title: 'Grievance Status Updated',
      message: `Your grievance (${grievance.grievanceId}) status is now ${status}.`,
      type: 'GRIEVANCE_UPDATE',
      link: '/grievances'
    });

    res.json({ success: true, message: 'Grievance updated successfully.', grievance });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitGrievance,
  getMyGrievances,
  getAllGrievances,
  updateGrievance
};
