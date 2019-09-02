module.exports = class User {
    constructor(sName) {
        this.dBirth;
        this.sName = sName;
        this.bAdmin = false;
        this.subordinateArray = [];
        this.iR;
    }

    toString() {
        return 'User [dBirth=' + this.dBirth + ', sName=' + this.sName + ', bAdmin=' + this.bAdmin + ', subordinateArray='
            + this.subordinateArray + ', iRating=' + this.iR + ']';
    }
};
