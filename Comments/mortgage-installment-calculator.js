const InvalidInputException = require('./lib/InvalidInputException');

/**
 * Returns calculated monthly payment amount
 * @param {number} principalAmount - Principal amount
 * @param {number} termInYear - Term of mortgage in years
 * @param {number} rate - Rate of interest
 * @returns {number} - Monthly payment amount
 */
exports.calculateMonthlyPayment = function (principalAmount, termInYear, rate) {
    //cannot have negative loanAmount, term duration and rate of interest
    if (principalAmount < 0 || termInYear <= 0 || rate < 0) {
        throw new InvalidInputException('Negative values are not allowed');
    }

    // Convert interest rate into a decimal - eg. 6.5% = 0.065
    rate /= 100;

    // convert term in years to term in months
    const termInMonth = termInYear * 12;

    //for zero interest rates
    if(rate === 0) return principalAmount/termInMonth;

    // convert into monthly rate
    const rateInMonth = rate / 12;

    return (principalAmount * rateInMonth) / (1 - Math.pow(1 + rateInMonth, -termInMonth));
}
