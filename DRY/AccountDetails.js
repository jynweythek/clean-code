module.exports = class AccountDetails {
    constructor(details) {
        for (let prop in details) {
            if (details.hasOwnProperty(prop)) {
                this[prop] = details[prop];
            }
        }
    }

    getSetDetail(prop, value) {
        if (arguments.length > 1) {
            this[prop] = value;
        }
        return this[prop];
    }

    doubleValue() {
        return this * 2;
    }
}
