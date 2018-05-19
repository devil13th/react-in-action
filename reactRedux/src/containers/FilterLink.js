import { connect } from 'react-redux'
import { setVisibilityFilter } from '../redux/actions'
import Link from '../components/Link'
import store from '../redux/store'
const mapStateToProps = (state, ownProps) => {
  console.log(" [mapStateToProps ][ FilterLink ] ... computed todos ....");
  return {
    active: ownProps.filter === state.visibilityFilter
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {

      console.log(dispatch === store.dispatch);
      dispatch(setVisibilityFilter(ownProps.filter))
    }
  }
}

const FilterLink = connect(
  mapStateToProps,
  mapDispatchToProps 
)(Link)

export default FilterLink