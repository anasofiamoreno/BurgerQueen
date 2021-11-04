import {MenuS} from './components/MenuS'
import {ContentPage} from './components/ContentP'
import {MenuD} from './components/MenuD'
import {React, useEffect, useState}  from 'react'  
import {menulist} from './data/listmenu'
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";



function App(){

  const [state, setState] = useState({
    user :{log: false, name:''},
    menu: menulist,
    costumers: {},
    sCostumer: "",
    chekedLog: false,
  })

  const [classState, setClass] = useState({
    MenuBQ:"cContournMenuWithEvents",
    MenuS:"cMenuSWithEvents",
    Button: "cDoEvent",
  })

  useEffect((setState) => {

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
       
        const Docs = await getDocs(query(collection(db,user.email)))  
        const newCostumer = state.costumers;
        Docs.forEach((doc) => {
          newCostumer[doc.id] = { menuSelected: Object.keys(state.menu)[0] };
        });
        
        fnData("log", true, user.email, Object.keys(state.costumers)[0] ? Object.keys(state.costumers)[0] : "");
        
        
      } else {
        console.log("se fue por aqui")
      }
    })


  },[state.user.log])

  const fnData = (data, value, costumer, x) => {
    console.log("Data =>", data, "Value =>", value, "Costumer=>", costumer)

    switch(data) {
      case 'log': setState({
        ...state,
        user: {
          ...state.user,
          log: value,
          name: costumer
        },
        sCostumer: x,
      })
      break
      case 'logOut': setState({
        ...state,
        user: {
          ...state.user,
          log: false,
          name: ""
        },
        sCostumer: "",
        costumers : {},
      })
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
      default: console.log("Error Data Type to Modify")
    }

    console.log('STATS =>',state)
    console.log('Class =>',classState)
  }

  return (

    <div key={uuidv4()} className="App">
      <MenuS key={uuidv4()} state = {state} fnData = {fnData} classState = {classState}/>
      <ContentPage key={uuidv4()} state = {state} classState = {classState} fnData = {fnData}/>
      <MenuD state = {state} fnData = {fnData}/>
    </div>
    
  );
}

export default App;
