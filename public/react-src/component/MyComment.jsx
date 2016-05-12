/**
 * Created by bykj on 2016/5/4.
 */
var React = require('react');

module.exports = React.createClass({
    render: function () {
        return (
            <div className="commentBox">
                <h1>Comments</h1>
                <CommentList />
                <CommentList2 data={[
                    {author: "Pete Hunt", text: "This is one comment"},
                {author: "Jordan Walke", text: "This is *another* comment"}
                ]}/>
                <CommentForm />
            </div>
        );
    }
});
var CommentList = React.createClass({
    render: function () {
        return (
            <div className="commentList">
                Hello, world! I am a CommentList.
            </div>
        );
    }
});
var CommentForm = React.createClass({
    render: function () {
        return (
            <div className="commentForm">
                Hello, world! I am a CommentForm.
            </div>
        );
    }
});
var Comment = React.createClass({
    render: function () {
        return (
            <div className="comment">
                <h2 className="commentAuthor">
                    {this.props.author}
                </h2>
                {this.props.children}
            </div>
        );
    }
});
var CommentList2 = React.createClass({
    render: function () {
        return (
            <div className="commentList" data={this.props.data}>
                <Comment author={data.author}>{data.text}</Comment>
                <Comment author={data.props.author}>{data.text}</Comment>
            </div>
        );
    }
});