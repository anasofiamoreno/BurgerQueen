import {React} from 'react'
import {MenuBQ} from './MenuBQ'
import {ResumeOrder} from './ResumeOrder'
import {LogIn } from './LogIn'
import Logo from"../img/logo.png"
import { v4 as uuidv4 } from 'uuid';


export function ContentPage({state, fnData}) {

  const  fnChange = () => {

    if(state.user.log){
      fnData('log', false)
    }
    else{
      fnData('log', true)
    }
 
  }
console.log(Object.entries(state.costumers).length)

  return (
    <div id="idContentP" key={uuidv4()} className="cContentP">
      <button onClick={fnChange}>Simulate LogIn</button>
      <LogIn />
      {Object.entries(state.costumers).length !==0 && <MenuBQ key={uuidv4()}  state={state} fnData = {fnData}/> }
      {Object.entries(state.costumers).length !==0 && <ResumeOrder key={uuidv4()}  state={state}/> }
      {Object.entries(state.costumers).length === 0 && <img key={uuidv4()} className='cImgBack' src={Logo} alt='Logo BurgerQueen'></img> }
    </div>

  )

  
}