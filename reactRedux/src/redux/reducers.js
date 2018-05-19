import { combineReducers } from 'redux'
import {
  ADD_TODO,
  TOGGLE_TODO,
  SET_VISIBILITY_FILTER,
  VisibilityFilters,
  MONITOR_ACTION
} from './actions.js'
const { SHOW_ALL } = VisibilityFilters

function visibilityFilter(state = SHOW_ALL, action) {
  console.log(" [visibilityFilter] [todos]  ...");
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}

function monitorReducer(state = 1, action) {
  console.log(" [monitor] [todos]  ...");
  switch (action.type) {
    case MONITOR_ACTION:
      return state+1;
    default:
      return state
  }
}

function todos(state = [], action) {
  console.log(" [reducer] [todos]  ...");
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state ,
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
  todos : todos,
  monitor : monitorReducer
})

export default todoApp