import { useReducer } from "react";

function reducer(state: any, action:any) {
  switch (action.type){
    case "INCREASE" : 
      return {
        ...state,
        number: state.number + state.step
      };
    case "DECREASE" :
      return {
        ...state,
        number: state.number - state.step
      };
    case "STEP_CHANGE" :
      return {
        ...state,
        step: action.payload
      };
    default:
      throw Error('Unhandled State')
  }
}

const Counter = () => {
  const [state, dispatch] = useReducer(reducer, {
    number: 0,
    step: 1
  })

  const increase = () => dispatch({ type: "INCREASE"});
  const decrease = () => dispatch({ type: "DECREASE" });
  const stepChange = (e: any) => 
    dispatch({ type: "STEP_CHANGE", payload: parseInt(e.target.value)});
  return (
    <>
      <span>{state.number}</span>
      <button onClick={increase}>+</button>
			<button onClick={decrease}>-</button>

      <input
        type="number"
        value={state.step}
        onChange={stepChange}
      />
    </>
  )
}

export default Counter;