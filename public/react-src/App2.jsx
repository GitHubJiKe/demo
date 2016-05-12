/**
 * Created by bykj on 2016/5/3.
 * webpack-dev-server --output-public-path 'D:/project/node/demo/public/dist/bundle'
 */

var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');

var MyDatePicker = require('./component/MyDatePicker.jsx');
var MyInput = require('./component/MyInput.jsx');
var MyComment = require('./component/MyComment.jsx');
var MyDiv2 = require('./component/MyDiv2.jsx');
var App = React.createClass(
    {
        getInitialState: function () {
            return (
            {
                myInputData: {
                    padding: 15,
                    type: 'button',
                    value: 'gogogo'
                },
                childInputsData: [
                    {
                        margin: 150,
                        type: 'button',
                        value: 'button1'
                    },
                    {
                        margin: 150,
                        type: 'button',
                        value: 'button2'
                    }
                ],
                myStyle: {
                    width: 1000,
                    height: 500,
                    backgroundColor: 'red'
                },
                childStyle: [
                    {
                        width: 800,
                        height: 230,
                        backgroundColor: 'blue'
                    }, {
                        width: 800,
                        height: 230,
                        backgroundColor: 'blue'
                    }
                ],
                disabled1: false,
                disabled2: false,
                years: [],
                months: [],
                days: []
            }
            );
        },

        /**
         * 用数据去驱动视图
         */
        _changeType: function (e) {
            var buttonType = e.target.selectedOptions[0].value;
            this.setState({buttonType: buttonType});
        },

        /**
         *  years.push(yearInput);
         this.setState({years: years});
         * @private
         */
        _addYear: function () {
            var years = this.state.years;
            var yearInput = document.getElementById('year').value;
            var isNotSame = true;
            if (years.length > 0) {
                var index = years.indexOf(yearInput);
                if (index == -1) {
                    years.push(yearInput);
                }
            } else {
                years.push(yearInput);
            }
            this.setState({years: years});

            // }
        },
        _addMonth: function (e) {
            var months = [];
            var disabled1 = e.target.disabled1;
            var innerHTMLs = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"];
            innerHTMLs.forEach(function (month) {
                months.push(month);
            });
            disabled1 = true;
            this.setState({disabled1: disabled1, months: months});

        },
        _addDay: function (e) {
            
            var days = [];
            var disabled2 = e.target.disabled2;
            var innerHTMLs = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
                "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31"];
            innerHTMLs.forEach(function (day) {
                days.push(day);
            });
            disabled2 = true;
            this.setState({disabled2: disabled2, days: days});
        },

        _handleChange: function () {

        },
        _callAppMethord: function (color) {
            console.log("颜色 = " + color);
        },

        _callMyMethod: function (componentName) {
            // this.setState({});
            console.log(componentName);
        },
        _callMyClick: function () {
        },

        render: function () {
            console.log('render App');
            var state = this.state;
            var self = this;
            // console.log('render app.jsx' + Date.now());

            var yearOptions = state.years.map(function (year, idx) {
                return (
                    <option key={idx} value={year} onChange={self._handleChange}>{year}</option>
                )
            });
            var monthOptins = state.months.map(function (month, idx) {
                return (
                    <option key={idx} value={month} onChange={self._handleChange}>{month}</option>
                )
            });
            var dayOptins = state.days.map(function (day, idx) {
                return (
                    <option key={idx} value={day} onChange={self._handleChange}>{day}</option>
                )
            });

            var mycomment = {author: "Pete Hunt", text: "This is one comment"};

            var leftDiv = (
                <div style={{border:'solid red 1px',float:'left',minWidth:'500px',minHeight:'600px'}}>
                    <input type={this.state.buttonType} defaultValue="按钮" id="myinput"/><br/>
                    <MyInput myData={state.myInputData} myChildData={state.childInputsData}/>
                    <span>年：</span>
                    <select id="selector1" name="selector1">
                        {yearOptions}
                    </select>

                    <span>月：</span>
                    <select id="selector3" name="selector3">
                        {monthOptins}
                    </select>
                    <span>日：</span>
                    <select id="selector4" name="selector4">
                        {dayOptins}
                    </select>
                </div>
            );
            var rightDiv = (
                <div style={{border:'solid blue 1px',float:'left',minWidth:'200px',minHeight:'600px'}}>
                    <form>
                        <span>选择button类型：</span>
                        <select id="selector" name="selector1" defaultValue="按钮" onChange={this._changeType}>
                            <option value="button">按钮</option>
                            <option value="text">文本</option>
                            <option value="checkbox">单选按钮</option>
                        </select>
                    </form>
                    <span>增加年份：</span>
                    <input type="text" id="year"/>
                    <input type="button" defaultValue="确定" onClick={this._addYear}/>
                    <p>增加月份：</p>
                    <input id="btn_addmonth" type="button" defaultValue="addMonth" disabled={this.state.disabled1}
                           onClick={this._addMonth}/>
                    <p>增加日期：</p>
                    <input id="btn_addday" type="button" defaultValue="addDay" disabled={this.state.disabled2}
                           onClick={this._addDay}/>
                </div>
            );
            return (
               /* <MyInput myData={state.myInputData} myChildData={state.childInputsData}
                         callAppMethod={this._callMyMethod} callAppClick={this._callMyClick}/>*/
                // <div style={{border:'solid red 2px'}}>
                //     {leftDiv}
                //     {rightDiv}
                // </div>
                <MyDiv2 myStyle={state.myStyle} childStyle={state.childStyle}
                        callAppMethord={this._callAppMethord}></MyDiv2>

            );
        }

    });

var container = document.getElementById('app');
if (!container) {
    document.write('<div id="app"></div>');
}

ReactDOM.render(
    <App />
    ,
    document.getElementById('app')
);