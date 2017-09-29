import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addReminder, deleteReminder, clearReminders} from '../actions';
import moment from 'moment';

class App extends Component{
    constructor(props){
        super(props);
        this.state={
            text:'',
            dueDate:''
        }
        this.addReminder = this.addReminder.bind(this);
        this.deleteReminder = this.deleteReminder.bind(this);
        this.clearReminders = this.clearReminders.bind(this);
    }
    addReminder = ()=>{
        if(this.state.text!==''){
            this.props.addReminder(this.state.text, this.state.dueDate);
            this._text.value='';
        }
    }
    deleteReminder(id){
        this.props.deleteReminder(id);
    }
    clearReminders(){
        this.props.clearReminders();
    }
    componentDidMount(){
        this._text.focus();
    }
    renderReminder(){
        const{reminders} = this.props;
        return(
            <div>
                <ul className="list-group">
                    {
                        reminders.map(reminder=>{
                            return(
                                <li 
                                    className="list-group-item"
                                    key={reminder.id}>
                                    <div className="list-tem">
                                        <div>{reminder.text}</div>
                                        <div>
                                            <em>
                                                {moment(new Date(reminder.dueDate)).fromNow()}
                                            </em>
                                        </div>
                                    </div>
                                    <div 
                                        onClick={()=>this.deleteReminder(reminder.id)}
                                        className="list-item delete-button">
                                        &#x2715;
                                    </div>
                                </li>
                            );
                        })
                    }
                </ul>
            </div>
        );
    }
    render(){
        return(
            <div className='App'>
                <div className="title">
                    Reminder pro
                </div>
                <div className="form-inline reminder-form">
                    <div className="form-group">
                        <input 
                            type="text" 
                            className="form-control"
                            placeholder="I have to..."
                            ref={input=>this._text=input}
                            onChange={event=>this.setState({text:event.target.value})}
                        />
                    </div>
                    <div>
                        <input  
                            className='form-control'
                            type="datetime-local"
                            onChange={event=>this.setState({dueDate:event.target.value})}
                        />
                    </div>
                    <button
                        type='button'
                        className='btn btn-success'
                        onClick={this.addReminder}
                    >
                    Add Reminder
                    </button>
                </div>
                {this.renderReminder()}
                <button className='btn btn-danger' onClick={this.clearReminders}>Clear All</button>
            </div>
        );
    }
}
//Method1
function mapDispatchToProps(dispatch) {
    return bindActionCreators({addReminder, deleteReminder, clearReminders},dispatch);
}
function mapStateToProps(state){
    return {
        reminders:state
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(App);
/*
Method2-- we can re-write as below. This way can reduce our code
and we don't have to define mapDispatchToProps and we don't have to import bindingActionCreators
*/
// export default connect(null,{addReminder, deleteReminder})(App);