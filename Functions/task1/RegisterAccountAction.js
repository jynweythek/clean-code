const WrongAccountNameException = require('./lib/WrongAccountNameException');
const WrongPasswordException = require('./lib/WrongPasswordException');

module.exports = class RegisterAccountAction {
    constructor() {
        this.passwordChecker = null;
        this.accountManager = null;
    }

    register(account) {
        if (account.name.length <= 5) {
            throw new WrongAccountNameException(account.name);
        }
        const password = account.password;
        if (password.length <= 8) {
            if (this.passwordChecker.validate(password) !== this.passwordChecker.result.OK) {
                throw new WrongPasswordException();
            }
        }
        this.accountManager.setCreatedDate(account);
        this.accountManager.createNewAccount(account);
    }

    setAccountManager(accountManager) {
        this.accountManager = accountManager;
    }

    setPasswordChecker(passwordChecker) {
        this.passwordChecker = passwordChecker;
    }

    setAddresses(account, addresses) {
        addresses.add(account.getHomeAddress());
        addresses.add(account.getWorkAddress());
        addresses.add(account.getAdditionalAddress());
    }
};
