/**
 * Created by bykj on 2016/5/3.
 */

var React = require('react');
var ReactDOM = require('react-dom');

var App = React.createClass(
    {
        getInitialState: function () {
            console.log("getInitialState");
            return {
                buttonArr: []// ['id':'btn_1','value':'按钮']
            };
        },
        _addTimerButton: function () {
            var buttonArr = this.state.buttonArr;
            buttonArr.push({'id': 'btn_' + buttonArr.length, 'value': '按钮'});
            this.setState({buttonArr: buttonArr});
        },
        _changeValue: function _changeValue(e) {
            var refName = e.target.name;
            (function (refName) {
                var btnViewRef = self.refs[refName];
                var value = btnViewRef.value;
                var newValue = '你好';
                var btnIdx = refName.split('_')[1];
                var btnArr = self.state.buttonArr;
                var btnStateRef = btnArr[btnIdx];
                btnStateRef.value = newValue;
                self.setState({buttonArr: btnArr});
            })(refName);

        },

        render: function () {
            var self = this;
            var state = this.state;
            console.log(state.buttonArr);
            var buttonsView = state.buttonArr.map(function (v, idx) {
                return React.createElement(
                    "input",
                    {
                        ref: v.id,
                        id: idx,
                        name: v.id,
                        value: v.value,
                        onClick: self._changeValue
                    }
                );
            });
            var leftDiv = (
                <div style={{border:'solid red 1px',float:'left',minWidth:'500px',minHeight:'600px'}}>
                    {buttonsView}
                </div>
            );
            var rightDiv = (
                <div style={{border:'solid blue 1px',float:'left',minWidth:'200px',minHeight:'600px'}}>
                    <input id="button1" type="button" value="生成倒计时按钮" onClick={this._addTimerButton}/>
                </div>
            );

            console.log("render");
            return (
                <div style={{border:'solid red 1px'}}>
                    {leftDiv}
                    {rightDiv}
                </div>
            );
        }
    }
);

ReactDOM.render(
    <App />,
    document.getElementById('app')
);