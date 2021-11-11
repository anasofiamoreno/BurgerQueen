import {MenuS} from './components/MenuS'
import {ContentPage} from './components/ContentP'
import {MenuD} from './components/MenuD'
import {React, useEffect, useState}  from 'react'  
import {menulist} from './data/listmenu'
import './App.css';
import { v4 as uuidv4 } from 'uuid';
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, query, getDoc, doc, onSnapshot } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { getDatabase, ref, onValue} from "firebase/database";



function App(){

  const [state, setState] = useState({
    user :{log: false, name:'', type: ""},
    menu: menulist,
    costumers: {},
    sCostumer: "",
    chekedLog: false,
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
    const realDB = getDatabase()

    

    onAuthStateChanged(auth, async (user) => {
      if (user)  {
        let type = ""
        console.log(user)

        await getDoc(doc(db,"validUsers", user.email)).then((doc) => {
          let tempUser = userState
          tempUser.type = doc.data().status.type
          tempUser.name = user.email
          tempUser.log = true
          
          //setUserState({...userState, log:true, name:user.email, type: doc.data().status.type})
        })

 
  
       
        switch(userState.type){
          case "admin":
            break
          case "waiter":
           
            

            onSnapshot(doc(db, "validUsers", user.email, ), (doc) => {
              const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
              const newCostumer = state.costumers
              const newSCostumer = state
              Object.keys(doc.data().costumers).forEach((costumer,i) => {
                if(i === 0 ){
                  newSCostumer.sCostumer = costumer
                }
                console.log(doc.data().costumer)
                newCostumer[costumer] = {menuSelected: Object.keys(state.menu)[0], orders:{}}
              })
              fnData("render")
              
            });


            
            
            
            

/*
            onValue(ref(realDB, "orders/waiter@" ), (snapshot) => {
              const data = snapshot.val();
              Object.keys(data).forEach((doc) => {
                newCostumer[doc] = { menuSelected: Object.keys(state.menu)[0] };
                });
                fnData("logIn", true, user.email, Object.keys(state.costumers)[0] ? Object.keys(state.costumers)[0] : "", type);
            });

            */

            break
          case "kitchen":


            onSnapshot(doc(db, "validUsers", "waiter@bqueen.com", ), (doc) => {
              const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
              //const newCostumer = state.costumers
              //const newSCostumer = state
              Object.keys(doc.data().costumers).forEach((costumer,i) => {
                if(i === 0 ){
                  //newSCostumer.sCostumer = costumer
                }
                setOrders(doc.data().costumers)
                //newCostumer[costumer] = {menuSelected: Object.keys(state.menu)[0], orders:{}}
              })
              //fnData("render")
              
            });
          
            const DocsOrders = await getDocs(query(collection(db,"waiter@bqueen.com")))  
            const newOrders = orders;

            onValue(ref(realDB, "orders/waiter@" ), (snapshot) => {
              const data = snapshot.val();
              console.log(data)
              //setOrders(data)
            });



            fnData("logIn", true, user.email, "", type);

            const getdb = getDatabase();
            const starCountRef = ref(getdb, 'usuarios/' + "Ana");
            onValue(starCountRef, (snapshot) => {
              const data = snapshot.val();
              console.log(data)
            });

            break
          default:
        }
        
        
        
      } else {
        console.log("se fue por aqui")
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

    console.log('STATS =>',state)
    console.log('Class =>',classState)
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
