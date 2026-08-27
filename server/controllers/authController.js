const User = require('../models/User');
const CitizenProfile = require('../models/CitizenProfile');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'janseva_ai_secure_jwt_secret_key_2026_super_secret', {
    expiresIn: '30d'
  });
};

// Register Citizen
const registerUser = async (req, res, next) => {
  try {
    const {
      name,
      email,
      password,
      role,
      mobile,
      dob,
      gender,
      state,
      district,
      address,
      annualIncome,
      occupation,
      education,
      maritalStatus,
      familySize,
      casteCategory,
      isStudent,
      isFarmer,
      isDisability,
      isVeteran,
      isUnemployed
    } = req.body;

    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'An account with this email address already exists.' });
    }

    const assignedRole = (role && ['CITIZEN', 'OFFICER', 'ADMIN'].includes(role)) ? role : 'CITIZEN';

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      role: assignedRole,
      mobile: mobile || '',
      isProfileComplete: true
    });

    let profile = null;
    if (assignedRole === 'CITIZEN') {
      const parsedAge = dob ? Math.floor((new Date() - new Date(dob)) / (365.25 * 24 * 60 * 60 * 1000)) : 25;
      profile = await CitizenProfile.create({
        user: user._id,
        dob: dob || new Date('1998-05-15'),
        age: parsedAge,
        gender: gender || 'Female',
        state: state || 'Maharashtra',
        district: district || 'Pune',
        address: address || '',
        annualIncome: Number(annualIncome) || 180000,
        occupation: occupation || 'Student',
        education: education || 'Graduate',
        maritalStatus: maritalStatus || 'Single',
        familySize: Number(familySize) || 4,
        casteCategory: casteCategory || 'General',
        isStudent: Boolean(isStudent),
        isFarmer: Boolean(isFarmer),
        isDisability: Boolean(isDisability),
        isVeteran: Boolean(isVeteran),
        isUnemployed: Boolean(isUnemployed),
        isSeniorCitizen: parsedAge >= 60,
        isWomanApplicant: gender === 'Female'
      });
    }

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: 'Account registered successfully.',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        mobile: user.mobile
      },
      profile
    });
  } catch (error) {
    next(error);
  }
};

// Login
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password.' });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials.' });
    }

    const token = generateToken(user._id);
    const profile = await CitizenProfile.findOne({ user: user._id });

    res.json({
      success: true,
      message: 'Logged in successfully.',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        mobile: user.mobile
      },
      profile
    });
  } catch (error) {
    next(error);
  }
};

// Get current user profile
const getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    const profile = await CitizenProfile.findOne({ user: req.user.id });

    res.json({
      success: true,
      user,
      profile
    });
  } catch (error) {
    next(error);
  }
};

// Update profile
const updateProfile = async (req, res, next) => {
  try {
    let profile = await CitizenProfile.findOne({ user: req.user.id });
    if (!profile) {
      profile = new CitizenProfile({ user: req.user.id, state: 'Maharashtra', district: 'Pune' });
    }

    const fields = [
      'dob', 'gender', 'state', 'district', 'address', 'pincode',
      'annualIncome', 'occupation', 'education', 'maritalStatus', 'familySize',
      'casteCategory', 'isStudent', 'isFarmer', 'isDisability', 'isVeteran', 'isUnemployed'
    ];

    fields.forEach(f => {
      if (req.body[f] !== undefined) {
        profile[f] = req.body[f];
      }
    });

    if (profile.dob) {
      profile.age = Math.floor((new Date() - new Date(profile.dob)) / (365.25 * 24 * 60 * 60 * 1000));
      profile.isSeniorCitizen = profile.age >= 60;
    }
    profile.isWomanApplicant = profile.gender === 'Female';

    await profile.save();

    res.json({
      success: true,
      message: 'Profile updated successfully.',
      profile
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
  updateProfile
};
