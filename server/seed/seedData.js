const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });

const User = require('../models/User');
const CitizenProfile = require('../models/CitizenProfile');
const GovernmentScheme = require('../models/GovernmentScheme');
const Application = require('../models/Application');
const ApplicationDocument = require('../models/ApplicationDocument');
const Grievance = require('../models/Grievance');
const Notification = require('../models/Notification');
const GovernmentOffice = require('../models/GovernmentOffice');
const AuditLog = require('../models/AuditLog');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/janseva_ai');
    console.log('[Seed] Database Connected.');
  } catch (err) {
    console.error('[Seed] Database connection error:', err);
    process.exit(1);
  }
};

const seedData = async () => {
  try {
    await connectDB();

    console.log('[Seed] Cleaning old database collections...');
    await User.deleteMany({});
    await CitizenProfile.deleteMany({});
    await GovernmentScheme.deleteMany({});
    await Application.deleteMany({});
    await ApplicationDocument.deleteMany({});
    await Grievance.deleteMany({});
    await Notification.deleteMany({});
    await GovernmentOffice.deleteMany({});
    await AuditLog.deleteMany({});

    console.log('[Seed] Creating demo user accounts...');

    // 1. Admin
    const admin = await User.create({
      name: 'Central Admin Officer',
      email: 'admin@janseva.ai',
      password: 'password123',
      role: 'ADMIN',
      mobile: '+91 9876543210',
      isProfileComplete: true
    });

    // 2. Officer
    const officer = await User.create({
      name: 'Rajesh Kumar (Verification Officer)',
      email: 'officer@janseva.ai',
      password: 'password123',
      role: 'OFFICER',
      mobile: '+91 9876543211',
      isProfileComplete: true
    });

    // 3. Citizen
    const citizen = await User.create({
      name: 'Sunita Sharma',
      email: 'citizen@janseva.ai',
      password: 'password123',
      role: 'CITIZEN',
      mobile: '+91 9876543212',
      isProfileComplete: true
    });

    const citizenProfile = await CitizenProfile.create({
      user: citizen._id,
      dob: new Date('2002-08-14'),
      age: 24,
      gender: 'Female',
      state: 'Maharashtra',
      district: 'Pune',
      address: 'Plot 42, Green Avenue, Kothrud',
      pincode: '411038',
      annualIncome: 180000,
      occupation: 'Student',
      education: 'Graduate',
      maritalStatus: 'Single',
      familySize: 4,
      casteCategory: 'OBC',
      isStudent: true,
      isFarmer: false,
      isDisability: false,
      isVeteran: false,
      isUnemployed: false,
      isSeniorCitizen: false,
      isWomanApplicant: true
    });

    console.log('[Seed] Creating government scheme repository...');

    const schemes = await GovernmentScheme.insertMany([
      {
        name: 'PM Scholarship Scheme for Higher Education',
        code: 'SCH-EDU-001',
        department: 'Ministry of Education',
        category: 'Education',
        state: 'All India',
        targetBeneficiaries: 'Meritorious technical/professional undergraduate students',
        description: 'Financial assistance to dependent wards of ex-servicemen and technical students to pursue higher professional degree courses.',
        benefits: [
          'Monthly scholarship of ₹2,500/month for girl students and ₹2,250/month for boy students.',
          'Direct Benefit Transfer (DBT) into verified Aadhaar-linked bank accounts.',
          'Annual renewal subject to maintaining 60% academic score.'
        ],
        eligibilityCriteria: {
          minAge: 17,
          maxAge: 28,
          maxIncome: 800000,
          allowedOccupations: ['Student'],
          allowedEducation: ['Higher Secondary', 'Graduate', 'Undergraduate'],
          allowedStates: ['All India'],
          studentOnly: true,
          farmerOnly: false,
          disabilityOnly: false,
          femaleOnly: false
        },
        requiredDocuments: [
          'Aadhaar Card',
          'Income Certificate issued by Tehsildar',
          'Mark sheet of 12th / Diploma examination',
          'Current College Admission Bonafide Certificate',
          'Bank Account Passbook (Aadhaar Seeded)'
        ],
        applicationProcess: [
          'Submit profile and academic details on JanSeva AI.',
          'Upload scanned PDF copies of mark sheets and bonafide certificate.',
          'Physical/Digital document verification by Department Officer.',
          'DBT release upon administrative approval.'
        ],
        startDate: new Date('2026-01-01'),
        endDate: new Date('2026-12-31'),
        officialUrl: 'https://scholarships.gov.in',
        status: 'PUBLISHED',
        createdBy: admin._id
      },
      {
        name: 'PM-Kisan Samman Nidhi Yojana',
        code: 'SCH-AGR-002',
        department: 'Ministry of Agriculture & Farmers Welfare',
        category: 'Agriculture',
        state: 'All India',
        targetBeneficiaries: 'Small and marginal landholder farmer families',
        description: 'Direct income support of ₹6,000 per year in three equal installments to all landholding farmer families across the country.',
        benefits: [
          '₹6,000 annual financial aid disbursed in 3 installments of ₹2,000.',
          '100% direct bank transfer via Aadhaar payment bridge.',
          'Emergency crop input support during sowing seasons.'
        ],
        eligibilityCriteria: {
          minAge: 18,
          maxAge: 80,
          maxIncome: 1000000,
          allowedOccupations: ['Farmer', 'Agriculture Worker'],
          allowedEducation: ['All'],
          allowedStates: ['All India'],
          studentOnly: false,
          farmerOnly: true,
          disabilityOnly: false,
          femaleOnly: false
        },
        requiredDocuments: [
          'Landholding Certificate / 7/12 Extract',
          'Aadhaar Card of Landowner',
          'Active Bank Account linked with Aadhaar',
          'Self-Declaration Form'
        ],
        applicationProcess: [
          'Register on PM-Kisan or apply via JanSeva AI.',
          'Upload Landholding records and Aadhaar details.',
          'State Nodal Officer land verification.',
          'Installment credit notification via SMS.'
        ],
        startDate: new Date('2026-01-01'),
        endDate: new Date('2026-12-31'),
        officialUrl: 'https://pmkisan.gov.in',
        status: 'PUBLISHED',
        createdBy: admin._id
      },
      {
        name: 'Pradhan Mantri Matru Vandana Yojana (PMMVY)',
        code: 'SCH-WOM-003',
        department: 'Ministry of Women & Child Development',
        category: 'Women & Child Welfare',
        state: 'All India',
        targetBeneficiaries: 'Pregnant women and lactating mothers',
        description: 'Maternity benefit program providing cash incentives for partial compensation for wage loss during pregnancy and childbirth.',
        benefits: [
          'Cash incentive of ₹5,000 for first child in 3 installments.',
          'Additional ₹6,000 incentive on birth of a girl child.',
          'Free health checkups and immunization support under Poshan Abhiyaan.'
        ],
        eligibilityCriteria: {
          minAge: 19,
          maxAge: 45,
          maxIncome: 800000,
          allowedOccupations: ['All'],
          allowedEducation: ['All'],
          allowedStates: ['All India'],
          studentOnly: false,
          farmerOnly: false,
          disabilityOnly: false,
          femaleOnly: true
        },
        requiredDocuments: [
          'Mother and Child Protection (MCP) Card',
          'Aadhaar Card of Mother and Husband',
          'Child Birth Certificate',
          'Bank Account Passbook'
        ],
        applicationProcess: [
          'Submit registration at local Anganwadi or JanSeva AI portal.',
          'Upload MCP card registration proof.',
          'Field verification by Child Development Project Officer (CDPO).',
          'Direct bank transfer.'
        ],
        startDate: new Date('2026-01-01'),
        endDate: new Date('2026-12-31'),
        officialUrl: 'https://pmmvy.wcd.gov.in',
        status: 'PUBLISHED',
        createdBy: admin._id
      },
      {
        name: 'Ayushman Bharat PM-JAY Health Insurance',
        code: 'SCH-HLT-004',
        department: 'National Health Authority',
        category: 'Health',
        state: 'All India',
        targetBeneficiaries: 'Low-income and vulnerable families',
        description: 'World’s largest government-funded health assurance scheme providing health cover of ₹5 Lakh per family per year for secondary and tertiary care hospitalization.',
        benefits: [
          'Free hospitalization coverage up to ₹5,000,000 per family annually.',
          'Cashless access to empanelled public and private hospitals across India.',
          'Covers pre-hospitalization and post-hospitalization medical expenses.'
        ],
        eligibilityCriteria: {
          minAge: 0,
          maxAge: 100,
          maxIncome: 250000,
          allowedOccupations: ['All'],
          allowedEducation: ['All'],
          allowedStates: ['All India'],
          studentOnly: false,
          farmerOnly: false,
          disabilityOnly: false,
          femaleOnly: false
        },
        requiredDocuments: [
          'Ration Card / SECC Data Proof',
          'Aadhaar Card of Family Members',
          'Income Certificate / BPL Card'
        ],
        applicationProcess: [
          'Verify SECC eligibility using JanSeva AI scanner.',
          'E-KYC authentication via Ayushman Mitra.',
          'Instant Generation of Golden Health Card.'
        ],
        startDate: new Date('2026-01-01'),
        endDate: new Date('2026-12-31'),
        officialUrl: 'https://pmjay.gov.in',
        status: 'PUBLISHED',
        createdBy: admin._id
      },
      {
        name: 'Pradhan Mantri Awas Yojana (PMAY-Urban)',
        code: 'SCH-HOU-005',
        department: 'Ministry of Housing and Urban Affairs',
        category: 'Housing',
        state: 'All India',
        targetBeneficiaries: 'Urban Economically Weaker Sections (EWS) and Low Income Groups',
        description: 'Housing for All mission providing financial subsidy for construction of pacca house with basic amenities.',
        benefits: [
          'Interest subsidy up to ₹2.67 Lakh under Credit Linked Subsidy Scheme (CLSS).',
          'Direct grant of ₹1.5 Lakh for beneficiary-led individual house construction.',
          'Eco-friendly disaster resistant housing layouts.'
        ],
        eligibilityCriteria: {
          minAge: 21,
          maxAge: 70,
          maxIncome: 600000,
          allowedOccupations: ['All'],
          allowedEducation: ['All'],
          allowedStates: ['All India'],
          studentOnly: false,
          farmerOnly: false,
          disabilityOnly: false,
          femaleOnly: false
        },
        requiredDocuments: [
          'Aadhaar Card of all family members',
          'Proof of Income (Form 16 or Tehsildar certificate)',
          'Property Ownership Document / Plot Sanction Plan',
          'Affidavit stating non-ownership of any pacca house in India'
        ],
        applicationProcess: [
          'Apply online via JanSeva AI PMAY module.',
          'Municipal Corporation site inspection.',
          'Sanction letter issuance and installment disbursement.'
        ],
        startDate: new Date('2026-01-01'),
        endDate: new Date('2026-12-31'),
        officialUrl: 'https://pmaymis.gov.in',
        status: 'PUBLISHED',
        createdBy: admin._id
      },
      {
        name: 'Divyangjan Accessible Transport & Equipment Grant',
        code: 'SCH-DIS-006',
        department: 'Department of Empowerment of Persons with Disabilities',
        category: 'Disability Support',
        state: 'All India',
        targetBeneficiaries: 'Persons with 40%+ benchmark disabilities',
        description: 'Assistance to disabled persons for purchasing motorized tricycles, hearing aids, braille readers, and adaptive technology devices.',
        benefits: [
          'Full grant up to ₹25,000 for assistive aids and motorized devices.',
          'Free travel pass allowance on state transport buses.',
          'Skill development and rehabilitation training stipends.'
        ],
        eligibilityCriteria: {
          minAge: 5,
          maxAge: 75,
          maxIncome: 450000,
          allowedOccupations: ['All'],
          allowedEducation: ['All'],
          allowedStates: ['All India'],
          studentOnly: false,
          farmerOnly: false,
          disabilityOnly: true,
          femaleOnly: false
        },
        requiredDocuments: [
          'UDID (Unique Disability ID) Card or Medical Certificate (40%+ disability)',
          'Aadhaar Card',
          'Income Certificate',
          'Passport Size Photographs'
        ],
        applicationProcess: [
          'Upload UDID card and profile details.',
          'Verification by District Social Welfare Officer.',
          'Distribution camp notification or direct home delivery of equipment.'
        ],
        startDate: new Date('2026-01-01'),
        endDate: new Date('2026-12-31'),
        officialUrl: 'https://disabilityaffairs.gov.in',
        status: 'PUBLISHED',
        createdBy: admin._id
      }
    ]);

    console.log('[Seed] Creating demo applications and documents...');

    const app1 = await Application.create({
      applicationId: 'JS-2026-89412',
      citizen: citizen._id,
      scheme: schemes[0]._id, // PM Scholarship
      applicantDetails: {
        fullName: citizen.name,
        email: citizen.email,
        mobile: citizen.mobile,
        state: citizenProfile.state,
        district: citizenProfile.district,
        annualIncome: citizenProfile.annualIncome,
        occupation: citizenProfile.occupation,
        bankAccountNo: '987654321098',
        ifscCode: 'SBIN0001234',
        bankName: 'State Bank of India'
      },
      status: 'UNDER_REVIEW',
      submittedAt: new Date(Date.now() - 3 * 86400000),
      reviewedBy: officer._id,
      officerRemarks: 'Initial document check verified. Academic mark sheet verified with university database.',
      statusHistory: [
        {
          status: 'SUBMITTED',
          timestamp: new Date(Date.now() - 3 * 86400000),
          remarks: 'Application submitted successfully.',
          updatedBy: citizen._id
        },
        {
          status: 'DOCUMENTS_VERIFIED',
          timestamp: new Date(Date.now() - 2 * 86400000),
          remarks: 'Aadhaar and Income certificate verified.',
          updatedBy: officer._id
        },
        {
          status: 'UNDER_REVIEW',
          timestamp: new Date(Date.now() - 1 * 86400000),
          remarks: 'Under final committee review for grant release.',
          updatedBy: officer._id
        }
      ]
    });

    await ApplicationDocument.insertMany([
      {
        application: app1._id,
        documentType: 'Aadhaar Card',
        fileName: 'sunita_aadhaar_scan.pdf',
        fileUrl: '/uploads/sample_aadhaar.pdf',
        fileSize: 450000,
        mimeType: 'application/pdf',
        verificationStatus: 'VERIFIED',
        reviewer: officer._id,
        reviewerRemarks: 'Aadhaar UID match clean.'
      },
      {
        application: app1._id,
        documentType: 'Income Certificate',
        fileName: 'income_certificate_2026.pdf',
        fileUrl: '/uploads/sample_income.pdf',
        fileSize: 380000,
        mimeType: 'application/pdf',
        verificationStatus: 'VERIFIED',
        reviewer: officer._id,
        reviewerRemarks: 'Issued by Tehsildar Pune, valid for FY 2025-26.'
      }
    ]);

    console.log('[Seed] Creating demo grievances...');

    await Grievance.create({
      grievanceId: 'GRV-2026-44120',
      citizen: citizen._id,
      subject: 'Delay in DBT Bank Account Verification for Scholarship',
      category: 'Application Delay',
      description: 'My application JS-2026-89412 has passed document verification but DBT bank authorization status is taking longer than 7 working days.',
      department: 'Ministry of Education',
      location: 'Pune District Facilitation Center',
      status: 'IN_PROGRESS',
      assignedOfficer: officer._id,
      resolutionNotes: 'Verification officer assigned. Bank IFSC reconciliation underway with SBI main branch.'
    });

    console.log('[Seed] Creating notifications...');

    await Notification.insertMany([
      {
        user: citizen._id,
        title: 'Application Under Final Review',
        message: 'Your scholarship application JS-2026-89412 has been moved to Final Administrative Review.',
        type: 'UNDER_REVIEW',
        link: `/applications/${app1._id}`,
        isRead: false
      },
      {
        user: citizen._id,
        title: 'New Scheme Recommended for You',
        message: 'Based on your profile, you have an 85% match for PM Scholarship Scheme!',
        type: 'SCHEME_ALERT',
        link: '/recommendations',
        isRead: true
      }
    ]);

    console.log('[Seed] Creating government service centers (Offices)...');

    await GovernmentOffice.insertMany([
      {
        name: 'JanSeva Citizen Facilitation Center - Kothrud',
        type: 'Citizen Service Center',
        department: 'Public Service Delivery',
        district: 'Pune',
        state: 'Maharashtra',
        address: 'Opposite Dashbhuja Ganpati Temple, Karve Road, Kothrud, Pune - 411038',
        contactNumber: '020-25438900',
        email: 'csc.kothrud@janseva.gov.in',
        openingHours: '09:00 AM - 06:00 PM (Mon-Sat)',
        coordinates: { lat: 18.5074, lng: 73.8077 },
        servicesOffered: ['Aadhaar Seva', 'Income Certificate', 'Scheme Application Kiosk', 'Grievance Filing']
      },
      {
        name: 'District Social Welfare Office - Pune Collectorate',
        type: 'District Administrative Office',
        department: 'Social Justice & Special Assistance',
        district: 'Pune',
        state: 'Maharashtra',
        address: 'District Collector Office Campus, Agarkar Nagar, Pune - 411001',
        contactNumber: '020-26123456',
        email: 'dsw.pune@maharashtra.gov.in',
        openingHours: '09:30 AM - 05:30 PM (Mon-Fri)',
        coordinates: { lat: 18.5204, lng: 73.8567 },
        servicesOffered: ['Scholarship Verification', 'Divyangjan Support', 'Senior Pension Desk']
      },
      {
        name: 'JanSeva Digital Seva Kendra - Nariman Point',
        type: 'Citizen Service Center',
        department: 'Information Technology & Services',
        district: 'Mumbai',
        state: 'Maharashtra',
        address: 'Free Press Journal Marg, Nariman Point, Mumbai - 400021',
        contactNumber: '022-22889900',
        email: 'csc.mumbai@janseva.gov.in',
        openingHours: '09:00 AM - 06:00 PM (Mon-Sat)',
        coordinates: { lat: 18.9256, lng: 72.8242 },
        servicesOffered: ['PMAY Housing Helpdesk', 'Ayushman Bharat Card Printing', 'Employment Exchange']
      },
      {
        name: 'District Agriculture Office - Nagpur',
        type: 'Departmental Field Office',
        department: 'Agriculture Department',
        district: 'Nagpur',
        state: 'Maharashtra',
        address: 'Civil Lines, Near High Court, Nagpur - 440001',
        contactNumber: '0712-2567890',
        email: 'agri.nagpur@maharashtra.gov.in',
        openingHours: '10:00 AM - 05:00 PM (Mon-Fri)',
        coordinates: { lat: 21.1458, lng: 79.0882 },
        servicesOffered: ['PM-Kisan Registry', 'Soil Health Card Distribution', 'Farmer Subsidy Verification']
      }
    ]);

    console.log('==================================================');
    console.log('SUCCESS! JanSeva AI Seed Data successfully populated.');
    console.log('==================================================');
    console.log('Demo Credentials:');
    console.log('Admin Account:   admin@janseva.ai   / password123');
    console.log('Officer Account: officer@janseva.ai / password123');
    console.log('Citizen Account: citizen@janseva.ai / password123');
    console.log('==================================================');

    process.exit(0);
  } catch (error) {
    console.error('[Seed Error]:', error);
    process.exit(1);
  }
};

seedData();
