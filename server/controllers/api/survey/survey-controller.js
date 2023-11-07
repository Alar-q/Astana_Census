const ApiError = require("../../../exceptions/ApiError");

const service = require('../../../services/survey-service');

const logger = require('../../../log/logger')('survey-controller');

const StandardController = require('../../StandardController');
const standardController = StandardController(service);


module.exports = ({
    ...standardController,
});