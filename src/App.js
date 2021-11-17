import {MenuS} from './components/MenuS'
import {ContentPage} from './components/ContentP'
import {MenuD} from './components/MenuD'
import {React, useEffect, useState}  from 'react'  
import {menulist} from './data/listmenu'
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDoc, doc, onSnapshot } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { firebaseConfig } from "./keyFireBase"




function App(){

  initializeApp(firebaseConfig);
  const db = getFirestore();
  const auth = getAuth()

  const[userState, setUserState] = useState({log: false, name:'', type: "",})

  const[sCostumer, setSCostumer] = useState("")

  const[state, setState] = useState({menu: menulist, costumers: {},})

  const [orders, setOrders] = useState({})

  const [classState, setClass] = useState({
    MenuBQ:"cContournMenuWithEvents",
    MenuS:"cMenuSWithEvents",
    Button: "cDoEvent",
  })

  

  useEffect(() => {

    onAuthStateChanged(auth, async (user) => {
      console.log("Auto Login")
      if (user)  {

        await getDoc(doc(db,"validUsers", user.email)).then((doc) => {
          console.log("logIn")
          fnData("logIn", true, user.email, doc.data().status.type)
        })

      } else {
        console.log("No Loged")
      }
    })

  },[])

  useEffect(() =>{
    if(userState.log === true){
    switch(userState.type){
      case "admin":
        break
      case "waiter":

        onSnapshot(doc(db, "validUsers", userState.name, ), (doc) => {
          console.log("snapshot")
          const newCostumer = {}
          console.log("sCostumer=",sCostumer)
          Object.keys(doc.data().costumers).forEach((costumer,i) => {
            let noty = 0
            const ordersInKitchen = {}
            if(i === 0 && sCostumer === ""){
              doc.data().sCostumer === "" ? fnData("sCostumer",costumer) : fnData("sCostumer",doc.data().sCostumer)
            }
            Object.keys(doc.data().costumers[costumer].orders).forEach(stateItem => {
              if(doc.data().costumers[costumer].orders[stateItem].state ==="ready" || doc.data().costumers[costumer].orders[stateItem].state ==="stored") noty=1
              if(doc.data().costumers[costumer].orders[stateItem].state === "ready" 
              || doc.data().costumers[costumer].orders[stateItem].state === "doing" || doc.data().costumers[costumer].orders[stateItem].state === "stored") 
              ordersInKitchen[stateItem] = doc.data().costumers[costumer].orders[stateItem] 
            })
            newCostumer[costumer] = {menuSelected: Object.keys(state.menu)[0], orders:{}, noty: noty, ordersInKitchen:ordersInKitchen}
          })

          fnData("setAllCostumers", newCostumer)
        
          
        });
        break
      case "kitchen":
        onSnapshot(doc(db, "validUsers", "waiter@bqueen.com", ), (doc) => {
            setOrders(doc.data().costumers)
        });
        break
      default:
    }
  }
  },[userState])

  const fnData = (data, value, costumer, x, y) => {

    switch(data) {
      case 'logIn': setUserState({...useState, log: value, name: costumer, type: x,})
       break
      case 'logOut': setUserState({...userState, log: false, name:"", type:""})
       break
      case 'setCostumers': console.log("sisi")
      setState({
        ...state,
        costumers: {
          ...state.costumers[value],
          
        },
         sCostumer: costumer,
      })
      break
      case 'teste': console.log("teste")
      setState({
        ...state,
        costumers: value,
         sCostumer: costumer,
      })
      break
      case 'delCostumers':  console.log("sisi") 
      setState({
        ...state, costumers: value, sCostumer: Object.keys(state.costumers)[0],
      })
      break
      case 'sCostumer': setSCostumer(value
      )
      break
      case 'changCostumerz': setState({
        ...state,
        costumers: {
          ...state.costumers,
          [state.sCostumer]: value
        }
      })
      break
      case 'changeClass': setClass({
        ...classState , [value]: costumer,
      })
      break
      case 'noEvents': setClass({
        ...classState , MenuS: 'cMenuSWithoutEvents', MenuBQ: 'cContournMenuWithoutEvents', Button: "cNoEvent"
      })
      break
      case 'doEvents': setClass({
        ...classState , MenuS: 'cMenuSWithEvents', MenuBQ: 'cContournMenuWithEvents', Button: "cDoEvent"
      })
      break
      case 'chekedLog': setState({
        ...state,
        chekedLog: true,
      })
      break
      case 'setAllCostumers': setState({
        ...state,
        costumers: value,
      })
      break
      case 'render': setState({...state, sCostumer: sCostumer})
      break
      default: console.log("Error Data Type No finded", data )
    }


  }

  return (

    <div key={uuidv4()} className="App">
      <MenuS key={uuidv4()} state = {state} fnData = {fnData} classState = {classState} userState = {userState} sCostumer = {sCostumer}/>
      <ContentPage key={uuidv4()} state = {state} classState = {classState} fnData = {fnData} orders = {orders} userState = {userState} sCostumer = {sCostumer}/>
      <MenuD state = {state} fnData = {fnData} userState = {userState}/>
    </div>
    
  );
}

export default App;
