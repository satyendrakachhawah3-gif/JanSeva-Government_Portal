/**
 * Password Hashing & Salt Comparison Utility for JanSeva AI
 */

const bcrypt = require('bcryptjs');

const SALT_ROUNDS = 10;

/**
 * Hash plain text password using bcrypt
 * @param {string} password 
 * @returns {Promise<string>} Hashed password
 */
const hashPassword = async (password) => {
  if (!password) throw new Error('Password string is required for hashing');
  const salt = await bcrypt.genSalt(SALT_ROUNDS);
  return bcrypt.hash(password, salt);
};

/**
 * Compare plain text password against hashed password
 * @param {string} password 
 * @param {string} hash 
 * @returns {Promise<boolean>}
 */
const comparePassword = async (password, hash) => {
  if (!password || !hash) return false;
  return bcrypt.compare(password, hash);
};

module.exports = {
  hashPassword,
  comparePassword
};
