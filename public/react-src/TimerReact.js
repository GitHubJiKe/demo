/**
 * Created by bykj on 2016/5/3.
 */
var TimerButton = React.createClass(
    {
        getInitialState: function () {
            console.log("getInitialState");
            return {
                enabled: true,
                value: 60
            };
        },
        _begin: function () {
            console.log("_begin");
            var enabled = this.state.enabled;
            if (enabled) {
                this.timer = setInterval(function () {
                    var value = this.state.value;
                    value -= 1;
                    this.setState({
                        value: value
                    });
                }.bind(this), 1000);
            }
        },
        render: function () {
            console.log("render");
            return (
                <input type="button" value={this.state.value} onClick={this._begin}/>
            );
        }
    }
);

ReactDOM.render(
    <TimerButton />,
    document.getElementById('div1')
);
