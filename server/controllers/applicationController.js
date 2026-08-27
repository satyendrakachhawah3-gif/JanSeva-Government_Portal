const Application = require('../models/Application');
const ApplicationDocument = require('../models/ApplicationDocument');
const Notification = require('../models/Notification');
const AuditLog = require('../models/AuditLog');
const GovernmentScheme = require('../models/GovernmentScheme');

// Citizen Submit Application
const submitApplication = async (req, res, next) => {
  try {
    const { schemeId, applicantDetails } = req.body;
    const citizenId = req.user.id;

    const scheme = await GovernmentScheme.findById(schemeId);
    if (!scheme) {
      return res.status(404).json({ success: false, message: 'Scheme not found.' });
    }

    // Generate unique Application ID: e.g. JS-2026-89412
    const randomCode = Math.floor(10000 + Math.random() * 90000);
    const applicationId = `JS-2026-${randomCode}`;

    const application = await Application.create({
      applicationId,
      citizen: citizenId,
      scheme: schemeId,
      applicantDetails: applicantDetails || {},
      status: 'SUBMITTED',
      submittedAt: new Date(),
      statusHistory: [
        {
          status: 'SUBMITTED',
          timestamp: new Date(),
          remarks: 'Application submitted successfully by citizen.',
          updatedBy: citizenId
        }
      ]
    });

    // Create Notification for Citizen
    await Notification.create({
      user: citizenId,
      title: 'Application Submitted',
      message: `Your application (${applicationId}) for ${scheme.name} has been successfully submitted.`,
      type: 'APPLICATION_SUBMITTED',
      link: `/applications/${application._id}`
    });

    // Log to Audit Trail
    await AuditLog.create({
      action: 'APPLICATION_SUBMITTED',
      performedBy: citizenId,
      targetEntity: 'Application',
      targetId: application._id.toString(),
      details: { applicationId, schemeName: scheme.name }
    });

    res.status(201).json({
      success: true,
      message: `Application submitted successfully. Your Application ID is ${applicationId}`,
      application
    });
  } catch (error) {
    next(error);
  }
};

// Get My Applications (Citizen)
const getMyApplications = async (req, res, next) => {
  try {
    const applications = await Application.find({ citizen: req.user.id })
      .populate('scheme', 'name code department category officialUrl')
      .sort({ createdAt: -1 });

    res.json({ success: true, count: applications.length, applications });
  } catch (error) {
    next(error);
  }
};

// Get All Applications (Officer / Admin)
const getAllApplications = async (req, res, next) => {
  try {
    const { status, schemeId, search } = req.query;
    const filter = {};

    if (status && status !== 'All') {
      filter.status = status;
    }

    if (schemeId) {
      filter.scheme = schemeId;
    }

    let applications = await Application.find(filter)
      .populate('citizen', 'name email mobile')
      .populate('scheme', 'name department category code')
      .sort({ createdAt: -1 });

    if (search) {
      const q = search.toLowerCase();
      applications = applications.filter(app => {
        return (
          app.applicationId.toLowerCase().includes(q) ||
          (app.citizen && app.citizen.name.toLowerCase().includes(q)) ||
          (app.scheme && app.scheme.name.toLowerCase().includes(q))
        );
      });
    }

    res.json({ success: true, count: applications.length, applications });
  } catch (error) {
    next(error);
  }
};

// Get Application by ID
const getApplicationById = async (req, res, next) => {
  try {
    const application = await Application.findById(req.params.id)
      .populate('citizen', 'name email mobile role')
      .populate('scheme')
      .populate('reviewedBy', 'name email role');

    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found.' });
    }

    // Check authorization: citizen can only view own application
    if (req.user.role === 'CITIZEN' && application.citizen._id.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: 'Unauthorized to view this application.' });
    }

    const documents = await ApplicationDocument.find({ application: application._id });

    res.json({ success: true, application, documents });
  } catch (error) {
    next(error);
  }
};

// Update Status (Officer / Admin)
const updateApplicationStatus = async (req, res, next) => {
  try {
    const { status, remarks } = req.body;
    const application = await Application.findById(req.params.id).populate('scheme');

    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found.' });
    }

    application.status = status;
    application.officerRemarks = remarks || '';
    application.reviewedBy = req.user.id;
    application.statusHistory.push({
      status,
      timestamp: new Date(),
      remarks: remarks || `Status updated to ${status}`,
      updatedBy: req.user.id
    });

    await application.save();

    // Trigger Notification to Citizen
    let notifTitle = `Application ${status}`;
    let notifMessage = `Your application (${application.applicationId}) status has been updated to ${status}.`;

    if (status === 'APPROVED') {
      notifTitle = '🎉 Application Approved!';
      notifMessage = `Congratulations! Your application (${application.applicationId}) for ${application.scheme.name} has been APPROVED by the verification officer.`;
    } else if (status === 'REJECTED') {
      notifTitle = 'Application Status Notice';
      notifMessage = `Your application (${application.applicationId}) for ${application.scheme.name} was rejected. Remarks: ${remarks || 'Criteria mismatched'}.`;
    } else if (status === 'ACTION_REQUIRED') {
      notifTitle = 'Additional Action Required';
      notifMessage = `Your application (${application.applicationId}) requires additional document re-upload or information.`;
    }

    await Notification.create({
      user: application.citizen,
      title: notifTitle,
      message: notifMessage,
      type: status,
      link: `/applications/${application._id}`
    });

    // Record Audit Log
    await AuditLog.create({
      action: `APPLICATION_STATUS_UPDATED_${status}`,
      performedBy: req.user.id,
      targetEntity: 'Application',
      targetId: application._id.toString(),
      details: { status, remarks, applicationId: application.applicationId }
    });

    res.json({
      success: true,
      message: `Application status updated to ${status}.`,
      application
    });
  } catch (error) {
    next(error);
  }
};

// Upload Document endpoint
const uploadDocument = async (req, res, next) => {
  try {
    const { applicationId, documentType } = req.body;

    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Please upload a document file.' });
    }

    const application = await Application.findById(applicationId);
    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found.' });
    }

    // Build document URL (local storage or Cloudinary link)
    const fileUrl = `/uploads/${req.file.filename}`;

    const document = await ApplicationDocument.create({
      application: applicationId,
      documentType: documentType || 'Proof Document',
      fileName: req.file.originalname,
      fileUrl,
      fileSize: req.file.size,
      mimeType: req.file.mimetype,
      verificationStatus: 'PENDING'
    });

    res.status(201).json({
      success: true,
      message: 'Document uploaded successfully.',
      document
    });
  } catch (error) {
    next(error);
  }
};

// Verify/Reject specific Document (Officer)
const verifyDocumentStatus = async (req, res, next) => {
  try {
    const { documentId } = req.params;
    const { status, remarks } = req.body;

    const doc = await ApplicationDocument.findById(documentId);
    if (!doc) {
      return res.status(404).json({ success: false, message: 'Document not found.' });
    }

    doc.verificationStatus = status; // VERIFIED, REJECTED, REUPLOAD_REQUESTED
    doc.reviewer = req.user.id;
    doc.reviewerRemarks = remarks || '';
    await doc.save();

    res.json({
      success: true,
      message: `Document status set to ${status}.`,
      document: doc
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  submitApplication,
  getMyApplications,
  getAllApplications,
  getApplicationById,
  updateApplicationStatus,
  uploadDocument,
  verifyDocumentStatus
};
