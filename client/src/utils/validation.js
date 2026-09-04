/**
 * Client-side input validation utilities for JanSeva forms
 */

export const validateAadhaar = (aadhaarNumber) => {
  const cleaned = String(aadhaarNumber).replace(/\s+/g, '');
  return /^\d{12}$/.test(cleaned);
};

export const validateIFSC = (ifscCode) => {
  const cleaned = String(ifscCode).trim().toUpperCase();
  return /^[A-Z]{4}0[A-Z0-9]{6}$/.test(cleaned);
};

export const validateMobile = (mobileNumber) => {
  const cleaned = String(mobileNumber).trim();
  return /^[6-9]\d{9}$/.test(cleaned);
};

export const validatePinCode = (pinCode) => {
  const cleaned = String(pinCode).trim();
  return /^[1-9][0-9]{5}$/.test(cleaned);
};

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(String(email).toLowerCase());
};

export const formatAadhaarNumber = (value) => {
  const digits = String(value).replace(/\D/g, '').slice(0, 12);
  return digits.replace(/(\d{4})(?=\d)/g, '$1 ');
};
