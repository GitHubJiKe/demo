/**
 * Created by bykj on 2016/5/9.
 */
var React = require('react');
var Modal = require('react-modal');
var ReactDOM = require('react-dom');

var MODAL_WIDTH = 300;
var MODAL_HEIGHT = 200;
var PROVINCE_TYPE = 1000;
var CITY_TYPE = 1001;
var NOTHING = 1003;
var FONT_SIZE = 18;
var PADDING_LEFT = 28;
var PADDING_RIGHT = 24;
var INPUT_HEIGHT = 20;
var INPUT_WIDTH = 160;
var ERROR_HINT_HEIGHT = 8;
var ERROR_HINT_PADDING_LEFT = 158;
var FORM_HEIGHT = 80;

var DefaultcustomStyles = {
	formWidth: 360,
	scale: 1,
	inputBorderColor: 'white',
	inputFontColor: 'white',
	inputBgColor: '#2E2E2E',
	pLabel: ' 省 份:',
	pPlaceHolder: '请选择您所在的省份…',
	cLabel: ' 城市/区:',
	cPlaceHolder: '请选择您所在的城市/区…',
	fontColor: 'white', // 标签字体的颜色
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
	labelBdColor: '#2E2E2E',
	labelBgColor: '#2E2E2E',
	labelFontColor: 'white',
	errorHintText: "",
	errorHintColor: "red"
}

