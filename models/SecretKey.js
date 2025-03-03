const mongoose = require('mongoose');

const secretKeySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  secretNumber: { type: Number, required: true },
  expiresAt: { type: Date, required: true },
});

module.exports = mongoose.model('SecretKey', secretKeySchema);
