/**
 * Created by bykj on 2016/5/3.
 */

var React = require('react');
var MyChildInput = require('./MyChildInput.jsx');

module.exports = React.createClass({

    getInitialState: function () {
        var props = this.props;
        return (
        {
            data: props.myData, //{type: 'button',value: 'gogogo'}
            childData: props.myChildData
        }
        )
    },

    _handleChange: function () {

    },

    _callAppMethod: function (name) {
        this.props.callAppMethod(name);
    },
    _handleClick: function () {
        var state = this.state;
        var newpading = state.childData.margin + 1;
        var childData = [{
            margin: newpading,
            type: 'button',
            value: 'gogogo'
        }, {
            margin: newpading,
            type: 'button',
            value: 'gogogo'
        }];
        this.setState({childData: childData});
    },

    render: function () {
        console.log('render MyInput');
        var state = this.state;
        var self = this;
        var childInputs = state.childData.map(function (v, idx) {
            return (
            <MyChildInput key={idx} type={v.type} margin={v.margin} value={v.value}
                          callAppMethod={self._callAppMethod}/>
            )
        });

        var data = state.data;
        return (
            <div style={{border:'solid red 2px',minHeight:'130px',padding:data.padding+"px"}}>
                <input type={data.type} value={data.value} onChange={self._handleChange}
                       onClick={self._handleClick}></input>
                {childInputs}
            </div>
        )
    }

});