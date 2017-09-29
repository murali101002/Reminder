/*the global store object shouldn't be changed directly.
rather it should be reduced to new state and use it.
Reducers accept the state and action and reduce the 
store object based on the action
*/
import {ADD_REMINDER, DELETE_REMINDER, CLEAR_REMINDERS} from '../constants';
import {bake_cookie, read_cookie} from 'sfcookies';

const reminder = (action)=>{
    const{text, dueDate} = action;
    return{
        text,
        dueDate,
        id:Math.random()
    };
}
const removeId=(state=[],id)=>{
    return state.filter(reminder=>reminder.id!==id);
}
const reminders=(state=[],action)=>{
    let reminders=null;
    state = read_cookie('reminders');
    switch(action.type){
        case ADD_REMINDER:
            reminders=[...state, reminder(action)];
            bake_cookie('reminders',reminders);
            return reminders;
        case DELETE_REMINDER:
            reminders = removeId(state,action.id);
            bake_cookie('reminders',reminders);
            return reminders;
        case CLEAR_REMINDERS:
            reminders = [];
            bake_cookie('reminders',reminders);
            return reminders;
        default:
            return state;
    }
}
export default reminders;