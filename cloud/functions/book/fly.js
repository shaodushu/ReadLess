const superagent = require("superagent");
/**
 * Request
 * @param {String} url 请求地址
 * @param {String} method 请求方法
 * @param {Object} options 请求参数
 */
const fly = function (url, method = 'get', options = {}) {
    return new Promise((resolve, reject) => {
        superagent[method](url).send(options).end(function (err, res) {
            if (err) {
                reject(err);
                return;
            }
            resolve(res);
        });
    });
}
module.exports = fly