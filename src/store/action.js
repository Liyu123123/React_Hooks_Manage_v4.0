const SET_OPENKEYS = 'SET_OPENKEYS'
const SET_AUTHARR = 'SET_AUTHARR'
const ADD_VISITIEDVIEWS = 'ADD_VISITIEDVIEWS'
const REMOVE_VISITIEDVIEWS = 'REMOVE_VISITIEDVIEWS'
export const setOpenkeys = (arr) => ({ type: SET_OPENKEYS, openKeys: arr })
export const setAuthArr = (arr) => ({ type: SET_AUTHARR, authArr: arr })
export const addVisitiedViews = (o) => ({
  type: ADD_VISITIEDVIEWS,
  visitedObj: o
})

export const removeVisitiedViews = (o) => ({
  type: REMOVE_VISITIEDVIEWS,
  visitedObj: o
})
