/**
 * Created by bykj on 2016/5/9.
 */
var ModalAddressPicker = require('./component/ModalAddressPicker.jsx');
var React = require('react');
var ReactDOM = require('react-dom');

var container = document.getElementById('app');
if (!container) {
	document.write('<div id="app"></div>');
}

ReactDOM.render(
	<ModalAddressPicker onAddressConfirm={function(address) {
    }}/>
	,
	document.getElementById('app')
)
;
