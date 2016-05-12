/**
 * Created by bykj on 2016/5/6.
 */
var React = require('react');
var ReactDOM = require('react-dom');
var Comment = React.createClass({
    render: function () {
        return (
            <div >
                {this.props.author}
                {this.props.children}
            </div>
        );
    }
});
var container = document.getElementById('app');
if (!container) {
    document.write('<div id="app"></div>');
}
ReactDOM.render(
    <Comment author="adasd" children="This is one comment">

    </Comment>,
    document.getElementById('app')
);