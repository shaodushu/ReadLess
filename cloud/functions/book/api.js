const CONFIG = require('./config')
const fly = require('./fly')

/**
 * 检索书籍
 * @param {String} title 
 */
const search = (title) => {
    return fly(CONFIG.SEARCH_URL + title)
}
/**
 * 最近更新
 * @param {String} url 
 */
const recentUpdate = (url) => {
    return fly(url)
}

/**
 * 书籍内容
 * @param {String} url 
 */
const searchDetail = (url) => {
    return fly(url)
}

module.exports = {
    search,
    recentUpdate,
    searchDetail
}