const {Schema, model} = require('mongoose');

const SurveySchema = new Schema(
    {
        consent: {
            type: Boolean,
            required: true,
        },
        fullName: {
            type: String,
            required: true,
        },
        dateOfBirth: {
            type: Date,
            required: true,
        },
        gender: {
            type: String,
            required: true,
            enum: ['male', 'female', 'other'], // Add other genders as needed, or remove if not necessary
        },
        idNumber: {
            type: String,
            required: true,
            unique: true,
        },
        city: {
            type: String,
            required: true,
        },
        streetAddress: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+\@.+\..+/, 'Please fill a valid email address'],
        },
        phoneNumber: {
            type: String,
            required: true,
            unique: true,
            match: [/^\d{11}$/, 'Please fill a valid phone number'], // Adjust regex as per the phone number format
        },
        occupation: {
            type: String,
            required: true,
        },
        educationLevel: {
            type: String,
            required: true,
            enum: ['elementary', 'secondary', 'tertiary', 'undergraduate', 'graduate', 'postgraduate'], // Add other levels as needed
        },
    },
    {
        timestamps: true, // Includes createdAt and updatedAt fields
    }
);

SurveySchema.plugin(require('mongoose-unique-validator'));
SurveySchema.plugin(require('../log-plugin'));

module.exports = model('Survey', SurveySchema);
