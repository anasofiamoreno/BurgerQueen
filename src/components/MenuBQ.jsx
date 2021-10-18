import {React,useState} from 'react'
import {MenuItem} from './MenuItem'

export function MenuBQ({state, fnData}) {

  const [selectedMenu, setSelectedMenu] = useState([[],"breakfast"])
    
  const menuBreakfast = Object.keys(state.menu.breakfast)
  const menuDiner = Object.keys(state.menu.diner)
  if(selectedMenu[0].length === 0) setSelectedMenu([menuBreakfast,"breakfast"])

  const fnShowMenu = (items, typeMenu,) =>{
    
    switch(typeMenu){
      case "breakfast":  setSelectedMenu([items, "breakfast"])
        break
      case "diner": setSelectedMenu([items, "diner"])
        break
      default:
    }
 console.log(selectedMenu
  )
  }


  return (
    <div id="idMenuBQ" className="cMenuBQ">
      <div className="cContournMenu">
          <div className="cContournMenuSup">
            <button onClick = {() => fnShowMenu(menuBreakfast, "breakfast")} className="cButtonType01 cFontTypeTitleM" type="button">Breakfast</button>
            <button onClick = {() => fnShowMenu(menuDiner, "diner")} className="cButtonType01 cFontTypeTitleM" type="button">Diner</button>   
          </div>
          <div className="cContournMenuDow">
            <table className="cTable cFontTypeTitleS">
              <tbody>
                <tr>
                <th>Dish</th>
                <th>Price</th>
              </tr>
              {
                selectedMenu[0].map((element, i) => 
                <MenuItem key = {element} item = {element} price = {state.menu[selectedMenu[1]][element].price} state = {state} fnData ={fnData} />
                )
              }
              </tbody>
              
            </table>
          </div>
      </div>
    </div>
  )
}