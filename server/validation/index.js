const Joi = require("joi");

exports.paginationValidator = {
  payload: {
    page: Joi.number().required(),
    pageSize: Joi.number().min(1).max(99).required(),
  },
};

exports.idAndPaginationValidator = {
  params: {
    id: Joi.number().required(),
  },
  payload: {
    page: Joi.number().required(),
    pageSize: Joi.number().min(1).max(99).required(),
  },
};

exports.paramIdValidator = {
  params: {
    id: Joi.number().required(),
  },
};

exports.userIdValidator = {
    params: {
      id: Joi.string().required(),
    },
  };
  
exports.searchValidator = {
  payload: {
    selectedOption: Joi.string().required(),
    page: Joi.number().required(),
    pageSize: Joi.number().min(1).max(99).required(),
    searchTerm: Joi.string().required()
  },
};

exports.movieByLanguageValidator = {
  payload: {
    language: Joi.string().required(),
  },
};

exports.homeDataValidator = {
  payload: {
    gen1: Joi.string().required(),
    gen2: Joi.string().required(),
    gen3: Joi.string().required(),
  },
};

exports.signinValidator = {
  payload: {
    mail: Joi.string().required(),
    password: Joi.string().required(),
  },
};

exports.signupValidator = {
  payload: {
    mail: Joi.string().required(),
    password: Joi.string().required(),
    name: Joi.string().required(),
  },
};
