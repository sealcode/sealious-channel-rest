var React = require("react");
var Router = require("react-router");

var FormRow = React.createClass({
	getInitialState: function() {
		return {
			key: "",
			type: "",
			value: ""
		};
	},
	componentDidMount: function() {
		var row = this.props.rowDescription;

		this.setState({
			key: row.key,
			type: row.type,
			value: row.value
		});
	},

	getValue: function(){
		return this.state.value;
	},

	changeAttributeValue: function(attribute_name){
		return function(event){
			var obj = {};
			obj[attribute_name] = event.target.value;
			this.setState(obj);
		}.bind(this);
	},

	render: function() {
		var row = this.props.rowDescription;

		return (
			<tr>
				<td>
					<input value={this.state.key} onChange={this.changeAttributeValue("key")}/>
				</td>
				<td>
					<select value={this.state.type} onChange={this.changeAttributeValue("type")}>
						<option value="text">text</option>
						<option value="file">file</option>
					</select>
				</td>
				<td>
					<input type={this.state.type} value={this.state.value} onChange={this.changeAttributeValue("value")}/>
				</td>
			</tr>
		);
	}
});

module.exports = FormRow;