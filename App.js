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




function App(){

  const [state, setState] = useState({
    menu: menulist,
    costumers: {},
    sCostumer: "",
  })

  const[userState, setUserState] = useState({log: false, name:'', type: ""})

  const [classState, setClass] = useState({
    MenuBQ:"cContournMenuWithEvents",
    MenuS:"cMenuSWithEvents",
    Button: "cDoEvent",
  })

  const [orders, setOrders] = useState({})

  useEffect(() => {

    const firebaseConfig = {
      apiKey: "AIzaSyA1EUw7Yp4Z2O-wl7MqyV9zTc2tPZB5z0w",
      authDomain: "burgerqueendb-3614e.firebaseapp.com",
      projectId: "burgerqueendb-3614e",
      storageBucket: "burgerqueendb-3614e.appspot.com",
      messagingSenderId: "38992262003",
      appId: "1:38992262003:web:01c5062677b18111444b06",
    };

    initializeApp(firebaseConfig);
    const db = getFirestore();
    const auth = getAuth()
  
    onAuthStateChanged(auth, async (user) => {
      if (user)  {

        await getDoc(doc(db,"validUsers", user.email)).then((doc) => {
          let tempUser = userState
          tempUser.type = doc.data().status.type
          tempUser.name = user.email
          tempUser.log = true
        })

        switch(userState.type){
          case "admin":
            break
          case "waiter":
      
            onSnapshot(doc(db, "validUsers", user.email, ), (doc) => {
              const newCostumer = state.costumers
              const newSCostumer = state

              Object.keys(doc.data().costumers).forEach((costumer,i) => {
                let noty = 0
                const ordersInKitchen = {}
                if(i === 0 ){
                  newSCostumer.sCostumer = costumer
                }
                Object.keys(doc.data().costumers[costumer].orders).forEach(stateItem => {
                  if(doc.data().costumers[costumer].orders[stateItem].state ==="ready") noty=1
                  if(doc.data().costumers[costumer].orders[stateItem].state === "ready" 
                  || doc.data().costumers[costumer].orders[stateItem].state === "doing") 
                  ordersInKitchen[stateItem] = doc.data().costumers[costumer].orders[stateItem] 
                })
                newCostumer[costumer] = {menuSelected: Object.keys(state.menu)[0], orders:{}, noty: noty, ordersInKitchen:ordersInKitchen}
              })
              fnData("render")
              
            });
            break
          case "kitchen":

            onSnapshot(doc(db, "validUsers", "waiter@bqueen.com", ), (doc) => {
              //const newCostumer = state.costumers
              //const newSCostumer = state
              Object.keys(doc.data().costumers).forEach((costumer,i) => {
                if(i === 0 ){
                  //newSCostumer.sCostumer = costumer
                }
                setOrders(doc.data().costumers)
                //newCostumer[costumer] = {menuSelected: Object.keys(state.menu)[0], orders:{}}
              })
            });
            break
          default:
        }
        
      } else {
        console.log("No Loged")
      }
    })


  },[userState])

  const fnData = (data, value, costumer, x, y) => {

    switch(data) {
      case 'logIn': setState({
        ...state,
        user: {
          ...state.user,
          log: value,
          name: costumer,
          type: y,
        },
        sCostumer: x,
      })
      break
      case 'logOut': setState({
        ...state,
        sCostumer: "",
        costumers : {},
      })
      setUserState({...userState, log: false, name:"", type:""})
      break
      case 'user': setState({
        ...state,
        user: {
          ...state.user,
          name: value
        }
      })
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
      case 'render': setState({...state, sCostumer: state.sCostumer})
      break
      default: console.log("Error Data Type to Modify")
    }


  }

  return (

    <div key={uuidv4()} className="App">
      <MenuS key={uuidv4()} state = {state} fnData = {fnData} classState = {classState} userState = {userState}/>
      <ContentPage key={uuidv4()} state = {state} classState = {classState} fnData = {fnData} orders = {orders} userState = {userState}/>
      <MenuD state = {state} fnData = {fnData} userState = {userState}/>
    </div>
    
  );
}

export default App;
