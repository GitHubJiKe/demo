/**
 * Created by bykj on 2016/5/5.
 */
var React = require('react');
var ReactDOM = require('react-dom');
var Modal = require('react-modal');

const customStyles = {
    content: {
        width: '200px',
        textAlign: 'center',
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
            modalState:{
                father:false,
                year:false,
                month:false,
                day:false
            }
        };
    },
    openModal: function (e) {
        var modalName = e.target.name;
        var modalState = this.state.modalState;
        for(var key in modalState){
            modalState[key] = false;
        }
        if(modalName!='father'){
            modalState.father = true;
        }
        modalState[modalName]=true;
        this.setState({modalState:modalState});
    },

    /**
     * 可以在此方法内渲染打开之后的数据
     */
    afterOpenModal: function () {
        this.refs.subtitle.style.color = '#f00';
        if (this.state.selectorType == "day") {
            console.log("day!!!!");
            var dom = this.refs.dayView;
            console.log('scrollTop:%s', dom.scrollTop);
        }
    },
    closeModal: function () {
        console.log('closeModal');
        this.setState({modalIsOpen: false});
    },
    render: function () {
        console.log('render TimeChooseDlg');
        var self = this;
        var state = self.state;
        var modalState = state.modalState;
        var yearView = (
            <div overflow="scroll" style={{width:"200px", height:"140px",textAlign:'center'}}>
                yearView
            </div>
        );
        var monthView = (
            <div overflow="scroll" style={{width:"200px", height:"140px",textAlign:'center'}}>
                monthView
            </div>
        );
        var dayView = (
            <div ref="dayView" overflow="scroll"
                 style={{width:"200px", height:"300px",textAlign:'center'}}>
                dayView
            </div>
        );

        return (
            <div>
                <input name="father" onClick={this.openModal} type="button" value="open father modal"></input>
                <Modal
                    isOpen={modalState.father}
                    onRequestClose={this.closeModal}
                    shouldCloseOnOverlayClick={true}
                    style={customStyles}>
                    <h2 ref="subtitle">father modal</h2>
                    <br/>
                    年：
                    <input name="year" onClick={self.openModal} value="open year modal" type="button">
                    </input>
                    <Modal
                        isOpen={modalState.year}
                        onRequestClose={self.closeYearChooseDialog}
                        style={customStyles}>
                        {yearView}
                    </Modal>

                    <br/>
                    月：
                    <input  name="month"  value="open month modal"
                           onClick={self.openModal} type="button">
                    </input>
                    <Modal
                        isOpen={modalState.month}
                        onRequestClose={self.closeMonthChooseDialog}
                        shouldCloseOnOverlayClick={false}
                        style={customStyles}>
                        {monthView}
                    </Modal>

                    <br/>
                    日：
                    <input name="year" onClick={self.openModal} value="open day modal" type="button">
                    </input>
                    <Modal
                        isOpen={modalState.day}
                        onRequestClose={self.closeDayChooseDialog}
                        shouldCloseOnOverlayClick={false}
                        onAfterOpen={this.afterOpenModal}
                        style={customStyles}>
                        {dayView}
                    </Modal>
                    <p/>
                    <button onClick={this.closeModal}>确定</button>
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
    <App />
    ,
    document.getElementById('app')
);