const { API_VERSION } = require("../constants/constants");
const {
  loginHandler,
  signupHandler,
  validateToken,
  getUserDetails,
} = require("../controllers/userController");
const {
  signinValidator,
  signupValidator,
  paramIdValidator,
  userIdValidator,
} = require("../validation");

exports.userRoutes = [
  {
    method: "POST",
    path: `${API_VERSION}/login`,
    config: {
      cors: true,
      validate: signinValidator,
    },
    handler: loginHandler,
  },
  {
    method: "POST",
    path: `${API_VERSION}/signup`,
    config: {
      cors: true,
      validate: signupValidator,
    },
    handler: signupHandler,
  },
  {
    method: "POST",
    path: `${API_VERSION}/validateToken`,
    config: {
      cors: true,
    },
    handler: validateToken,
  },
  {
    method: "GET",
    path: `${API_VERSION}/user/{id}`,
    config: {
      cors: true,
      validate: userIdValidator,
    },
    handler: getUserDetails,
  },
];
