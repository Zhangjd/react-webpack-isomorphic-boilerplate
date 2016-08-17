import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

class Home extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    console.log(this.props.state)
    return (
      <div>Hello World</div>
    )
  }
}

//使用connect创建component，把dispatch和state传进ui component
export default connect(
  (state)=>({
    state: state
  }),
  (dispatch)=>({

  })
)(Home)
