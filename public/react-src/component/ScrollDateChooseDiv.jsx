/**
 * Created by bykj on 2016/5/5.
 */
var React = require('react');

module.exports = React.createClass({
    getInitialState: function () {
        var props = this.props;
        return ({
            lables: props.lables
        });
    },
    _chooseLable: function (e) {
        var chooseValue = e.target.textContent;
        this.props.onHandleChooseValue(chooseValue);
    },
    render: function () {
        var state = this.state;
        var lables = state.lables.map(function (lable, idx) {
            // return (
            //     <div key={idx} style={{borderBottom:"solid black 1px",width:'100px'}}>
            //         <label for={lable} style={{width:"100px"}}>
            //             {lable}
            //         </label>
            //     </div>
            // );
            return (
                <p key={idx}>
                    {lable}
                </p>
            );
        });
        return (
            <div overflow="scroll" style={{width:"200px", height:"140px",textAlign:'center'}} onClick={this._chooseLable}>
                {lables}
            </div>
        );
    }
});