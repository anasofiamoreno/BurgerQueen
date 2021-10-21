import {menulist} from './listmenu'

  const state = {
    sCostumer: "",
    costumers: {},
    user: {log:true,},
    menu : menulist,
  }

  const setState = (input) => {
    console.log("setState", input)
  }

  const fnData = (data, value, costumer) => {
    console.log(data, value)
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
        //sCostumer: value,
        ...state.sCostumer = value,
        
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
     console.log("state",state)
  }

  module.exports = {state, fnData, setState}