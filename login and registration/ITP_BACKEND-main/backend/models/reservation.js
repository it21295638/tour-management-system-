const mongoose = require('mongoose')
var Schema = mongoose.Schema;

const userComplaints = mongoose.Schema(
    {
        date: {
            type: String,
            required: [true, 'Please add a date'],
        },
        time: {
            type: String,
            required: [true, 'Please add a time'],
        },
        name: {
            type: String,
        },
        phone: {
            type: String,
            // type: Schema.Types.ObjectId, ref: 'AllUsers',
            required: [true, 'Please add a phone']
        },
        username: {
            type: String,
            // type: Schema.Types.ObjectId, ref: 'AllUsers',
            required: [true, 'Please add a username']
        },
        transportType: {
            type: String,
            // type: Schema.Types.ObjectId, ref: 'AllUsers',
            required: [true, 'Please add a transportType']
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('reservation', userComplaints)
