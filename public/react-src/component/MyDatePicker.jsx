/**
 * Created by bykj on 2016/5/3.
 */


var React = require('react');

module.exports = React.createClass({

    getInitialState: function () {
        return (
        {
            optionsArr: []//{'value':"2013"}
        }
        )
    },
    _addYear: function (str) {
        var optionsArr = this.state.optionsArr;
        optionsArr.push({'value': str});
        this.setState({optionsArr: optionsArr});
    },

    render: function () {
        var self = this;
        var state = this.state;
        console.log(state.optionsArr);
        var options = state.optionsArr.map(function (str) {
            return React.createElement(
                "option",
                {
                    value: str,
                }
            );
        });
        return
        (<select>
            {options}
        </select>);
    }

});