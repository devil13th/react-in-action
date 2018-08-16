import React from 'react';
import { Button } from 'antd';


class Bton extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Button
        size={this.props.btonSize}
        type={this.props.btonType}
        onClick={this.props.onBtonClick}
      > click me to change size</Button>
    )
  }
}


export { Bton as Bton }