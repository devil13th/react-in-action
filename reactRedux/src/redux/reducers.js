import { combineReducers } from 'redux'
import {
  ADD_TODO,
  TOGGLE_TODO,
  SET_VISIBILITY_FILTER,
  VisibilityFilters
} from './actions.js'
const { SHOW_ALL } = VisibilityFilters

function visibilityFilter(state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}

function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ]
    case TOGGLE_TODO:
      return state.map((todo, index) => {
        if (index === action.index) {
          return Object.assign({}, todo, {
            completed: !todo.completed
          })
        }
        return todo
      })
    default:
      return state
  }
}

/**
 * 重点!!!!!!!!!!!!
 * 传递给combineReducer的是key-value 键值对，其中键表示传递到对应reducer的数据，
 * 也就是说：slice reducer中的state并不是全局state，而是state.articles/state.papers等数据。
 */
const todoApp = combineReducers({
  visibilityFilter : visibilityFilter,
  todos : todos
})

export default todoApp