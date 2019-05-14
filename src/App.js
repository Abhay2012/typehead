import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const SUGGESTIONS = [{ "value_show": "open", "function_name": "open" }, { "value_show": "high", "function_name": "high" }, { "value_show": "close", "function_name": "close" }, { "value_show": "low", "function_name": "low" }, { "value_show": "volume", "function_name": "volume" }, { "value_show": "sma(,)", "function_name": "simple moving average" }, { "value_show": "bb(,)", "function_name": "bollinger band" }, { "value_show": "macd( )", "function_name": "moving average convergence divergence" }, { "value_show": "ema( , )", "function_name": "exponential moving average" }, { "value_show": "rsi( )", "function_name": "relative strength index" }, { "value_show": "sum( , )", "function_name": "sum" }, { "value_show": "mean( , )", "function_name": "mean" }, { "value_show": "median( , )", "function_name": "median" }, { "value_show": "mode( , )", "function_name": "mode" }, { "value_show": "min( , )", "function_name": "minimum" }, { "value_show": "max( , )", "function_name": "maximum" }, { "value_show": "std( , )", "function_name": "standard deviation" }, { "value_show": "skew( , )", "function_name": "skewness" }, { "value_show": "kurt( , )", "function_name": "kurtosis" }, { "value_show": "rank( , )", "function_name": "rank" }, { "value_show": "cov( , , )", "function_name": "covariance" }, { "value_show": "corr( , ,)", "function_name": "correlation" }, { "value_show": "scale( , )", "function_name": "scale" }, { "value_show": "autocorr( , , )", "function_name": "autocorrelation" }, { "value_show": "buy_price", "function_name": "buy_price" }, { "value_show": "current_price", "function_name": "current_price" }, { "value_show": "trading_cost", "function_name": "trading_cost" }, { "value_show": "diff( , )", "function_name": "difference" }, { "value_show": "delay( , )", "function_name": "delay" }, { "value_show": "cwh( , , )", "function_name": "cup with handle indicator" }, { "value_show": "dtr( , , , )", "function_name": "double top reversal" }, { "value_show": "dbr( , , , )", "function_name": "double bottom reversal" }, { "value_show": "rb( , )", "function_name": "rounding bottom indicator" }, { "value_show": "rw( , )", "function_name": "rising wedge indicator" }, { "value_show": "fw( , )", "function_name": "falling wedge indicator" }, { "value_show": "a_triangle( , )", "function_name": "ascending triangle indicator" }, { "value_show": "ipc( , )", "function_name": "increasing price channel" }, { "value_show": "dist_mean( , )", "function_name": "distance from mean" }, { "value_show": "norm_probability( , )", "function_name": "normal distributed function" }, { "value_show": "hurst( , )", "function_name": "hurst factor" }, { "value_show": "dpc( , )", "function_name": "decreasing price channel indicator" }, { "value_show": "vwap( )", "function_name": "volume weighted moving average" }, { "value_show": "tr()", "function_name": "true range indicator" }, { "value_show": "atr()", "function_name": "average true range indicator" }, { "value_show": "average_movement( , )", "function_name": "average movement indicator" }, { "value_show": "emv( )", "function_name": "ease of movement indicator" }, { "value_show": "force( )", "function_name": "force index indicator" }, { "value_show": "mfi( )", "function_name": "money flow index indicator" }, { "value_show": "obv( )", "function_name": "on balance volume indicator" }, { "value_show": "roc( , )", "function_name": "rate of change" }, { "value_show": "aaron_up( , )", "function_name": "aaron up indicator" }, { "value_show": "aaron_down( , )", "function_name": "aaron down indicator" }, { "value_show": "hist_profit()", "function_name": "profitability %" }, { "value_show": "pivot()", "function_name": "pivot" }, { "value_show": "support_first()", "function_name": "support_first" }, { "value_show": "support_second()", "function_name": "support_second" }, { "value_show": "support_third()", "function_name": "support_third" }, { "value_show": "resistance_first()", "function_name": "resistance_first" }, { "value_show": "resistance_second()", "function_name": "resistance_second" }, { "value_show": "resistance_third()", "function_name": "resistance_third" }, { "value_show": "get_value(,)", "function_name": "get_value" }, { "value_show": "open", "function_name": "open price" }, { "value_show": "sma(,)", "function_name": "sma" }, { "value_show": "bb(,)", "function_name": "bb" }, { "value_show": "macd()", "function_name": "macd" }, { "value_show": "ema(,)", "function_name": "ema" }, { "value_show": "rsi()", "function_name": "rsi" }, { "value_show": "std(,)", "function_name": "std" }, { "value_show": "cwh( , , )", "function_name": "cwh" }, { "value_show": "dtr( , , , )", "function_name": "dtr" }, { "value_show": "dist_mean(,)", "function_name": "dist_mean" }, { "value_show": "roc(,)", "function_name": "roc" }, { "value_show": "obv()", "function_name": "obv" }, { "value_show": "aaron_down(,)", "function_name": "aaron_down" }, { "value_show": "aaron_up(,)", "function_name": "aaron_up" }, { "value_show": "hist_profit()", "function_name": "hist_profit" }, { "value_show": "mfi()", "function_name": "mfi" }, { "value_show": "emv()", "function_name": "emv" }, { "value_show": "average_movement(,)", "function_name": "average_movement" }, { "value_show": "atr()", "function_name": "atr" }, { "value_show": "tr()", "function_name": "tr" }, { "value_show": "vwap()", "function_name": "vwap" }, { "value_show": "stoc_kd(n1)", "function_name": "stoc_kd" }, { "value_show": "dbr( , , , )", "function_name": "dbr" }, { "value_show": "rb( , )", "function_name": "rb" }, { "value_show": "rw( , )", "function_name": "rw" }, { "value_show": "fw( , )", "function_name": "fw" }, { "value_show": "a_triangle( , )", "function_name": "a_triangle" }, { "value_show": "ipc( , )", "function_name": "ipc" }, { "value_show": "dpc( , )", "function_name": "dpc" }, { "value_show": "conversion_line()", "function_name": "conversion_line" }, { "value_show": "base_line()", "function_name": "base_line" }, { "value_show": "leading_span_a()", "function_name": "leading_span_a" }, { "value_show": "leading_span_b()", "function_name": "leading_span_b" }, { "value_show": "lagging_span()", "function_name": "lagging_span" }, { "value_show": "ichimoku_long()", "function_name": "ichimoku_long" }, { "value_show": "ichimoku_short()", "function_name": "ichimoku_short" }, { "value_show": "ft_max(, ,)", "function_name": "ft_max" }, { "value_show": "ft_min(, ,)", "function_name": "ft_min" }, { "value_show": "cci()", "function_name": "cci" }, { "value_show": "supertrend(mul, n)", "function_name": "supertrend" }, { "value_show": "dema(,)", "function_name": "dema" }, { "value_show": "day_open()", "function_name": "day_open" }, { "value_show": "day_close()", "function_name": "day_close" }, { "value_show": "day_high()", "function_name": "day_high" }, { "value_show": "day_low()", "function_name": "day_low" }, { "value_show": "day_volume()", "function_name": "day_volume" }, { "value_show": "open_interest", "function_name": "open_interest" }];

