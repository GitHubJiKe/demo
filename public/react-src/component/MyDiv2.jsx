/**
 * Created by bykj on 2016/5/4.
 */
var React = require('react');
var MyDiv1 = require('./MyDiv1.jsx');
module.exports = React.createClass({
    getInitialState: function () {
        var props = this.props;
        return ({
            myStyle: props.myStyle,
            childStyle: props.childStyle
        });
    },
    _callAppMethord: function () {
        var props = this.props;
        props.callAppMethord(props.myStyle.backgroundColor);
    },
    _callAppMethod2: function (color) {
        this.props.callAppMethord(color);
    },
    _changeChildColor: function () {
        var newChildStyle = [{
            width: 80,
            height: 23,
            backgroundColor: 'black'
        }, {
            width: 80,
            height: 23,
            backgroundColor: 'black'
        }];
        this.setState({childStyle: newChildStyle});
    },
    render: function () {
        var self = this;
        var state = this.state;
        var childDivs = state.childStyle.map(function (v, idx) {
            console.log('parent' + v.width);
            return (<MyDiv1 key={idx} style={{width:v.width ,
                height:v.height,backgroundColor:v.backgroundColor}} callAppMethord2={self._callAppMethod2}/>
            )
        });
        var myStyle = state.myStyle;
        return (
            <div
                style={{width:myStyle.width+"px",height:myStyle.height+"px",backgroundColor:myStyle.backgroundColor}}
                onClick={self._callAppMethord}>
                {childDivs}
            </div>)

    }
});