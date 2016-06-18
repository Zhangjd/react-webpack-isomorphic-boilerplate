import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'


class Home extends React.Component {
	constructor(props){
		super(props)
	}

	render() {
		return (
			<div>

				Hello Wolrd

			</div>
		)
	}
}

//使用connect创建component，把dispatch和state传进ui component
export default connect(
	(state)=>({
	}),
	(dispatch)=>({
	})
)(Home)
