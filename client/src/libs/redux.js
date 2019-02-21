/**
 * 适当封装 Redux，简化调用
 */
/* eslint-disable import/prefer-default-export */
import fly from './fly'

export function createAction(options) {
  const {
    name,
    url,
    payload,
    cb,
    type
  } = options

  return async (dispatch) => {
    if (name && url) {
      try {
        const res = await fly(name, url, payload)
        dispatch({
          type,
          payload: cb ? cb(res) : res
        })
        return res
      } catch (error) {}
    } else {
      dispatch({
        type,
        payload
      })
    }

  }
}
