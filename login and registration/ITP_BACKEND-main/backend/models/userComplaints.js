const mongoose = require('mongoose')
var Schema = mongoose.Schema;

const userComplaints = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Please add a Title'],
    },
    body: {
      type: String,
      required: [true, 'Please add a body'],
    },
    adminResponse: {
      type: String,
    },
    userId: {
      type: Schema.Types.ObjectId, ref: 'AllUsers',
      required: [true, 'Please add a user ID']
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('userComplaints', userComplaints)
