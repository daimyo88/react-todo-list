import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';


const initState = {
    tasks: [],
    pending: false,
    currentAction : '',
    currentTask : '',
}

const fetchTasksStart = (state, action) => {
    return updateObject(state, { 
        pending : true,
        currentAction : '',
        currentTask : ''
     })
}

const fetchTasksSuccess = (state, action) => {
    return updateObject(state, { 
        pending : false,
        tasks: action.tasks,
        currentAction : '',
        currentTask : '',
     });
}

const setTasksSuccess = (state, action) => {
    return updateObject(state, { 
        pending : false,
        currentAction : '',
        currentTask : '',
        tasks: action.tasks
     });
}

const setAction = (state, action) => {
    return updateObject(state, { currentAction : action.currentAction })
}

const toggleDescription = (state, action) => {
    return updateObject(state, { tasks : action.tasks })
}

const setCurrentTask = (state, action) => {
    return updateObject(state, { currentTask : action.currentTask })
}

const resetAction = (state, action) => {
    return updateObject(state, { 
        currentAction : '',
        currentTask: '' 
    })
}


const reducer = (state = initState, action) => {
  
    switch (action.type) {

        case actionTypes.FETCH_TASKS_START: return fetchTasksStart(state, action);       
        case actionTypes.FETCH_TASKS_SUCCESS: return fetchTasksSuccess(state, action);
        case actionTypes.SET_TASKS_SUCCESS: return setTasksSuccess(state, action);
        case actionTypes.SET_ACTION: return setAction(state, action);
        case actionTypes.RESET_ACTION: return resetAction(state, action);
        case actionTypes.SET_CURRENT_TASK: return setCurrentTask(state, action);
        case actionTypes.TOGGLE_DESCRIPTION: return toggleDescription(state, action);

        default: return state;
    }
}

export default reducer;