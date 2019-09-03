const userAuthenticator = require('./user-authenticator');
const controller = require('./lib/controller');

module.exports = {
    authenticateUser: function (userName, password) {
        const user = userAuthenticator.login(userName, password);
        if (user == null) {
            controller.generateFailLoginResponse();
        } else {
            controller.generateSuccessLoginResponse(userName);
        }
    },
};
