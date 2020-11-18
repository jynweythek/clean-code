const HTTP = 'http://';
const EDITABLE = '/?edit=true';
const DOMAIN = 'mysite.com';

module.exports = class SitePage {
    constructor(siteGroup, userGroup) {
        this.siteGroup = siteGroup;
        this.userGroup = userGroup;
    }

    getEditablePageUrl(params) {
        return this.getBaseUrl() + this.getParamsString(params) + this.getGroups();
    }

    getBaseUrl() {
        return HTTP + DOMAIN + EDITABLE;
    }

    getParamsString(params) {
        let paramsString = '';

        if(params) {
            for (const [key, value] of params) {
                paramsString += '&' + key + '=' + value;
            }
        }

        return paramsString;
    }

    getGroups() {
        return '&siteGrp=' + this.siteGroup + '&userGrp=' + this.userGroup;
    }
};
