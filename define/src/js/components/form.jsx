var React = require("react");
var Router = require("react-router");
var FormRow = require("./formrow.jsx");

var Form = React.createClass({
	getInitialState: function() {
		return {
			rows: [] 
		};
	},

	setRows: function(rows){
		this.setState({
			rows : rows
		});
	},

	getValues: function(){
		var ret = {}
		for (var i in this.state.rows){
			var row = this.state.rows[i]

			ret[row.key] = this.refs["row_"+i].getValue();
		}
		return ret;
	},

	render: function() {

		var rows = this.state.rows.map(function(row, index){
			return (
				<FormRow ref={"row_"+index} rowDescription={row}/>
			)
		})

		return (
			<form onSubmit={this.props.onSubmit}>
				<table>
					<tbody>
						{rows}
					</tbody>
				</table>
				<input type="submit"/>
			</form>
		);
	}
});

module.exports = Form;