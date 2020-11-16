const UserException = require('./UserException.js');

module.exports = class UserReportController {
    constructor() {
        this.userReportBuilder = null;
    }

    getUserTotalOrderAmountView(userId, model) {
        const totalMessage = this.getUserTotalMessage(userId);
        if (!totalMessage) {
            throw new UserException('technicalError')
        }
        model.addAttribute('userTotalMessage', totalMessage);

        return 'userTotal';
    }

    getUserTotalMessage(userId) {
        const amount = this.userReportBuilder.getUserTotalOrderAmount(userId);

        if (amount == null)
            return null;

        if (amount === -1)
            throw new UserException('WARNING: User ID doesn\'t exist.')
        if (amount === -2)
            throw new UserException('WARNING: User have no submitted orders.')
        if (amount === -3)
            throw new UserException('ERROR: Wrong order amount.')

        return `User Total: ${amount}$`;
    }

    getUserReportBuilder() {
        return this.userReportBuilder;
    }

    setUserReportBuilder(userReportBuilder) {
        this.userReportBuilder = userReportBuilder;
    }
}
