/**
 * Created by bykj on 2016/5/4.
 */
var React = require('react');

module.exports = React.createClass({
    getInitialState: function () {
        var props = this.props;
        return ({
            width: props.style.width,
            height: props.style.height,
            backgroundColor: props.style.backgroundColor
        });
    },
    _callAppMethod2: function () {
        var props = this.props;
        props.callAppMethord2(props.style.backgroundColor);
    },
    _changeSize: function () {
        var state = this.state;
        var color = state.backgroundColor == 'red' ? 'black' : 'red';
        this.setState({width: state.width - 1, height: state.height - 1, backgroundColor: color});
    },
    render: function () {
        var state = this.state;
        console.log("renderChild1" + state);
        return (
            <div
                style={{width:state.width+"px", height: state.height+"px", backgroundColor: state.backgroundColor}}
                onClick={this._callAppMethod2} onMouseOver={this._changeSize}>
            </div>
        )
    }
});