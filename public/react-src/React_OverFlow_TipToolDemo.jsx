/**
 * Created by bykj on 2016/5/11.
 */
var ReactOverflowTooltip = require('react-overflow-tooltip');
var React = require('react');
var ReactDOM = require('react-dom');

var App = React.createClass({
    getInitialState: function () {
        return ({});
    },
    render: function () {
        return (
            <ReactOverflowTooltip title='too long text'>
                <div>too long
                </div>
            </ReactOverflowTooltip>
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



