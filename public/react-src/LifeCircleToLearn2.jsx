/**
 * Created by bykj on 2016/5/6.
 */
var React = require('react');
var ReactDOM = require('react-dom');
var Dialog = require('rc-dialog');
require('rc-dialog/assets/index.css');

var title = "My dialog";
// console.log(typeof style);
// console.log(style);

var style =
{
	width: 360,
	height: 360
};

var Comment = React.createClass({
	getInitialState: function () {
		return ({
			visible: false,
			center: false
		});
	},
	_closeDialog: function () {
		this.setState({visible: false});
	},
	_openDialog: function () {
		this.setState({visible: true});
	},
	center: function () {
		console.log("center");
		this.setState({
			center: true,
		});
	},
	render: function () {
		return (
			<div>
				<input type="button" value="openDialog" onClick={this._openDialog}/>
				<Dialog
					visible={this.state.visible}
					wrapClassName={'center'}
					animation="zoom"
					maskAnimation="fade"
					style={style}
					onClose={this._closeDialog}
					mousePosition={this.state.mousePosition}
					title={<div>第二个弹框</div>}
				>
					<label>
						我是一个Lable
					</label>
				</Dialog>
			</div>
		);
	}
});

var container = document.getElementById('app');
if (!container) {
	document.write('<div id="app"></div>');
}
ReactDOM.render(
	<Comment author="adasd" children="This is one comment">

	</Comment>,
	document.getElementById('app')
);

