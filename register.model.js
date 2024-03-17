const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Register schema
const registerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  userName: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  confirmPassword: {
    type: String,
    required: true,
    // Set select to false to ensure the field is not selected by default
    select: false
  }
});

// Pre-save hook to hash password and remove confirmPassword
registerSchema.pre('save', async function(next) {
  try {
    if (!this.isModified('password')) {
      return next();
    }

    // Generate a salt
    const salt = await bcrypt.genSalt(10);

    // Hash the password along with the salt
    this.password = await bcrypt.hash(this.password, salt);

    // Remove confirmPassword before saving
    this.confirmPassword = undefined;

    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
registerSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    return 'dont match';
  }
};



  // Check if passwords match
 


const Register = mongoose.model('Register', registerSchema);

module.exports = Register;
