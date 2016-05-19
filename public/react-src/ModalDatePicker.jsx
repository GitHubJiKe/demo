/**
 * Created by bykj on 2016/5/5.
 */
var React = require('react');
var Modal = require('react-modal');
var ReactDOM = require('react-dom');
var INPUT_WIDTH = 200;
var INPUT_HEIGHT = 20;
var FONT_SIZE = 18;
var YMD_INPUT_WIDTH = 150;
var YMD_INPUT_HEIGHT = 20;
var MODAL_WIDTH = 360;
var MODAL_HEIGHT = 400;
var YEAR_VIEW_TYPE = 1001;
var MONTH_VIEW_TYPE = 1002;
var DAY_VIEW_TYPE = 1003;

var customStyles = {
	content: {
		width: MODAL_WIDTH,
		height: MODAL_HEIGHT,
		textAlign: 'center',
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)'
	}
};

var DefaultcustomStyles = {
	formWidth: 360,
	scale: 1,
	inputBorderColor: 'black',
	inputFontColor: 'black',
	inputBgColor: 'white',
	mTitle: "选择日期",//字段标题
	mTitleFontColor: 'red',//字段标题颜色
	placeholder: "选择日期",
	yLabel: '年：',
	mLabel: '月：',
	dLabel: '日：',
	lableTextAlign: 'center',//标签文字的align
	fontColor: 'black', // 标签字体的颜色
	bgColor: '#FFEFDB', //字段的背景色
	borderColor: '#FFEFDB', //字段的边框色
	borderWidth: 1,//字段的边框粗细
	paddingTB: 8, //字段上下侧的页内边距
	pPaddingL: 0,
	pPaddingR: 0,
	cPaddingL: 0,
	cPaddingR: 0,
	labelCols: 10,
	labelRows: 1,
	labelBdColor: 'white',
	labelBgColor: 'white',
	labelFontColor: 'black',
	btnValue: "确定",
	btnWidth: 100,
	btnHeight: 40,
	btnBgColor: "blue",
	btnFontColor: "black"
};

var innerHTMLs = [1, 2, 3, 4, 5, 6,
	7, 8, 9, 10, 11, 12];

