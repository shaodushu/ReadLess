import {
  BOOK_RECENT_UPDATE,
  BOOK_ALL_CHAPTER,
  BOOK_DETAIL,
  BOOK_SEARCH
} from '../constants/book'

const INITIAL_STATE = {
  recentChapter: [],
  allChapter: [],
  book: {
    url: '',
    title: '',
    content: []
  },
  bookList: []
}

export default function book(state = INITIAL_STATE, action) {
  switch (action.type) {
    case BOOK_RECENT_UPDATE:
      {
        return {
          ...state,
          recentChapter: action.payload
        }
      }
    case BOOK_ALL_CHAPTER:
      {
        return {
          ...state,
          allChapter: action.payload
        }
      }
    case BOOK_DETAIL:
      {
        let {
          url,
          title,
          content
        } = action.payload
        title = title.split(' ')
        return {
          ...state,
          book: {
            url,
            title: title[title.length - 1],
            content: state.book.content.concat(content)
          }
        }
      }
    case BOOK_SEARCH:
      {
        return {
          ...state,
          bookList: action.payload
        }
      }
    default:
      return state
  }
}
