const mongoose = require('mongoose')
const { createdAt } = require('../utils/user')

const bookingSchema = new mongoose.Schema({
    doctorId: {
        type: String,
        required: true
    },
    patientId: {
        type: String,
        required: true
    },
    meetingTime: {
        type: String,
        required: true
    },
    createdAt,
    meetingCompleted: Boolean
})

const Booking = mongoose.model('Booking', bookingSchema)
module.exports = Booking