var DatePicker = React.createClass({

	getInitialState: function () {
		var props = this.props;
		var onDateConfirm = props.onDateConfirm;
		return {
			customStyles: props.customStyles ? props.customStyles : DefaultcustomStyles,
			onDateConfirm: onDateConfirm,
			modalIsOpen: false,
			yearmodalIsOpen: false,
			monthmodalIsOpen: false,
			daymodalIsOpen: false,
			selectorType: 'year', //year | month | day
			daysOptions: [],
			value: props.value || '',
			yearvalue: this._getDefaultSelectYear(),
			monthvalue: this._getDefaultSelectMonth(),
			dayvalue: this._getDefaultSelectDay()
		};
	},

	_openModal: function () {
		this.setState({modalIsOpen: true, daysOptions: this._getDefaultDaysOptions()});
	},

	/**
	 * 可以在此方法内渲染打开之后的数据
	 */
	_afterOpenModal: function () {
		this.refs.subtitle.style.color = '#f00';
	},

	_getYearsOptions: function () {
		var years = [];
		var date = new Date();
		var currentYear = parseInt(date.getFullYear());
		var backYear = currentYear - 10;
		var fronYear = backYear + 11;
		while (backYear <= fronYear) {
			years.push(backYear);
			backYear = backYear + 1;
		}
		return years;
	},

	_getMonthsOptions: function () {
		var monthsOptions = [];
		innerHTMLs.forEach(function (month) {
			monthsOptions.push(month);
		});
		return monthsOptions;
	},

	_isLeapYear: function (year) {
		if (year % 400 !== 0 && year % 4 !== 0) {
			return false;
		} else {
			return true;
		}
	},

	_isFerbruary: function (month) {
		if (parseInt(month) == 2) {
			return true;
		} else {
			return false;
		}
	},

	_getDays: function (sumDays) {
		var days = [];
		for (var i = 1; i <= sumDays; i++) {
			days.push(i);
		}
		return days;
	},

	_getDefaultSelectYear: function () {
		return parseInt(new Date().getFullYear());
	},

	_getDefaultSelectMonth: function () {
		return parseInt(new Date().getMonth()) + 1;
	},

	_getDefaultSelectDay: function () {
		return parseInt(new Date().getDay()) + 1;
	},

	_getSelectYear: function () {
		return this.refs.yearSelect.value;
	},

	_getSelectMonth: function () {
		return this.refs.monthSelect.value;
	},

	_getSelectDay: function () {
		return this.refs.daySelect.value;
	},

	_getSumDay: function (myyear, mymonth) {
		switch (parseInt(mymonth)) {
			case 1:
			case 3:
			case 5:
			case 7:
			case 8:
			case 10:
			case 12:
				return 31;
			case 2:
				if (this._isLeapYear(parseInt(myyear))) {
					return 29;
				} else {
					return 28;
				}
			case 4:
			case 6:
			case 8:
			case 9:
			case 11:
				return 30;
		}
	},

	_getDefaultDaysOptions: function () {
		return this._getDays(31);
	},

	_setChoosedDate: function () {
		var year = this._getSelectYear();
		var month = this._getSelectMonth();
		var day = this._getSelectDay();
		var chooseDate = year
			+ "-" + month
			+ "-" + day;
		this.setState({modalIsOpen: false, value: chooseDate});
		if (this.props.onDateConfirm) {
			this.props.onDateConfirm(this, chooseDate);
		}
	},

	_openYearChooseDialog: function (e) {
		this.setState({yearmodalIsOpen: true});
	},

	_openMonthChooseDialog: function () {
		this.setState({monthmodalIsOpen: true});
	},

	_openDayChooseDialog: function (e) {
		this.setState({daymodalIsOpen: true, selectorType: 'day'});
	},

	_handleYearChooseValue: function (e) {
		var year = e.target.innerHTML;
		var month = this._getSelectMonth();
		var daysOptions = [];
		daysOptions = this._getDays(this._getSumDay(year, month));
		this._setAllState(YEAR_VIEW_TYPE, daysOptions, year, month);
	},
	/**
	 * @param dateType 点击的类型 year | month
	 */
	_setAllState: function (dateType, daysOptions, year, month) {
		var self = this;
		var dayValue = parseInt(self.refs.daySelect.value);
		if (dateType == YEAR_VIEW_TYPE) {
			if (this._isLeapYear(year)) {
				//是闰年，
				if (self._isFerbruary(month)) {
					//是二月份
					if (dayValue == 31) {
						//当前dayvalue ==31
						self.setState({
							yearmodalIsOpen: false,
							yearvalue: year,
							daysOptions: daysOptions,
							dayvalue: 29
						});
					} else {
						//当前dayvalue不是31 或 28，不用修改dayvalue
						self.setState({
							yearmodalIsOpen: false,
							yearvalue: year,
							daysOptions: daysOptions,
							dayvalue: dayValue
						});
					}
				} else {
					//不是二月份
					if (daysOptions.length == 30 && dayValue == 31) {
						self.setState({
							yearmodalIsOpen: false,
							yearvalue: year,
							daysOptions: daysOptions,
							dayvalue: 30
						});
					} else {
						self.setState({
							yearmodalIsOpen: false,
							yearvalue: year,
							daysOptions: daysOptions,
							dayvalue: dayValue
						});
					}
				}
			} else {
				//不是闰年
				if (self._isFerbruary(month)) {
					//是二月份
					if (dayValue == 31 || dayValue == 29) {
						//当前dayvalue ==31 || 29 ，将其修改为29
						self.setState({
							yearmodalIsOpen: false,
							yearvalue: year,
							daysOptions: daysOptions,
							dayvalue: 28
						});
					} else {
						//当前dayvalue不是31 或 29，不用修改dayvalue
						self.setState({
							yearmodalIsOpen: false,
							yearvalue: year,
							daysOptions: daysOptions,
							dayvalue: dayValue
						});
					}

				} else {
					//不是二月份
					if (daysOptions.length == 30 && dayValue == 31) {
						self.setState({
							yearmodalIsOpen: false,
							yearvalue: year,
							daysOptions: daysOptions,
							dayvalue: 30
						});
					} else {
						self.setState({
							yearmodalIsOpen: false,
							yearvalue: year,
							daysOptions: daysOptions,
							dayvalue: dayValue
						});
					}
				}
			}
		} else if (dateType == MONTH_VIEW_TYPE) {
			if (self._isLeapYear(year)) {
				//是闰年，
				if (self._isFerbruary(month)) {
					//是二月份
					if (dayValue == 31 || dayValue == 28) {
						//当前dayvalue ==31 || 28 ，将其修改为29
						self.setState({
							monthmodalIsOpen: false,
							monthvalue: month,
							daysOptions: daysOptions,
							dayvalue: 29
						});
					} else {
						//当前dayvalue不是31 或 28，不用修改dayvalue
						self.setState({
							monthmodalIsOpen: false,
							monthvalue: month,
							daysOptions: daysOptions,
							dayvalue: dayValue
						});
					}
				} else {
					//不是二月份
					if (daysOptions.length == 30 && dayValue == 31) {
						self.setState({
							monthmodalIsOpen: false,
							monthvalue: month,
							daysOptions: daysOptions,
							dayvalue: 30
						});
					} else {
						self.setState({
							monthmodalIsOpen: false,
							monthvalue: month,
							daysOptions: daysOptions,
							dayvalue: dayValue
						});
					}
				}
			} else {
				//不是闰年
				if (self._isFerbruary(month)) {
					//是二月份
					if (dayValue == 31 || dayValue == 29) {
						//当前dayvalue ==31 || 29 ，将其修改为29
						self.setState({
							monthmodalIsOpen: false,
							monthvalue: month,
							daysOptions: daysOptions,
							dayvalue: 28
						});
					} else {
						//当前dayvalue不是31 或 29，不用修改dayvalue
						self.setState({
							monthmodalIsOpen: false,
							monthvalue: month,
							daysOptions: daysOptions,
							dayvalue: dayValue
						});
					}

				} else {
					//不是二月份
					if (daysOptions.length == 30 && dayValue == 31) {
						self.setState({
							monthmodalIsOpen: false,
							monthvalue: month,
							daysOptions: daysOptions,
							dayvalue: 30
						});
					} else {
						self.setState({
							monthmodalIsOpen: false,
							monthvalue: month,
							daysOptions: daysOptions,
							dayvalue: dayValue
						});
					}
				}
			}
		}
	},

	_handleMonthChooseValue: function (e) {
		var month = e.target.innerHTML;
		var year = this._getSelectYear();
		var daysOptions = this._getDays(this._getSumDay(year, month));
		this._setAllState(MONTH_VIEW_TYPE, daysOptions, year, month);
	},

	_handleDayChooseValue: function (e) {
		var value = e.target.innerHTML;
		this.setState({daymodalIsOpen: false, dayvalue: value});
	},

	_onChangeMethod: function () {
	},

	_handleMouseOver: function (e) {
		e.target.style.backgroundColor = '#BFEFFF';
	},

	_handleMouseLeave: function (e) {
		e.target.style.backgroundColor = 'white';
	},
	/**
	 * @param viewType yearView | monthView | dayView
	 */
	_buildYMDView: function (viewType) {
		var self = this;
		var state = self.state;
		var scale = state.customStyles.scale;
		var handler;
		var options = [];

		if (viewType == YEAR_VIEW_TYPE) {
			options = self._getYearsOptions();
			handler = self._handleYearChooseValue;
		} else if (viewType == MONTH_VIEW_TYPE) {
			options = self._getMonthsOptions();
			handler = self._handleMonthChooseValue;
		} else if (viewType == DAY_VIEW_TYPE) {
			options = state.daysOptions;
			handler = self._handleDayChooseValue;
		}
		return options.map(function (item, idx) {
			return (
				<p key={idx} onClick={handler} onMouseOver={self._handleMouseOver}
					 style={{margin:'0px',
           paddingTop:8*scale,
           paddingBottom:8*scale,
           height:20*scale,
                     fontSize:FONT_SIZE*scale}}
					 onMouseLeave={self._handleMouseLeave}>
					{item}
				</p>
			);
		});
	},

	_closeModal: function () {
		this.setState({modalIsOpen: false});
	},

	render: function () {
		var self = this;
		var state = self.state;
		var style = state.customStyles
		var scale = style.scale;
		var content = customStyles.content;
		content.width = MODAL_WIDTH * scale;
		return (
			<div style={{width:style.formWidth*scale,
       padding:style.paddingTB,
       height: 50 * scale,
       backgroundColor:style.bgColor,
       borderColor:style.borderColor,
       borderWidth:style.borderWidth,
       fontSize:FONT_SIZE*scale}}>
				<input onClick={this._openModal} type="text" value={state.value} placeholder={style.placeholder}
							 onChange={self._onChangeMethod}
							 style={{width:INPUT_WIDTH*scale,fontSize:FONT_SIZE*scale,height:INPUT_HEIGHT*scale}}/>
				<Modal
					isOpen={this.state.modalIsOpen}
					onRequestClose={this._closeModal}
					shouldCloseOnOverlayClick={false}
					style={customStyles}>

					<div id="container" style={{width:style.formWidth*scale}}>
						<h2 ref="subtitle" style={{color:style.mTitleFontColor,fontSize:FONT_SIZE*scale}}>{style.mTitle}</h2>
						<div style={{padding:style.paddingTB}}>
              <textarea value={style.yLabel}
												rows={style.labelRows}
												cols={style.labelCols}
												disabled="disabled"
												style={{borderColor:style.labelBdColor,
                      backgroundColor:style.labelBgColor,
                      color:style.labelFontColor,
                      fontSize:FONT_SIZE*scale,
                      textAlign:style.lableTextAlign,
                        resize:"none",
                      float:'left'}}>
             </textarea>
							<input id="yearSelect" ref="yearSelect"
										 style={{width:YMD_INPUT_WIDTH*scale,
                     height:YMD_INPUT_HEIGHT*scale,
                     fontSize:FONT_SIZE*scale,}}
										 value={state.yearvalue}
										 onClick={self._openYearChooseDialog}
										 onChange={self._onChangeMethod} type="text">
							</input>
						</div>

						<Modal
							isOpen={state.yearmodalIsOpen}
							shouldCloseOnOverlayClick={false}
							style={customStyles}>
							{self._buildYMDView(YEAR_VIEW_TYPE)}
						</Modal>

						<div style={{padding:style.paddingTB,}}>
              <textarea value={style.mLabel}
												rows={style.labelRows}
												cols={style.labelCols}
												disabled="disabled"
												style={{borderColor:style.labelBdColor,
                      backgroundColor:style.labelBgColor,
                      color:style.labelFontColor,
                      fontSize:FONT_SIZE*scale,
                      textAlign:style.lableTextAlign,
                        resize:"none",
                      float:'left'}}>
             </textarea>
							<input id="monthSelect" ref="monthSelect"
										 style={{width:YMD_INPUT_WIDTH*scale,
                     height:YMD_INPUT_HEIGHT*scale,
                     fontSize:FONT_SIZE*scale,}} value={state.monthvalue}
										 onClick={self._openMonthChooseDialog}
										 onChange={self._onChangeMethod} type="text">
							</input>
						</div>

						<Modal
							isOpen={state.monthmodalIsOpen}
							shouldCloseOnOverlayClick={false}
							style={customStyles}>
							{self._buildYMDView(MONTH_VIEW_TYPE)}
						</Modal>

						<div style={{padding:style.paddingTB}}>
              <textarea value={style.dLabel}
												rows={style.labelRows}
												cols={style.labelCols}
												disabled="disabled"
												style={{borderColor:style.labelBdColor,
                        textAlign:style.lableTextAlign,
                      backgroundColor:style.labelBgColor,
                      color:style.labelFontColor,
                      fontSize:FONT_SIZE*scale,
                        resize:"none",
                      float:'left'}}>
             </textarea>
							<input id="daySelect" name="daySelect" ref="daySelect"
										 style={{width:YMD_INPUT_WIDTH*scale,
                     height:YMD_INPUT_HEIGHT*scale,
                     fontSize:FONT_SIZE*scale,}}
										 value={state.dayvalue}
										 onClick={self._openDayChooseDialog}
										 onChange={self._onChangeMethod} type="text">
							</input>
						</div>

						<Modal
							isOpen={state.daymodalIsOpen}
							shouldCloseOnOverlayClick={false}
							onAfterOpen={this._afterOpenModal}
							style={customStyles}>
							{self._buildYMDView(DAY_VIEW_TYPE)}
						</Modal>
						<div>
							<input type="button" style={{width:style.btnWidth*scale,
            height:style.btnHeight*scale,
            backgroundColor:style.btnBgColor,
            color:style.btnFontColor,
            fontSize:FONT_SIZE*scale}}
										 onClick={this._setChoosedDate} value={style.btnValue}>
							</input>
						</div>
					</div>
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
	<DatePicker />,
	document.getElementById('app')
);
