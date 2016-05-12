/**
 * Created by bykj on 2016/5/3.
 */

var React = require('react');
var ReactDOM = require('react-dom');

var App = React.createClass({
    displayName: "App",

    getInitialState: function () {
        console.log("getInitialState");
        return {
            buttonArr: [] // {'id':'btn_1',value:60,enabled:true}
        };
    },

    _addTimerButton: function () {
        var buttonArr = this.state.buttonArr;
        buttonArr.push({'id': 'btn_' + buttonArr.length, value: 60, enabled: true});
        this.setState({buttonArr: buttonArr});
    },

    _startTimer: function (e) {
        var self = this;
        var refName = e.target.name; // btn_

//            (function (refName) {
//            })(refName);

        var timerRef = setInterval(function () {
            console.log(refName);
            var btnViewRef = self.refs[refName];
            var value = btnViewRef.value;
            var newValue = parseInt(value) - 1;
            var btnIdx = refName.split('_')[1];
            var btnArr = self.state.buttonArr;
            var btnStateRef = btnArr[btnIdx];
            btnStateRef.value = newValue;

            if (btnStateRef.enabled) {
                btnStateRef.enabled = false;
            }

            if (newValue <= 55) {
                clearInterval(timerRef);
                btnStateRef.enabled = true;
                btnStateRef.value = '60';
            }
            self.setState({buttonArr: btnArr});
        }, 1000);

    },

    render: function render() {
        var self = this;
        var state = this.state;
        console.log(state.buttonArr);
        var buttonsView = state.buttonArr.map(function (v, idx) {
            var btn = '';
            console.log(v.enabled, v.value);
            if (v.enabled) {
                btn = React.createElement("input", {
                    ref: v.id,
                    name: v.id,
                    type: "button",
                    value: v.value,
                    onClick: self._startTimer
                });
            } else {
                btn = React.createElement("input", {
                    ref: v.id,
                    name: v.id,
                    type: "button",
                    value: v.value,
                    disabled: "true",
                    onClick: self._startTimer
                });
            }

            return React.createElement(
                "p",
                {key: idx},
                btn
            );
        });
        var leftDiv = React.createElement(
            "div",
            {style: {border: 'solid red 1px', float: 'left', minWidth: '500px', minHeight: '600px'}},
            buttonsView
        );
        var rightDiv = React.createElement(
            "div",
            {style: {border: 'solid blue 1px', float: 'left', minWidth: '200px', minHeight: '600px'}},
            React.createElement("input", {
                id: "button1",
                type: "button",
                value: "生成倒计时按钮",
                onClick: this._addTimerButton
            })
        );

        console.log("render");
        return React.createElement(
            "div",
            {style: {border: 'solid red 1px'}},
            leftDiv,
            rightDiv
        );
    }
});

var container = document.getElementById('app');
if(!container){
    document.write('<div id="app"></div>');
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);