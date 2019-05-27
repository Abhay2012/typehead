import React, { Component } from 'react';
import './App.css';
import Typehead from "./Typehead";

class App extends Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="appComp">
				<Typehead id="test" />
				<Typehead id="test1"/>
				<Typehead id="test2"/>
			</div>
		);
	}
}

export default App;
