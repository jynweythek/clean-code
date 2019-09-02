module.exports = class CustomerContactServiceImpl {
    constructor(customerContactDAO) {
        this.customerContactDAO = customerContactDAO;
    }

    findCustomerContactDetailsByCustomerId(customerId) {
        return this.customerContactDAO.findById(customerId);
    }

    updateCustomerContactDetails(customerContactDetails) {
        this.customerContactDAO.update(customerContactDetails);
    }
};
