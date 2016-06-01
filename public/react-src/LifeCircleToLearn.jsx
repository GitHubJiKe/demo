/**
 * Created by bykj on 2016/5/6.
 */
var React = require('react');
var ReactDOM = require('react-dom');
var Dialog = require('rc-dialog');
require('rc-dialog/assets/index.css');
var MyControl = React.createClass({
	getInitialState() {
		return {
			visible: false,
			width: 800,
			height: 800,
			destroyOnClose: false,
			center: false,
		};
	},

	onClick(e) {
		this.setState({
			mousePosition: {
				x: e.pageX,
				y: e.pageY,
			},
			visible: true,
		});
	},

	onClose(e) {
		console.log(e);
		this.setState({
			visible: false,
		});
	},

	onDestroyOnCloseChange(e) {
		this.setState({
			destroyOnClose: e.target.checked,
		});
	},

	changeWidth() {
		this.setState({
			width: this.state.width === 800 ? 300 : 800,
		});
	},
	render() {
		var dialog;
		if (this.state.visible || !this.state.destroyOnClose) {
			const style = {
				width: this.state.width,
				height: this.state.height,
			};
			dialog = (
				<Dialog
					visible={this.state.visible}
					wrapClassName={'center'}
					animation="zoom"
					maskAnimation="fade"
					onClose={this.onClose}
					style={style}
					mousePosition={this.state.mousePosition}
					title={<div>第二个弹框</div>}
				>
					<input />
					<p>basic modal</p>
					<button onClick={this.changeWidth}>change width</button>
					<div style={{ height: 100 }}></div>
				</Dialog>
			);
		}
		return (
			<div style={{ width: '90%', margin: '0 auto' }}>
				<style>
					{
						`
            .center {
              display: flex;
              align-items: center;
              justify-content: center;
            }
            `
					}
				</style>
				<p>
					<button
						className="btn btn-primary"
						onClick={this.onClick}
					>
						show dialog
					</button>

					&nbsp;
					<label>destroy on close:
						<input
							type="checkbox"
							checked={this.state.destroyOnClose}
							onChange={this.onDestroyOnCloseChange}
						/>
					</label>
				</p>
				{dialog}
			</div>
		);
	},
});

var container = document.getElementById('app');
if (!container) {
	document.write('<div id="app"></div>');
}

ReactDOM.render(
	<div>
		<h2>ant-design dialog</h2>
		<MyControl />
	</div>,
	document.getElementById('app')
);
