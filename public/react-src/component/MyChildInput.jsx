/**
 * Created by bykj on 2016/5/3.
 */

var React = require('react');

module.exports = React.createClass({

    getInitialState: function () {
        var props = this.props;
        return (
        {
            margin: props.margin,
            type: props.type,
            value: props.value
        }
        )
    },

    _callAppMethod: function (e) {
        console.log('_callAppMethod');
        this.props.callAppMethod(e.target.name);
    },

    _handleMouseOver: function () {
        this.setState({margin: this.state.margin + 1});
    },

    _handleChange: function () {

    },

    render: function () {
        var state = this.state;
        console.log('render MyChildInput');
        return (
            <div style={{border:'green solid 2px',margin:state.margin+'px',padding:'6px'}}>
                <input name={state.value} margin={state.margin} type={state.type} value={state.value}
                       onChange={this._handleChange}
                       onClick={this._callAppMethod} onMouseOver={this._handleMouseOver}></input>
            </div>
        )
    }

});