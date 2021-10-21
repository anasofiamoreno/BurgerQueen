import React  from 'react'
import { v4 as uuidv4 } from 'uuid';

export function ResumeOrder({state}) {

  
   console.log("1", state.costumers, "2",state)
   //const costumerArray = Object.entries(state.costumers.find(element => element.name === state.sCostumer))
   //console.log(Object.entries(state.costumers).length)
   let costumerArray = []
   let totalCost = 0
   if(Object.entries(state.costumers).length >= 1){
   costumerArray = ["","no entries"]
   costumerArray = Object.entries(state.costumers).find(element => element[0] === state.sCostumer)
   costumerArray =  Object.entries(costumerArray[1])
   
   costumerArray.forEach(element =>{
    totalCost += element[1].quantity * element[1].price
   })
   }

  return (
    <div key={uuidv4()} id="idResumeOrder" className="cResumeOrder">
        <div key={uuidv4()} className="cContournResumeOrder">
          <p key={uuidv4()} className="cFontTypeTitleM" >Resume {state.sCostumer}</p>
          <table key={uuidv4()} className="cTableResume cFontTypeTitleS">
            <thead>
              <tr>
                <th>Dish</th>
                <th>Qty</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {costumerArray.map( element => {
                return <React.Fragment key={uuidv4()}>
                  <tr>
                    <td>{element[0]}</td>
                    <td>{element[1].quantity}</td>
                    <td>{"$"+element[1].price}</td>
                  </tr></React.Fragment>
              })}
            </tbody>
            </table>
           
              {(costumerArray.length > 0) && <React.Fragment key={uuidv4()}>
                <div className="cTotalResume">
                  <div>
                   <p className="cFontTypeTitleSB"> Total = {"$"+totalCost} </p> 
                  </div>
                </div> 
               </React.Fragment>}
            
          

          
          
          
          
        </div>
        
        

    </div>
  )
}