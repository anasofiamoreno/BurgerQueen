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
    <div key={uuidv4()} id="idResumeOrder" className="cResumeOrder">
        <div key={uuidv4()} className="cContournResumeOrder">
          <p key={uuidv4()} className="cFontTypeTitleM" >_Resume_Order_ {state.sCostumer}</p>
          <table className="cTableResume cFontTypeTitleS">
            <tbody key={uuidv4()}>
              <tr key={uuidv4()}>
                <th>Dish</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>

              {costumerArray.map( element => {
                return <React.Fragment>
                  <tr key={uuidv4()}> <td>{element[0]}</td> <td>{element[1].quantity}</td> <td>{element[1].price}</td></tr></React.Fragment>
              })}
            </tbody>
          </table>

          
          
          
          
        </div>
        
        

    </div>
  )
}