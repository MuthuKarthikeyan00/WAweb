import react, {createContext, useContext,useReducer} from 'react';


const StateContext =createContext();

export const StateValue =({reducer,initialState,children})=>(
     <StateContext.Provider value={useReducer(reducer,initialState)}>
        {children}
     </StateContext.Provider>
)

export const useStateValue=()=> useContext(StateContext);