const AGE = 60;
const INTEREST_PERCENT = 4.5;
const SENIOR_PERCENT = 5.5;
const BONUS_AGE = 13;

function calcDifference(start, end) {
    const diffYear = end.getFullYear() - start.getFullYear();

    if (end.getMonth() < start.getMonth()) {
        return diffYear - 1;
    }
    if (end.getMonth() === start.getMonth() && end.getDate() < start.getDate()) {
        return diffYear - 1;
    }

    return diffYear;
}

function durationBetweenDatesInYears(from, to) {
    const start = new Date(from);
    const end = new Date(to);

    calcDifference(start, end);
}

function durationSinceStartDateInYears(startDate) {
    const start = new Date(startDate);
    const end = new Date();

    calcDifference(start, end);
}

function isAccountStartedAfterBonusAge(accountDetails) {
    return durationBetweenDatesInYears(accountDetails.getSetDetail(['birth']), accountDetails.getSetDetail(['startDate'])) > BONUS_AGE;
}

function interest(accountDetails) {
    let interest = 0;
    if (isAccountStartedAfterBonusAge(accountDetails)) {
        if (AGE <= accountDetails.getSetDetail(['age'])) {
            //interest = (PrincipalAmount * DurationInYears * AnnualInterestRate) / 100
            interest = accountDetails.getSetDetail(['balance'])
                    * durationSinceStartDateInYears(accountDetails.getSetDetail(['startDate'])) * SENIOR_PERCENT / 100;
        } else {
            interest = accountDetails.getSetDetail(['balance']).doubleValue()
                    * durationSinceStartDateInYears(accountDetails.getSetDetail(['startDate'])) * INTEREST_PERCENT / 100;
        }
    }
    return interest;
}

function calculateInterest(accountDetails) {
    if (isAccountStartedAfterBonusAge(accountDetails)) {
        return interest(accountDetails);
    } else {
        return 0;
    }
}

module.exports = {
    calculateInterest,
};
