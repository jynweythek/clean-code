const { message } = require('./lib/constants');

const notificationLevel = {
    'info': 4,
    'critical': 1
}

module.exports = class CollectOrderService {
    constructor(readiness, notifier) {
        this.orderReadiness = readiness;
        this.orderNotifier = notifier;
    }

    submitOrder(order) {
        if (this.orderReadiness.isEligibleForCollection(order))
            this.orderNotifier.notifyCustomer(message.READY_FOR_COLLECT, notificationLevel.info);
        else
            this.orderNotifier.notifyCustomer(message.IMPOSSIBLE_TO_COLLECT, notificationLevel.critical);
    }

    setReadiness(orderReadiness) {
        this.orderReadiness = orderReadiness;
    }

    setNotifier(orderNotifier) {
        this.orderNotifier = orderNotifier;
    }
};
