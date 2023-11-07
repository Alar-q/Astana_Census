const express= require('express');

const Router = express.Router();

const SurveyModel = require('../../../models/survey/Survey');

// POST method to save a new survey
Router.post('/', async (req, res, next) => {
    try {
        // Create a new survey from the request body
        const newSurvey = new SurveyModel(req.body);
        // Save the survey to the database
        await newSurvey.save();
        // Send back the saved survey
        res.status(201).json(newSurvey);
    } catch (err) {
        // If an error occurs, pass it to the error handler
        next(err);
    }
});

// GET method to retrieve all surveys
Router.get('/', async (req, res, next) => {
    try {
        // Retrieve all surveys from the database
        const surveys = await SurveyModel.find({});
        // Send back the array of surveys
        res.status(200).json(surveys);
    } catch (err) {
        // If an error occurs, pass it to the error handler
        next(err);
    }
});

module.exports = Router;