var customStyles = {
	content: {
		height: MODAL_HEIGHT,
		width: MODAL_WIDTH,
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)'
	}
};
var addressData = {
	"北京": ["东城", "西城",
		"朝阳",
		"海淀",
		"门头沟",
		"通州",
		"顺义",
		"大兴",
		"平谷",
		"密云",
		"石景山",
		"房山",
		"延庆",
		"宣武",
		"崇文",
		"丰台",
		"昌平",
		"怀柔"]
	,
	"天津": ["东丽", "津南",
		"南开",
		"塘沽",
		"汉沽",
		"大港",
		"宁河",
		"静海",
		"蓟县",
		"和平",
		"河东",
		"河西",
		"河北",
		"红挢",
		"宝坻",
		"西青",
		"北辰",
		"武清"]
	,
	"河北": ["石家庄", "唐山",
		"承德",
		"秦皇岛",
		"保定",
		"张家口",
		"衡水",
		"廊坊",
		"邢台",
		"沧州",
		"邯郸"]
	,
	"山西": ["太原", "阳泉",
		"晋城",
		"朔州",
		"吕梁",
		"晋中",
		"忻州",
		"临汾",
		"大同",
		"长治",
		"运城"]
	,
	"内蒙古": ["呼和浩特", "乌海",
		"阿拉善盟",
		"乌兰察布盟",
		"伊克昭盟",
		"鄂尔多斯",
		"东胜",
		"赤峰",
		"呼伦贝尔盟",
		"哲里木盟",
		"兴安盟",
		"锡林郭勒盟",
		"通辽",
		"包头",
		"巴彦淖尔盟"]
	,
	"辽宁": ["沈阳", "抚顺",
		"本溪",
		"阜新",
		"辽阳",
		"铁岭",
		"朝阳",
		"葫芦岛",
		"大连",
		"丹东",
		"鞍山",
		"锦州",
		"营口",
		"盘锦"]
	,
	"吉林": ["长春", "白山",
		"白城",
		"延边",
		"吉林",
		"四平",
		"辽源",
		"通化",
		"松原"]
	,
	"黑龙江": ["哈尔滨", "齐齐哈尔",
		"牡丹江",
		"佳木斯",
		"绥化",
		"鹤岗",
		"鸡西",
		"黑河",
		"双鸭山",
		"伊春",
		"七台河",
		"大兴安岭",
		"大庆"]
	,
	"上海": ["黄浦", "虹口",
		"杨浦",
		"浦东",
		"卢湾",
		"长宁",
		"静安",
		"普陀",
		"宝山",
		"嘉定",
		"青浦",
		"崇明",
		"徐汇",
		"闵行",
		"金山",
		"松江",
		"南汇",
		"奉贤",
		"闸北"]
	,
	"江苏": ["苏州", "太仓",
		"常州",
		"无锡",
		"南京",
		"扬州",
		"泰州",
		"南通",
		"张家港",
		"徐州",
		"连云港",
		"淮安",
		"盐城",
		"常熟",
		"昆山",
		"镇江",
		"宿迁"]
	,
	"浙江": ["杭州", "衢州",
		"台州",
		"丽水",
		"宁波",
		"舟山",
		"余慈",
		"金华",
		"温州",
		"乐清",
		"湖州",
		"绍兴",
		"嘉兴"]
	,
	"安徽": ["合肥", "芜湖",
		"马鞍山",
		"淮北",
		"铜陵",
		"池州",
		"淮南",
		"巢湖",
		"六安",
		"蚌埠",
		"安庆",
		"黄山",
		"滁州",
		"宿州",
		"宣城",
		"亳州",
		"阜阳"]

	,
	"福建": ["厦门", "漳州",
		"龙岩",
		"福州",
		"南平",
		"宁德",
		"莆田",
		"泉州",
		"三明"]
	,
	"江西": ["南昌", "景德镇",
		"九江",
		"鹰潭",
		"萍乡",
		"新馀",
		"吉安",
		"宜春",
		"抚州",
		"上饶",
		"赣州"]
	,
	"山东": ["青岛", "济南",
		"德州",
		"聊城",
		"烟台",
		"威海",
		"泰安",
		"枣庄",
		"临沂",
		"东营",
		"潍坊",
		"济宁",
		"菏泽",
		"淄博",
		"莱芜",
		"日照",
		"滨州"]
	,
	"河南": ["郑州", "焦作",
		"漯河",
		"周口",
		"济源",
		"开封",
		"鹤壁",
		"濮阳",
		"平顶山",
		"洛阳",
		"安阳",
		"南阳",
		"新乡",
		"驻马店",
		"许昌",
		"三门峡",
		"信阳",
		"商丘"]
	,
	"湖北": ["武汉", "荆州",
		"黄石",
		"荆门",
		"黄冈",
		"恩施",
		"宜昌",
		"十堰",
		"潜江",
		"天门",
		"仙桃",
		"随州",
		"咸宁",
		"孝感",
		"鄂州",
		"襄阳"]
	,
	"湖南": ["常德", "衡阳",
		"邵阳",
		"益阳",
		"怀化",
		"永州",
		"湘西",
		"张家界",
		"长沙",
		"湘潭",
		"株洲",
		"郴州",
		"岳阳",
		"娄底"]
	,
	"广东": ["广州", "韶关",
		"清远",
		"深圳",
		"珠海",
		"阳江",
		"东莞",
		"惠州",
		"佛山",
		"肇庆",
		"云浮",
		"中山",
		"江门",
		"湛江",
		"茂名",
		"汕头",
		"梅州",
		"汕尾",
		"潮州",
		"揭阳",
		"河源"]
	,
	"广西": ["南宁", "梧州",
		"北海",
		"防城港",
		"钦州",
		"贵港",
		"玉林",
		"贺州",
		"百色",
		"河池",
		"来宾",
		"崇左",
		"柳州",
		"桂林"]
	,
	"海南": ["海口", "三亚",
		"琼北",
		"琼南",
		"昌江",
		"东方",
		"儋州",
		"定安",
		"陵水",
		"文昌",
		"白沙"]
	,
	"重庆": ["渝中", "九龙坡",
		"南岸",
		"万盛",
		"巴南",
		"黔江",
		"綦江",
		"武隆",
		"石柱",
		"秀山",
		"酉阳",
		"彭水",
		"江津",
		"南川",
		"涪陵",
		"大渡口",
		"江北",
		"沙坪坝",
		"北碚",
		"双挢",
		"渝北",
		"长寿",
		"潼南",
		"铜梁",
		"大足",
		"荣昌",
		"壁山",
		"合川",
		"万州",
		"梁平",
		"城口",
		"垫江",
		"忠县",
		"开县",
		"云阳",
		"奉节",
		"巫山",
		"巫溪",
		"丰都",
		"永川"]
	,
	"四川": ["成都", "德阳",
		"自贡",
		"内江",
		"广安",
		"达川",
		"泸州",
		"阿坝",
		"攀枝花",
		"雅安",
		"眉山",
		"甘孜",
		"凉山",
		"资阳",
		"南充",
		"遂宁",
		"绵阳",
		"广元",
		"巴中",
		"乐山",
		"宜宾"]
	,
	"贵州": ["贵阳", "六盘水",
		"遵义",
		"安顺",
		"铜仁",
		"黔西南",
		"毕节",
		"黔东南",
		"黔南"]
	,
	"云南": ["昆明", "大理",
		"曲靖",
		"玉溪",
		"昭通",
		"楚雄",
		"红河",
		"文山",
		"思茅",
		"西双版纳",
		"保山",
		"德宏",
		"丽江",
		"怒江",
		"迪庆",
		"临沧",
		"普洱"]
	,
	"西藏": ["昌都", "阿里",
		"那曲",
		"拉萨",
		"日喀则",
		"山南",
		"林芝"]
	,
	"陕西": ["西安", "咸阳",
		"铜川",
		"汉中",
		"渭南",
		"延安",
		"安康",
		"商洛",
		"宝鸡",
		"榆林"]
	,
	"甘肃": ["兰州", "嘉峪关",
		"金昌",
		"白银",
		"天水",
		"酒泉",
		"张掖",
		"武威",
		"定西",
		"陇南",
		"平凉",
		"庆阳",
		"临夏",
		"甘南"]
	,
	"青海": ["西宁", "海东",
		"海南",
		"海北",
		"黄南",
		"玉树",
		"果洛",
		"海西"]
	,
	"宁夏": ["银川", "石嘴山",
		"吴忠",
		"固原",
		"中卫"]
	,
	"新疆": ["乌鲁木齐", "石河子",
		"克拉玛依",
		"伊犁",
		"博尔塔拉",
		"吐鲁番",
		"哈密",
		"塔城",
		"阿勒泰",
		"阿拉尔",
		"米泉",
		"五家渠",
		"昌吉",
		"巴音郭勒",
		"克孜勒苏柯尔克孜",
		"喀什",
		"和田",
		"阿克苏"]
};
var defaultErrorHint = "请选择省份！";
var PCPicker = React.createClass({

	getInitialState: function () {
		var props = this.props;
		var onAddressConfirm = props.onAddressConfirm;
		return (
		{
			customStyles: props.customStyles ? props.customStyles : DefaultcustomStyles,
			onAddressConfirm: onAddressConfirm,
			ProvinceModalIsOpen: false,
			CityOrCountyModalIsOpen: false,
			selectedProvince: "",
			selectedCityOrCounty: "",
			PCCType: NOTHING
		}
		);
	},

	_handleMouseOver: function (e) {
		e.target.style.backgroundColor = "#FFFAE3";
		e.target.style.color = "orange";
	},

	_handleMouseLeave: function (e) {
		e.target.style.color = "black";
		e.target.style.backgroundColor = "#FFFFFF";
	},

	_getCitys: function (value) {
		return addressData[value];
	},

	_handleItemClick: function (e) {
		var selectedAddress;
		var target = e.target;
		var type = target.className;
		var value = target.innerHTML;
		if (type == PROVINCE_TYPE) {
			this.setState({
				selectedProvince: value,
				ProvinceModalIsOpen: false,
				PCCType: CITY_TYPE,
				selectedCityOrCounty: this._getCitys(value)[0]
			});
			selectedAddress = value + this._getCitys(value)[0];
		} else {
			this.setState({selectedCityOrCounty: value, CityOrCountyModalIsOpen: false});
			selectedAddress = this.state.selectedProvince + value;
		}
		if (this.props.onAddressConfirm) {
			this.props.onAddressConfirm(this, selectedAddress);
		}
	},

	_buildPCCViews: function (viewType) {
		var self = this;
		var state = self.state;
		var style = state.customStyles;
		var scale = style.scale;
		var views = [];
		switch (viewType) {
			case PROVINCE_TYPE:
				views = Object.keys(addressData);
				break;
			case CITY_TYPE:
				views = addressData[state.selectedProvince];
				break;
			case NOTHING:
				return;
		}
		if (views) {
			return views.map(function (v, idx) {
				return (
					<p key={idx} className={viewType} onClick={self._handleItemClick} onMouseOver={self._handleMouseOver}
						 style={{margin:'0px',
						 paddingTop:PADDING_LEFT*scale,
						 paddingBottom:PADDING_LEFT*scale,
						 height:INPUT_HEIGHT*scale,
						 fontSize:FONT_SIZE*scale}}
						 onMouseLeave={self._handleMouseLeave}>
						{v}
					</p>
				);
			})
		}
	},

	_openProvinceSelector: function () {
		var style = this.state.customStyles;
		style.errorHintText = "";
		this.setState({ProvinceModalIsOpen: true, PCCType: PROVINCE_TYPE, customStyles: style});
	},

	getErrorHint: function () {
		var style = this.state.customStyles;
		var scale = style.scale;
		return (  <div
			style={{color:"#EEB422",
								minHeight:ERROR_HINT_HEIGHT*scale,
								fontSize:12*scale,
								paddingTop:0,
								paddingBottom:0,
								paddingLeft:ERROR_HINT_PADDING_LEFT*scale}}>
			<label style={{padding:0,margin:0}}>{style.errorHintText}</label>
		</div>);
	},

	_openCityOrCountySelector: function () {
		var style = this.state.customStyles;
		if (this.state.selectedProvince == null || this.state.selectedProvince == "") {
			style.errorHintText = defaultErrorHint;
			this.setState({customStyles: style});
		} else {
			this.setState({CityOrCountyModalIsOpen: true});
		}
	},

	_handleOnChange: function () {

	},

	render: function () {
		var self = this;
		var state = self.state;
		var style = state.customStyles;
		style.labelBgColor = "#2E2E2E";
		var scale = style.scale;
		var content = customStyles.content;
		content.width = style.formWidth * scale;
		var errorHintView = "";
		if (style.errorHintText.length > 0) {
			errorHintView = this.getErrorHint();
		}
		return (
			<div style={{width:style.formWidth*scale,
       height: FORM_HEIGHT*scale,
       backgroundColor:"#2E2E2E",
       borderColor:style.borderColor,
       borderWidth:style.borderWidth,
       fontSize:FONT_SIZE*scale,
       paddingBottom:style.paddingTB*scale}}>
				<div
					style={{paddingTop:style.paddingTB,
									 paddingBottom:style.paddingTB}}>

					<div style={{padding:0,float:'left',paddingLeft:PADDING_LEFT*scale,paddingRight:PADDING_RIGHT*scale}}>
						<label style={{color:"#EEB422",float:'left'}}>*</label>
						<textarea value={style.pLabel}
											rows={style.labelRows}
											cols={style.labelCols}
											disabled="disabled"
											style={{borderColor:"#2E2E2E",
											padding:0,
											backgroundColor:style.labelBgColor,
											color:style.labelFontColor,
											fontSize:FONT_SIZE*scale,
											resize:"none",
											float:'left'}}>
						</textarea>
					</div>

					<input type="input"
								 value={state.selectedProvince}
								 placeholder={style.pPlaceHolder}
								 name='province'
								 onClick={self._openProvinceSelector}
								 onChange={self._handleOnChange}
								 style={{width: INPUT_WIDTH*scale,
								 padding:0,
								 height:INPUT_HEIGHT*scale,
								 color:style.inputFontColor,
								 backgroundColor:"#2E2E2E" ,
								 border:"solid 1px white",
								 fontSize:'80%'}}/>

					{errorHintView}

				</div>

				<Modal
					isOpen={state.ProvinceModalIsOpen}
					shouldCloseOnOverlayClick={false}
					style={customStyles}>
					{self._buildPCCViews(state.PCCType)}
				</Modal>


				<div
					style={{paddingTop:style.paddingTB,
									 paddingBottom:style.paddingTB}}>

					<div style={{padding:0,float:'left',paddingLeft:PADDING_LEFT*scale,paddingRight:PADDING_RIGHT*scale}}>
						<label style={{color:"#EEB422",float:'left'}}>*</label>
						<textarea value={style.cLabel}
											rows={style.labelRows}
											cols={style.labelCols}
											disabled="disabled"
											style={{borderColor:"#2E2E2E",
											padding:0,
											backgroundColor:style.labelBgColor,
											color:style.labelFontColor,
											fontSize:FONT_SIZE*scale,
											resize:"none",
											float:'left'}}>
						</textarea>
					</div>

					<input type="input"
								 value={state.selectedCityOrCounty}
								 placeholder={style.cPlaceHolder}
								 name='cityOrcounty'
								 onClick={self._openCityOrCountySelector}
								 onChange={self._handleOnChange}
								 style={{width: INPUT_WIDTH*scale,
									height:INPUT_HEIGHT*scale,
									padding:0,
									color:style.inputFontColor,
									backgroundColor:"#2E2E2E" ,
									border:"solid 1px white",
									fontSize:'80%'}}/>
				</div>

				<Modal
					isOpen={state.CityOrCountyModalIsOpen}
					shouldCloseOnOverlayClick={false}
					style={customStyles}>
					{self._buildPCCViews(state.PCCType)}
				</Modal>

			</div>);
	}

});


var container = document.getElementById('app');
if (!container) {
	document.write('<div id="app"></div>');
}

ReactDOM.render(
	<PCPicker />
	,
	document.getElementById('app')
);
