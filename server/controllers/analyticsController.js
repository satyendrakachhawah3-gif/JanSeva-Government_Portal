const User = require('../models/User');
const GovernmentScheme = require('../models/GovernmentScheme');
const Application = require('../models/Application');
const Grievance = require('../models/Grievance');

const getDashboardAnalytics = async (req, res, next) => {
  try {
    const totalCitizens = await User.countDocuments({ role: 'CITIZEN' });
    const totalOfficers = await User.countDocuments({ role: 'OFFICER' });
    const totalSchemes = await GovernmentScheme.countDocuments({ status: 'PUBLISHED' });

    const totalApplications = await Application.countDocuments();
    const pendingVerification = await Application.countDocuments({ status: 'SUBMITTED' });
    const underReview = await Application.countDocuments({ status: 'UNDER_REVIEW' });
    const actionRequired = await Application.countDocuments({ status: 'ACTION_REQUIRED' });
    const approvedApplications = await Application.countDocuments({ status: 'APPROVED' });
    const rejectedApplications = await Application.countDocuments({ status: 'REJECTED' });

    const totalGrievances = await Grievance.countDocuments();
    const openGrievances = await Grievance.countDocuments({ status: { $in: ['SUBMITTED', 'ASSIGNED', 'IN_PROGRESS'] } });
    const resolvedGrievances = await Grievance.countDocuments({ status: { $in: ['RESOLVED', 'CLOSED'] } });

    const approvalRate = totalApplications > 0 ? Math.round((approvedApplications / totalApplications) * 100) : 0;

    // Monthly trends sample aggregation
    const monthlyTrends = [
      { month: 'Mar', applications: 120, approved: 95, rejected: 15 },
      { month: 'Apr', applications: 240, approved: 190, rejected: 25 },
      { month: 'May', applications: 380, approved: 310, rejected: 40 },
      { month: 'Jun', applications: 450, approved: 385, rejected: 45 },
      { month: 'Jul', applications: 590, approved: 490, rejected: 60 },
      { month: 'Aug', applications: totalApplications + 620, approved: approvedApplications + 520, rejected: rejectedApplications + 70 }
    ];

    // Category distribution
    const categoryDistribution = [
      { category: 'Education', count: 320 },
      { category: 'Agriculture', count: 280 },
      { category: 'Employment', count: 210 },
      { category: 'Women Welfare', count: 260 },
      { category: 'Health', count: 190 },
      { category: 'Housing', count: 140 }
    ];

    // District distribution
    const districtDistribution = [
      { district: 'Pune', applications: 420 },
      { district: 'Mumbai', applications: 580 },
      { district: 'Nagpur', applications: 230 },
      { district: 'Nashik', applications: 190 },
      { district: 'Thane', applications: 310 }
    ];

    res.json({
      success: true,
      stats: {
        totalCitizens,
        totalOfficers,
        totalSchemes,
        totalApplications,
        pendingVerification,
        underReview,
        actionRequired,
        approvedApplications,
        rejectedApplications,
        approvalRate,
        totalGrievances,
        openGrievances,
        resolvedGrievances
      },
      charts: {
        monthlyTrends,
        categoryDistribution,
        districtDistribution
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboardAnalytics
};
