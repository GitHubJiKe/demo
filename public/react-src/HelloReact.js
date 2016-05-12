/**
 * Created by bykj on 2016/4/27.
 */

var MyLabel = React.createClass({

    getInitialState: function () {
        console.log('getInitialState');
        return {bookNames: [], curColor: 'red'}
    },

    componentWillMount: function () {
        console.log('componentWillMount');
    },

    componentDidMount: function () {
        console.log('componentDidMount');
        var self = this;
        $.ajax({
            //提交数据的类型 POST GET
            type: "GET",
            //提交的网址
            url: "demo/booknames",
            //提交的数据
            // data:{Name:"sanmao",Password:"sanmaoword"},
            //返回数据的格式
            datatype: "json",//"xml", "html", "script", "json", "jsonp", "text".
            //在请求之前调用的函数
            // beforeSend:function(){$("#msg").html("logining");},
            //成功返回之后调用的函数
            success: function (bookNames) {
                // console.log(bookNames);
                self.setState({bookNames: bookNames});
                // $("#msg").html(decodeURI(data));
            },
            //调用执行后调用的函数
            complete: function (XMLHttpRequest, textStatus) {
                // alert(XMLHttpRequest.responseText);
                // alert(textStatus);
                //HideLoading();
            },
            //调用出错执行的函数
            error: function () {
                //请求出错处理
            }
        });
    },

    componentWillUpdate: function () {
        console.log('componentWillUpdate');
    },

    componentDidUpdate: function () {
        console.log('componentDidUpdate');
    },

    componentWillReceiveProps: function () {
        console.log('componentWillReceiveProps');
    },

    _changeColor: function () {
        var curColor = this.state.curColor;
        if (curColor == "red") {
            curColor = "green";
        } else if (curColor == "green") {
            curColor = "yellow";
        } else {
            curColor = "red";
        }
        this.setState({curColor: curColor});
    },

    _getNewBooks: function () {
        var self = this;
        $.ajax({
            type: "GET",
            url: "demo/newbooks",
            datatype: "json",//"xml", "html", "script", "json", "jsonp", "text".
            success: function (bookNames) {
                self.setState({bookNames: bookNames});
            },
            complete: function (XMLHttpRequest, textStatus) {
            },
            error: function () {
            }
        });
    },

    render: function () {
        var curColor = this.state.curColor;
        console.log('render');

        var divStyle = {border: 'solid 1px ' + curColor};
        var labels = this.state.bookNames.map(function (v, idx) {
            return (
                <div key={idx} style={divStyle}><label>{v}</label></div>
            )
        });

        return (
            <div>
                {labels}
                <div><input type="button" value="change color" onClick={this._changeColor}></input></div>
                <div><input type="button" value="get new books" onClick={this._getNewBooks}></input></div>
            </div>
        )
    }
});

ReactDOM.render(<MyLabel />, document.getElementById('container'));


