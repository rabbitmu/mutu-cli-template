/**
 * Query String 读写
 */

export class QueryString {
    
    constructor(searchString) {
        this._searchString = searchString;
        this._query = {};

        let queryString = this._searchString.slice(1);
        let reg = /&?(\w+)=([^&]+)(?:$|&)/igm;

        while(reg.test(queryString)) {
            this._query[RegExp.$1] = RegExp.$2;
        };
    }

    get fullString() {
        return this._searchString +'&';
    }

    getValue(key) {
        return  decodeURIComponent(this._query[key]) || void 0;
    }

    setValue(key, value) {
        this._query[key] = encodeURIComponent(value);
    }

    serialize() {
        let queryString = [];

        for (let key in this._query) {
            if (this._query.hasOwnProperty(key)) {
                queryString.push(key + '=' + this._query[key]);
            }
        }

        return queryString.join('&');
    }
    getLastPathname() {
        let str = window.location.pathname;
        return str.substring(0, str.lastIndexOf('/') + 1);
    }
}

export default new QueryString(window.location.search);
