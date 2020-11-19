module.exports = {
    changeToMidnight: (date, changer) => {
        const newDate = new Date(date.getTime());

        newDate.setDate(newDate.getDate() + (changer ? 1 : -1));
        newDate.setHours(0);

        return newDate;
    },
};
