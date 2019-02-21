import {
  BOOK_RECENT_UPDATE,
  BOOK_ALL_CHAPTER,
  BOOK_DETAIL,
  BOOK_SEARCH
} from '../constants/book'
import {
  API_BOOK_SEARCH,
  API_BOOK_RECENT_UPDATE,
  API_BOOK_ALL_CHAPTER,
  API_BOOK_DETAIL
} from '../constants/api'
import {
  createAction
} from '../libs/redux'

const TARGET_CLOUD_FUNCTION = 'book'
/**
 * 检索书籍
 * @param {*} payload
 */
export const dispatchSearch = payload => createAction({
  name: TARGET_CLOUD_FUNCTION,
  url: API_BOOK_SEARCH,
  type: BOOK_SEARCH,
  payload
})

/**
 * 最近更新
 * @param {*} payload
 */
export const dispatchRecentUpdate = payload => createAction({
  name: TARGET_CLOUD_FUNCTION,
  url: API_BOOK_RECENT_UPDATE,
  type: BOOK_RECENT_UPDATE,
  payload
})

/**
 * 全部章节
 * @param {*} payload
 */
export const dispatchAllChapter = payload => createAction({
  name: TARGET_CLOUD_FUNCTION,
  url: API_BOOK_ALL_CHAPTER,
  type: BOOK_ALL_CHAPTER,
  payload
})

/**
 * 书籍详情
 * @param {*} payload
 */
export const dispatchDetail = payload => {
  return createAction({
    name: TARGET_CLOUD_FUNCTION,
    url: API_BOOK_DETAIL,
    type: BOOK_DETAIL,
    cb: res => ({
      ...res,
      url: payload.url
    }),
    payload
  })
}
