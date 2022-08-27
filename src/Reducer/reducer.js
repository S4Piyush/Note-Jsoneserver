import { ADD_TO_NOTE, UPDATED_TITLE,DELETE_DATA,UPDATED_DESCRIPTION, CLEAR_ALL_CARED } from "./Constent";

const initialstate = {
    note:[]
}
export const addtonotereducer = (state = initialstate, action) => {
    switch (action.type) {
        case ADD_TO_NOTE: {
            return {
                ...state,
                note: [...state.note,action.payload]
            }
        }
        case DELETE_DATA: {
            const data = state.note.filter((data) => data.id!== action.payload)
            return {
                ...state,
                note:data 
            }
        }
        case UPDATED_TITLE:{
            
            return {
                ...state,
                note: action.payload
                  
            }
        }
        case UPDATED_DESCRIPTION:{
            return{
                ...state,
                note:action.payload
            }
        }

        default: {
            return state
        }
    }
}



