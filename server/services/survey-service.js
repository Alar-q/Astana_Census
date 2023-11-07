const ApiError = require("../exceptions/ApiError");

const { Survey } = require('../models/models-manager');
const surveyDto = require('../dtos/survey-dto');

const createOne = async (body, files, user) => {
    if (!files) {
        files = {};
    }
    if (!user) {
        throw ApiError.ServerError('user is missing');
    }
    if(user.role !== 'admin'){
        throw ApiError.Forbidden('Permission denied. Only for admins.');
    }

    // Нужно найти unique поля?
    // Можно просто засетить полностью и попытаться сохранить с файлами
    await modelService.deleteInvalidFileFields(body);

    const model = new Model({...body, [opts.creatorField]: user.id});

    // logger.log("createOne", {body, model});

    await modelService.saveWithFiles(model, files, { user });

    return model; // dto(model);
};

const findByQueryParams = ()=>{}

module.exports = ({
    createOne,
    findByQueryParams,
});