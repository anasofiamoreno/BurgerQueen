import React, { useState } from "react";
import Logo from "../img/logo.png";
import { v4 as uuidv4 } from "uuid";

export function MenuS({ state, fnData, classState }) {
  const [inputCostumer, setinputCostumer] = useState(false);
  const fnShowMenuLogIn = () => {
    document.getElementById("idLogIn").style.display = "block";
  };

  const fnCreateOrder = () => {
    if (document.getElementById("idInputNewC").value !== "") {
      const nameCostumer = document.getElementById("idInputNewC").value;
      const newCostumer = state.costumers;
      console.log(Object.keys(state.menu)[0]);
      newCostumer[nameCostumer] = { menuSelected: Object.keys(state.menu)[0] };

      fnData("setCostumers", newCostumer);
      fnData("sCostumer", nameCostumer);

      //state = {state, sCostumer: nameCostumer}
      document.getElementById("idInputNewC").value = "";
      setinputCostumer(false);
    }
  };

  const fnShowNewCostumer = () => {
    setinputCostumer(true);
  };

  const fnChangeCostumer = (e) => {
    fnData("sCostumer", e.target.id);
  };

  //console.log(Object.entries(state.costumers))

  return (
    <div id="idMenuS" className={classState.MenuS}>
      <div className="cMenuSI">
        <img className="cImgLogo" src={Logo} alt="Logo BurgerQueen"></img>
        {Object.entries(state.costumers).map((element) => (
          <button
            key={uuidv4()}
            id={element[0]}
            className="cButtonType00"
            onClick={fnChangeCostumer}
          >
            {element[0]}
          </button>
        ))}
      </div>
      <div className="cMenuSD">
        {inputCostumer && (
          <input
            key={uuidv4()}
            type="text"
            id="idInputNewC"
            placeholder="Name of Costumer"
          />
        )}
        {inputCostumer && (
          <button
            key={uuidv4()}
            onClick={fnCreateOrder}
            id="addNewC"
            className="cButtonType00"
          >
            Add Costumer
          </button>
        )}
        {!state.user.log && (
          <button
            key={uuidv4()}
            onClick={fnShowMenuLogIn}
            id="idBtnLogIn"
            className="cButtonType00"
          >
            LogIn
          </button>
        )}
        {state.user.log && Object.keys(state.costumers).length < 5 && (
          <button
            key={uuidv4()}
            onClick={fnShowNewCostumer}
            id="idBtnCreateOrder"
            className="cButtonType00"
          >
            Creat Order
          </button>
        )}
      </div>
    </div>
  );
}
