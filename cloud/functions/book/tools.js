const cheerio = require('cheerio')

/**
 * 小说列表
 * @param {*} body 
 */
const booksList = function (body) {
    let $ = cheerio.load(body),
        list = [];
    $('.search-list li .s2').find('a').each(function (i, e) {
        list.push({
            title: Trim($(e).text(), 'g'),
            url: $(e).attr('href')
        })
    });
    return list
}


/**
 * 小说最近更新目录
 * @param {*} body 
 */
const booksRecentChapter = function (body) {
    let $ = cheerio.load(body),
        list = [];
    $('#list dl dt:first-child').nextUntil("dt").find('a').each(function (i, e) {
        list.push({
            title: Trim($(e).text(), 'g'),
            url: $(e).attr('href')
        })
    });
    return list
}

/**
 * 小说详情
 * @param {*} body 
 */
const booksDetail = function (body) {
    let $ = cheerio.load(body);
    return $('#content').text()
}

/**
 * 
 * 去除所有空格
 * @param {any} str 
 * @param {any} is_global 
 * @returns 
 */
const Trim = function (str, is_global) {

    let result = str.replace(/(^\s+)|(\s+$)/g, "");
    if (is_global.toLowerCase() == "g") {
        result = result.replace(/\s/g, "");
    }
    return result;
}

module.exports = {
    booksList,
    booksRecentChapter,
    booksDetail
}