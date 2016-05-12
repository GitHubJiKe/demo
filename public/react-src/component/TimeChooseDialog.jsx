/**
 * Created by bykj on 2016/5/5.
 */
var React = require('react');
var ReactDOM = require('react-dom');
var Modal = require('react-modal');

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};
var innerHTMLs = [1, 2, 3, 4, 5, 6,
    7, 8, 9, 10, 11, 12];
var App = React.createClass({
    getInitialState: function () {
        return {
            modalIsOpen: false,
            value: '',
            yearsOptions: [],
            monthsOptions: [],
            daysOptions: []
        };
    },
    openModal: function () {
        this.getYearsOptions();
        this.getMonthsOptions();
        this.getDefaultDaysOptions();
        this.setState({modalIsOpen: true});
    },

    afterOpenModal: function () {
        // references are now sync'd and can be accessed.
        this.refs.subtitle.style.color = '#f00';
    },

    // closeModal: function () {
    //     this.setState({modalIsOpen: false});
    // },
    getYearsOptions: function () {
        var years = [];
        var date = new Date();
        var currentYear = parseInt(date.getFullYear());
        var backYear = currentYear - 10;
        var fronYear = backYear + 11;
        while (backYear <= fronYear) {
            years.push(backYear);
            backYear = backYear + 1;
        }
        this.setState({yearsOptions: years});
        this.setState({daysOptions: this.getDays(this.getSumDay())});
    },
    getMonthsOptions: function () {
        var monthsOptions = [];
        innerHTMLs.forEach(function (month) {
            monthsOptions.push(month);
        });
        this.setState({monthsOptions: monthsOptions});
    },
    isLeapYear: function (year) {
        if (year % 400 !== 0 && year % 4 !== 0) {
            return false;
        } else {
            return true;
        }
    },
    isFebruary: function (month) {
        if (month == 2) {
            return true;
        } else {
            return false;
        }
    },
    getDays: function (sumDays) {
        var days = [];
        for (var i = 1; i <= sumDays; i++) {
            days.push(i);
        }
        return days;
    },
    getSumDay: function () {
        var year;
        var month;
        var yearSelect = document.getElementById('yearSelect');
        var monthSelect = document.getElementById('monthSelect');
        if (yearSelect == null) {
            year = this.getDefaultSelectYear();
        } else {
            var yearSelectIndex = yearSelect.selectedIndex;
            year = yearSelect.options[yearSelectIndex].value;
        }
        console.log("year=======" + year);
        if (monthSelect == null) {
            month = this.getDefaultSelectMonth();
        } else {
            var monthSelectIndex = monthSelect.selectedIndex;
            month = monthSelect.options[monthSelectIndex].value;
        }
        console.log("month=======" + month);
        switch (parseInt(month)) {
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:
                return 31;
                break;
            case 2:
                if (this.isLeapYear(parseInt(year))) {
                    return 29;
                } else {
                    return 28;
                }
                break;
            case 4:
            case 6:
            case 8:
            case 9:
            case 11:
                return 30;
                break;
        }
    },
    getDaysOptions: function () {
        this.setState({daysOptions: this.getDays(this.getSumDay())});
    },
    getDefaultDaysOptions: function () {
        var days = [];
        days = this.getDays(31);
        this.setState({daysOptions: days});
    },
    getDefaultSelectYear: function () {
        return parseInt(new Date().getFullYear());
    },
    getDefaultSelectMonth: function () {
        return parseInt(new Date().getMonth()) + 1;
    },
    getDefaultSelectDay: function () {
        return parseInt(new Date().getDay()) + 1;
    },
    setChoosedDate: function () {
        var yearSelect = document.getElementById('yearSelect');
        var monthSelect = document.getElementById('monthSelect');
        var daySelect = document.getElementById('daySelect');
        var yearSelectIndex = yearSelect.selectedIndex;
        var monthSelectIndex = monthSelect.selectedIndex;
        var daySelectIndex = daySelect.selectedIndex;
        var chooseDate = yearSelect.options[yearSelectIndex].value
            + "-" + monthSelect.options[monthSelectIndex].value
            + "-" + daySelect.options[daySelectIndex].value;
        this.setState({modalIsOpen: false, value: chooseDate});
    },

    render: function () {
        var state = this.state;
        var yearsOptions = state.yearsOptions.map(function (year, idx) {
            return (<option key={idx} value={year}>
                {year}
            </option>);
        });
        var monthsOptions = state.monthsOptions.map(function (month, idx) {
            return (<option key={idx} value={month}>
                {month}
            </option>);
        });
        var daysOptions = state.daysOptions.map(function (day, idx) {
            return (<option key={idx} value={day}>
                {day}
            </option>);
        });
        return (
            <div>
                <input onClick={this.openModal} type="text" value={this.state.value} placeholder="请选择日期："></input>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    // onRequestClose={this.closeModal} 如果希望点击外部关闭，添加这行代码
                    style={customStyles}>
                    <h2 ref="subtitle">选择日期</h2>
                    <span>年：</span>
                    <select id="yearSelect" name="yearSelect" style={{width:'100px'}}
                            defaultValue={this.getDefaultSelectYear()} onChange={this.getDaysOptions}>
                        {yearsOptions}
                    </select>
                    <span>月：</span>
                    <select id="monthSelect" name="monthSelect" style={{width:'100px'}}
                            defaultValue={this.getDefaultSelectMonth()} onChange={this.getDaysOptions}>
                        {monthsOptions}
                    </select>
                    <span>日：</span>
                    <select id="daySelect" name="daySelect" style={{width:'100px'}}
                            defaultValue={this.getDefaultSelectDay()}>
                        {daysOptions}
                    </select>
                    <p/>
                    <button onClick={this.setChoosedDate}>确定</button>
                </Modal>
            </div>
        );
    }
});


var container = document.getElementById('app');
if (!container) {
    document.write('<div id="app"></div>');
}

ReactDOM.render(
    <App />,
    document.getElementById('app')
);