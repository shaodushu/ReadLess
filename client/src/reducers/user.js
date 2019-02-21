import {
  USER_INFO,
  USER_LOGIN,
  USER_AUTH,
  USER_RECORD_LOG
} from '../constants/user'

const INITIAL_STATE = {
  userInfo: {},
  auth: true,
  recordLog: []
}
export default function user(state = INITIAL_STATE, action) {
  switch (action.type) {
    case USER_LOGIN:
      {
        return {
          ...state,
          userInfo: action.payload
        }
      }
    case USER_INFO:
      {
        return {
          ...state,
          userInfo: action.payload
        }
      }

    case USER_AUTH:
      {
        return {
          ...state,
          auth: action.payload
        }
      }
    case USER_RECORD_LOG:
      {
        return {
          ...state,
          recordLog: action.payload
        }
      }
    default:
      return state
  }
}
