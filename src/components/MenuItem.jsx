import React from 'react'

export function MenuItem({item, price, state, fnData}) {

  const fnSetItem = (option, item, price, state) =>{

    let items = state.costumers[state.sCostumer]
    
    switch(option){
      case "add":
        if(items[item] === undefined){
          items[item] = {quantity:1, type: false, "price": price}
        }
        else{
          items[item].quantity+=1
        }
        break;
      case "remove":
        items[item] && (items[item].quantity > 1) ?  items[item].quantity-=1 : delete items[item]
        break;
      default: return items
    }
    
    return items
    
  }

  return (
    <React.Fragment>
      <tr>
        <td>{item}</td>
        <td>{price}</td>
        <td>
          <div className="cContournMenuByItem">
            <button className="cButtonType03" onClick = {() => {fnData("changCostumer",fnSetItem("add", item, price, state))}} >+</button>
            <button className="cButtonType03" onClick = {() => {fnData("changCostumer",fnSetItem("remove", item, 0, state))}} >-</button>   
          </div> 
        </td>
        
      </tr>

      
    </React.Fragment>

    
 
  
  )   
}