const mongoose = require('mongoose');

const CertificateSchema = new mongoose.Schema({
  certificateId: { 
    type: String, 
    required: true, 
    unique: true 
  },
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  course: { 
    type: Number, 
    required: true 
  },
  courseTitle: { 
    type: String, 
    required: true 
  },
  userName: { 
    type: String, 
    required: true 
  },
  issueDate: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Certificate', CertificateSchema);
