module.exports = class UserException extends Error {
    constructor(message) {
        super(message);
        this.name = 'UserException';
    }
};
