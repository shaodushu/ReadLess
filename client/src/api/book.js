import fly from '../libs/fly'

/**
 * 检索书籍
 * @param {*} title 
 */
export const search = (title) => {
  return fly('book', 'search', {
    title
  })
}

/**
 * 最近更新
 * @param {*} url 
 */
export const recentUpdate = (url) => {
  return fly('book', 'recentUpdate', {
    url
  })
}

/**
 * 全部章节
 * @param {*} url 
 */
export const allChapter = (url) => {
  return fly('book', 'allChapter', {
    url
  })
}

/**
 * 书籍详情
 * @param {*} url 
 */
export const detail = (url) => {
  return fly('book', 'detail', {
    url
  })
}
