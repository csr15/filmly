const { API_VERSION } = require("../constants/constants");
const {
  loginHandler,
  signupHandler,
  validateToken,
  getUserDetails,
} = require("../controllers/userController");

exports.userRoutes = [
  {
    method: "POST",
    path: `${API_VERSION}/login`,
    config: {
      cors: true,
    },
    handler: loginHandler,
  },
  {
    method: "POST",
    path: `${API_VERSION}/signup`,
    config: {
      cors: true,
    },
    handler: signupHandler,
  },
  {
    method: "GET",
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
    },
    handler: getUserDetails,
  },
];
