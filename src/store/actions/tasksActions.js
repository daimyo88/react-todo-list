import * as actionTypes from './actionTypes';
import axios from 'axios';

const fetchTasksStart = () => {
    return {
        type : actionTypes.FETCH_TASKS_START,
    }
}

const fetchTasksSuccess = (tasks) => {
    return {
        type: actionTypes.FETCH_TASKS_SUCCESS,
        tasks: tasks
    }
}

const setTasksSuccess = (tasks) => {
    return {
        type: actionTypes.SET_TASKS_SUCCESS,
        tasks: tasks
    }
}

export const setAction = (actiontype) => {
    return {
        type: actionTypes.SET_ACTION,
        currentAction: actiontype
    }
}

export const toggleDescription = (id) => {
    return (dispatch, getState) => {
        
        let tasks = getState();
        tasks = [...tasks.tsk.tasks]
        const i = tasks.findIndex(el => el.id === id);
        tasks[i].descriptionOpen = !tasks[i].descriptionOpen;
        
        dispatch(updateTasksNoDB(tasks));
    }
}

const updateTasksNoDB = (tasks) => {
    
    return {
        type: actionTypes.TOGGLE_DESCRIPTION,
        tasks: tasks
    } 
}


export const setCurrentTask = (task) => {
    return {
      type: actionTypes.SET_CURRENT_TASK,
      currentTask : task
    }
}

export const resetAction = () => {
    return {
        type: actionTypes.RESET_ACTION
    }
}

export const getTasks = () => {
    const tasks = [];
    return dispatch => {
        
        dispatch(fetchTasksStart());

        axios.get('/tasks.json')
            .then((res) => {
                if(res.data !== '') {
                    for (let key in res.data) {
                    tasks.push({ ...res.data[key]})
                    }
                    dispatch(fetchTasksSuccess(tasks))                  
                }

            })
            .catch((err) => {
                console.log(err);
            })
    };
}

export const setTasks = (tasks) => {
 
    return dispatch => {
        
        dispatch(fetchTasksStart());

        axios.put('/tasks.json', tasks)
            .then((res) => {
            let updatedTasks = (res.data !== null) ? res.data : []
                dispatch(setTasksSuccess(updatedTasks))
            })
            .catch((err) => {
                console.log(err)
            })
    };
}

export const addTask = (task) => {
   
    return dispatch => {
        dispatch(fetchTasksStart());

        task.status = false;
        task.id = Date.now();
        task.descriptionOpen = false;
    
        axios.post('/tasks.json', task)
             .then((res) => {
                dispatch(getTasks());
             })
             .catch((err)=> {
               console.log(err);
             })
    }
}

export const deleteTask = (id) => {

    return (dispatch, getState) => {
        const state = getState();
        const tasks = [...state.tsk.tasks];
        const i = tasks.findIndex(el => el.id === id);
        tasks.splice(i, 1);
        dispatch(setTasks(tasks));
    }
}



export const editTask = (task) => {
   
    return (dispatch, getState) => {
        const tasks = [...getState().tsk.tasks];
        const i = tasks.findIndex(el => el.id === task.id);
        tasks[i]  = task;
        dispatch(setTasks(tasks));
    }
}

export const changeStatusTask = (id, status) => {
   
    return (dispatch, getState) => {
        const tasks = [...getState().tsk.tasks];
        const i = tasks.findIndex(el => el.id === id);
        tasks[i].status = status;
        dispatch(setTasks(tasks));
    }
}





