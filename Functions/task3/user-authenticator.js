const userService = require('./lib/user-service');
const sessionManager = require('./lib/session-manager');

const authenticator = {
    login: function (userName, password) {
        return authenticator.loginUser(userService.getUserByName(userName), password);
    },

    loginUser: function (user, password) {
        if (userService.isPasswordCorrect(user, password)) {
            sessionManager.setCurrentUser(user);
            return user;
        }
        return null;
    },
};

module.exports = authenticator;
