const { API_VERSION } = require("../constants/constants");
const { loginHandler } = require("../controllers/userController");

exports.userRoutes = [
  {
    method: "POST",
    path: `${API_VERSION}/login`,
    config: {
      handler: loginHandler,
    },
  },
];
