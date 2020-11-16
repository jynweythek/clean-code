const assert = require('assert');

const UserReportController = require('../UserReportController');
const UserException = require('../UserException');
const UserReportBuilder = require('../UserReportBuilder');
const SubmittedOrderStub = require('./stubs/SubmittedOrderStub');
const AnotherSubmittedOrderStub = require('./stubs/AnotherSubmittedOrderStub');
const NotSubmittedOrderStub = require('./stubs/NotSubmittedOrderStub');
const SubmittedNegativeOrderStub = require('./stubs/SubmittedNegativeOrderStub');

describe('UserReportController', () => {
    const USER_ID = '123';
    let orders = [new SubmittedOrderStub(), new AnotherSubmittedOrderStub(), new NotSubmittedOrderStub()];
    let userReportController;
    let userReportBuilder;
    let model;

    const isNotExistUser = userId => userId !== USER_ID;
    const userMock = {
        getAllOrders: () => orders
    };
    const userDaoMock = {
        getUser: (userId) => {
            return isNotExistUser(userId) ? null : userMock;
        }
    };

    class ModelStub {
        constructor() {
            this.attributes = new Map();
        }

        addAttribute(name, s) {
            this.attributes.set(name, s);
        }

        getAttribute(name) {
            return this.attributes.get(name);
        }
    }

    before(() => {
        userReportController = new UserReportController();
        userReportBuilder = new UserReportBuilder();

        userReportController.setUserReportBuilder(userReportBuilder);
        userReportBuilder.setUserDao(userDaoMock);

        model = new ModelStub();
    });

    it('should calculate sum of all submitted orders', () => {
        const amount = userReportController.getUserTotalOrderAmountView('123', model);

        assert.strictEqual('userTotal', amount);
        assert.strictEqual('User Total: 363.15$', model.getAttribute('userTotalMessage'));
    });


    xit('should get warning message when user doesnt exist', () => {
        const amount = userReportController.getUserTotalOrderAmountView('0001', model);

        assert.strictEqual('userTotal', amount);
        assert.throws(() => new UserException("WARNING: User ID doesn\'t exist."), UserException, 'WARNING: User ID doesn\'t exist.');
    });

    xit('should get error message when order have negative amount', () => {
        orders.push(new SubmittedNegativeOrderStub());

        const amount = userReportController.getUserTotalOrderAmountView('123', model);

        assert.strictEqual('userTotal', amount);
        assert.throws(() => new UserException("ERROR: Wrong order amount."), UserException, 'ERROR: Wrong order amount.');
    });

    xit('should get warning message when user have no submitted orders', () => {
        orders = [];

        const amount = userReportController.getUserTotalOrderAmountView('123', model);

        assert.strictEqual('userTotal', amount);
        assert.throws(() => new UserException("WARNING: User have no submitted orders."), UserException, 'WARNING: User have no submitted orders.');
    });

    xit('should redirect to error page when connection to db is null', () => {
        userReportBuilder.setUserDao(null);

        const amount = userReportController.getUserTotalOrderAmountView('123', model);

        assert.throws(() => new UserException("technicalError"), UserException, 'technicalError');
    });
});