class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isOpen: false,
			data: JSON.parse(JSON.stringify(SUGGESTIONS)),
			suggestions: JSON.parse(JSON.stringify(SUGGESTIONS)),
			selectedSuggestion: 0,
			value: "",
			filterValue: ""
		}
	}

	onChange = (event) => {
		event.persist();
		let value = event.target.value;
		
		this.setState({
			value
		})
		console.log(event);
	}

	onKeyUp = (event) => {
		event.persist();
		let { suggestions, selectedSuggestion, filterValue, value, data, isOpen } = this.state;
		let val = event.target.value, code = event.which, key = event.key;
		let inputElement = document.getElementById("test");

		if (code === 13) {
			
			let pos = this.getCaretPosition(inputElement);
			var fIndex = pos - filterValue.length;
			console.log(pos, fIndex);
			value = val.substring(0, fIndex) + suggestions[selectedSuggestion].value_show + val.substring(pos);
			filterValue = "";
			isOpen = false;
			selectedSuggestion = 0;
			event.preventDefault();
			console.log(pos);

		}
		else if (code === 8) {
			filterValue = filterValue.slice(0, filterValue.length - 1);
			suggestions = data.filter(item => item.function_name.toLowerCase().includes(filterValue.toLowerCase()));
			console.log("SPLICE", filterValue);
		} 
		else if ((code >= 65 && code <= 90) || (code >= 97 && code <= 122)) {

			filterValue += key;
			suggestions = data.filter(item => item.function_name.toLowerCase().includes(filterValue.toLowerCase()));
		
		} else if (code === 38 && selectedSuggestion > 0) {
			selectedSuggestion--;
		} else if (code === 40 && (selectedSuggestion + 1) < suggestions.length) {
			selectedSuggestion++;
		}else if (this.specialChars(key)){
			filterValue = "";
			isOpen = false;
		}

		this.setState({
			filterValue,
			suggestions,
			value,
			selectedSuggestion,
			isOpen
		})

		console.log(filterValue,
			// suggestions,
			value,
			selectedSuggestion)
		// console.log(event, value);
	}

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

	onListClick = (suggestion) => {
		console.log(suggestion);
	}

	specialChars(val) {
		return /^[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/.test(val);
	}

	onKeyDown(event) {
		let code = event.which;
		if(code === 38 || code === 40){
			event.preventDefault();
		}
	}

	render() {
		let openSuggestions = this.state.filterValue.trim();
		return (
			<div className="typeahead">
				<input id="test" 
					onKeyUp={this.onKeyUp}
					onKeyDown={this.onKeyDown} 
					onChange={this.onChange} 
					value={this.state.value} />
				{
					openSuggestions ?
						<ul>
							{

								this.state.suggestions.map((item, index) => {
									return (
										<li className={index == this.state.selectedSuggestion ? "selected" : ""} onClick={() => this.onListClick(item)}>
											{item.function_name}
										</li>
									)
								})
							}
						</ul> : null
				}
			</div>
		);
	}
}

export default App;
