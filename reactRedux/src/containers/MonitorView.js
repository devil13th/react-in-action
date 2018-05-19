import { connect } from 'react-redux'
import Monitor from '../components/Monitor'
import store from '../redux/store'
import { MONITOR_ACTION } from '../redux/actions';
import {createMonitorAction} from '../redux/actions'
const mapStateToProps = (state, ownProps) => {
  console.log(" [mapStateToProps ][ monitor ] ... computed todos ....");
  return {
    monitor : state.monitor
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      console.log("Monitor --- ...");
      console.log(store.getState);
      dispatch(createMonitorAction(MONITOR_ACTION));
    }
  }
}

const MonitorView = connect(
  mapStateToProps,
  mapDispatchToProps 
)(Monitor)

export default MonitorView