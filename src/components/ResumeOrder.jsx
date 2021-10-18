import React  from 'react'
import { v4 as uuidv4 } from 'uuid';

export function ResumeOrder({state}) {

  
   console.log(state.costumers,state.sCostumer)
   //const costumerArray = Object.entries(state.costumers.find(element => element.name === state.sCostumer))
   console.log(Object.entries(state.costumers).length)
   let costumerArray = []
   if(Object.entries(state.costumers).length >= 1){
   costumerArray = Object.entries(state.costumers).find(element => element[0] === state.sCostumer)
   costumerArray =  Object.entries(costumerArray[1])
   console.log(costumerArray)
   }

  return (
    <div key="djdjdjdj" id="idResumeOrder" className="cResumeOrder">
        <div key={uuidv4()} className="cContournResumeOrder">
          <p key={uuidv4()} className="cFontTypeTitleM" >_Resume_Order_ {state.sCostumer}</p>

          <table className="cTableResume cFontTypeTitleS">

            <tbody key={uuidv4()}>
              <tr key={uuidv4()}>
                <th key={uuidv4()}>Dish</th>
                <th key={uuidv4()}>Quantity</th>
                <th key={uuidv4()}>Total</th>
              </tr>

              {costumerArray.map( element => {
                console.log(element[0], element[1].quantity, element[1].price)
                return <tr key={uuidv4()}><td key={uuidv4()}>{element[0]}</td><td key={uuidv4()}>{element[1].quantity}</td><td key={uuidv4()}>{element[1].price}</td></tr>
              })}

            </tbody>
            
          </table>

          
          
          
          
        </div>
        
        

    </div>
  )
}