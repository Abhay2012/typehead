import React, { Component } from "react";
import "./Typehead.css";

/**
 * @description Typehead Component
 * It takes following props
 * @param id - id for typehead input field
 * @param placeholder - placeholder for input field
 * @param suggestions - list of suggestions, with each suggestion of type {function_name: "", value_show: ""}
 * @param getInputValue - function which will get called on onBlur event for typehead input with input field value
 */
class Typehead extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isOpen: false,
			data: JSON.parse(JSON.stringify(this.props.suggestions)), // to get copy of suggestions
			suggestions: JSON.parse(JSON.stringify(this.props.suggestions)),
			selectedSuggestion: 0,
			value: "",
			filterValue: ""
		}
	}

	componentDidMount() {
		// to hide suggestions on clicking outside typehead container
		document.getElementsByTagName("body")[0].addEventListener("click", (ev) => {
			const container = document.getElementById(`container-${this.props.id}`);
			if (!container.contains(ev.target)) {
				this.setState({
					isOpen: false
				});
			}
		})
	}

	// onChange handler for typehead input
	onChange = (event) => {
		event.persist();
		let value = event.target.value;
		this.setState({
			value
		})
	}

	// on keyup event handler of typehead input
	onKeyUp = (event) => {
		event.persist();
		let { suggestions, selectedSuggestion, filterValue, value, data } = this.state;
		let code = event.which, key = event.key;
		const listItems = document.getElementsByClassName("typehead-suggestions-item");

		if(data.length < 1){
			return;
		}

		// if enter key is pressed
		if (code === 13) {
			this.selectOption(); // Add Selected Suggestion value to the input field
			event.preventDefault(); // Prevent onChange Event
			return;
		}
		else if (code === 8) { // if backspace key is clicked
			filterValue = filterValue.slice(0, filterValue.length - 1); // update filterValue
			suggestions = this.filterSuggestions(data, filterValue); // update suggestions list
		}
		else if ((code >= 65 && code <= 90)) { // if any alphabet key is pressed
			filterValue += key; // update filter value
			suggestions = this.filterSuggestions(data, filterValue); //update suggestions list
		}
		else if (code === 38 && selectedSuggestion > 0) { // Up key is Pressed and selected suggestion is not first suggestion from suggestions list
			selectedSuggestion--; // update selectedSuggestion
			listItems[selectedSuggestion].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
		}
		else if (code === 40 && (selectedSuggestion + 1) < suggestions.length) { // Down key is Pressed
			selectedSuggestion++;
			listItems[selectedSuggestion].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
		}
		else if (this.specialChars(key)) { // in case any special key pressed
			filterValue = "";
		}
		this.setState({
			filterValue,
			suggestions,
			value,
			selectedSuggestion,
		});
	}

	// to filter suggestions list as per filter value
	filterSuggestions(suggestion, filterValue) {
		return suggestion.filter(item => item.function_name.toLowerCase().includes(filterValue.toLowerCase()));
	}

	// to replace filter value with selectedOption value from the input field
	selectOption(cb) {
		let { suggestions, selectedSuggestion, filterValue, value } = this.state;
		let inputElement = document.getElementById(`${this.props.id}`);
		let val = inputElement.value;
		let pos = this.getCaretPosition(inputElement);
		var fIndex = pos - filterValue.length;
		value = val.substring(0, fIndex) + suggestions[selectedSuggestion].value_show + val.substring(pos);
		filterValue = "";
		selectedSuggestion = 0;
		this.setState({
			filterValue,
			suggestions,
			value,
			selectedSuggestion
		}, () => {
			if (cb) { // if callback provided call it after render
				cb();
			}
		});

	}

	// on click on list item of suggestions
	onListItemClick(index) {
		let inputElement = document.getElementById(`${this.props.id}`);
		let pos = this.getCaretPosition(inputElement);
		this.setState({
			selectedSuggestion: index
		}, () => {
			const newPos = this.getNewPosition(index, pos);
			this.selectOption(this.setCaretPosition.bind(this, inputElement, newPos));
		});
	}

	// to get new value for carot
	getNewPosition(index, currentPos){
		const item = this.state.suggestions[index];
		return currentPos - this.state.filterValue.length + item.value_show.length;
	}

	// to get caret position from the input field
	getCaretPosition(oField) {
		var iCaretPos = 0;
		if (document.selection) {
			oField.focus();
			var oSel = document.selection.createRange();
			oSel.moveStart('character', -oField.value.length);
			iCaretPos = oSel.text.length;
		} else if (oField.selectionStart || oField.selectionStart == '0') iCaretPos = oField.selectionStart;
		return iCaretPos;
	}

	// to set caret position
	setCaretPosition(elem, caretPos) {
		if (elem != null) {
			if (elem.createTextRange) {
				var range = elem.createTextRange();
				range.move('character', caretPos);
				range.select();
			}
			else {
				if (elem.selectionStart) {
					elem.focus();
					elem.setSelectionRange(caretPos, caretPos);
				}
				else
					elem.focus();
			}
		}
	}

	specialChars(val) {
		return /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/.test(val);
	}

	// key down event handler
	onKeyDown(event) {
		let code = event.which;
		if (code === 38 || code === 40) { // to prevent up down Keys default action of moving caret in begining and end of input field
			event.preventDefault();
		}
	}

	render() {
		let showSuggestions = this.state.filterValue.trim() && this.state.isOpen;
		return (
			<div id={`container-${this.props.id}`} className="typehead-container">
				<input 
					placeholder={this.props.placeholder}
					className="typehead-input"
					id={this.props.id}
					onFocus={(ev) => { this.setState({ isOpen: true }); }}
					onBlur={() => { this.props.getInputValue(this.state.value) }}
					onKeyUp={this.onKeyUp}
					onKeyDown={this.onKeyDown}
					onChange={this.onChange}
					value={this.state.value} />
				{
					showSuggestions ?
						<ul className="typehead-suggestions">
							{

								this.state.suggestions.map((item, index) => {
									return (
										<li key={index}
											onClick={this.onListItemClick.bind(this, index)}
											className={`typehead-suggestions-item ${index === this.state.selectedSuggestion ? "selected" : ""}`}>
											{item.function_name}
										</li>
									)
								})
							}
							{
								showSuggestions && this.state.suggestions.length == 0 ?
								<li className="typehead-suggestions-item">
									no suggestion available
								</li>: null
							}
						</ul> : null
				}
			</div>
		);
	}
}

export default Typehead;