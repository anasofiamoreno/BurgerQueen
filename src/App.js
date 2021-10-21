import {MenuS} from './components/MenuS'
import {ContentPage} from './components/ContentP'
import {MenuD} from './components/MenuD'
import {React, useState}  from 'react'  
import {menulist} from './data/listmenu'
import './App.css';
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [state, setState] = useState({
    user :{log: true, name:'No User Log'},
    menu: menulist,
    costumers: {},
    sCostumer: ""
  })

  

  const fnData = (data, value, costumer) => {
    console.log("Data =>", data, "Value =>", value)
    switch(data) {
      case 'log': setState({
        ...state,
        user: {
          ...state.user,
          log: value
        }
      })
      break
      case 'costumers': setState({
        ...state,
        costumers: {
          ...state.costumers[value]
          
        }
      })
      break
      case 'sCostumer': setState({
        ...state,
        sCostumer: value,
        
      })
      

      break
      case 'changCostumer': setState({
        ...state,
        costumers: {
          ...state.costumers,
          [state.sCostumer]: value
        }
      })
      break
      default: console.log("Error Data Type to Modify")
    }

    console.log('STATS =>',state)
  }

  return (
    <div key={uuidv4()} className="App">
      <MenuS key={uuidv4()} state = {state} fnData = {fnData}/>
      <ContentPage key={uuidv4()} state = {state} fnData = {fnData}/>
      <MenuD/>

    </div>
  );
}

export default App;
