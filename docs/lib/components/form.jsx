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

	removeRow: function(index){
		var rows = this.state.rows;
		rows[index] = undefined;
		this.setRows(rows);
		console.log(rows)
	},

	render: function() {
		var self = this;

		var rows = self.state.rows.map(function(row, index){
			return (
				<FormRow ref={"row_"+index} rowDescription={row} onRemoveRow={self.removeRow} index={index}/>
			)
		})

		return (
			<form onSubmit={self.props.onSubmit}>
				<table>
					<tbody>
						<tr>
						  <th>
						      <span>Key</span>
						  </th>
						  <th>
						      <span>Type</span>
						  </th> 
						  <th>
						      <span>Value</span>
						  </th>
						  <th>
						     
						  </th>
						</tr>
						{rows}
					</tbody>
				</table>
			</form>
		);
				// <input type="submit"/>
	}
});

module.exports = Form;