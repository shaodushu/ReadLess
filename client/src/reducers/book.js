import {
  BOOK_RECENT_UPDATE,
  BOOK_ALL_CHAPTER,
  BOOK_DETAIL,
  BOOK_SEARCH
} from '../constants/book'

const INITIAL_STATE = {

  book: {
    url: '',
    title: '',
    recentChapter: [],
    allChapter: [],
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
          book: {
            ...state.book,
            recentChapter: action.payload
          }
        }
      }
    case BOOK_ALL_CHAPTER:
      {
        return {
          ...state,
          book: {
            ...state.book,
            allChapter: action.payload
          }
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
        if (content.length <= 0) {
          content = state.book.content
        } else {
          content = state.book.content.slice(Math.floor(state.book.content.length / 2)).concat(content)
        }
        return {
          ...state,
          book: {
            ...state.book,
            url,
            title: title[title.length - 1],
            content
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
