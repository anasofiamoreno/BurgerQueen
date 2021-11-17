import React, { useState } from "react";
import Logo from "../img/logo.png";
import notify from "../img/iconburgerred01png.png";
import { v4 as uuidv4 } from "uuid";

export function MenuS({ state, fnData, classState, userState, sCostumer }) {
  const [inputCostumer, setinputCostumer] = useState(false);
  const fnShowMenuLogIn = () => {
    document.getElementById("idLogIn").style.display = "block";
  };

  const fnCreateOrder = () => {
    if (document.getElementById("idInputNewC").value !== "") {
      const nameCostumer = document.getElementById("idInputNewC").value;
      const newCostumer = state.costumers;
      newCostumer[nameCostumer] = {
        menuSelected: Object.keys(state.menu)[0],
        orders: {},
        noty: 0,
        ordersInKitchen: {},
      };

      fnData("setAllCostumers", newCostumer);
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
        {Object.entries(state.costumers).map((element, i) => (
          <div key={element[0] + i} className="cBtonwithNoty">
            <button
              key={uuidv4()}
              id={element[0]}
              className="cButtonTypNoty"
              onClick={fnChangeCostumer}
            >
              {element[0]}
            </button>
            {state.costumers[element[0]].noty === 1 && (
              <img
                key={"noty" + element[0]}
                className="cImgNoty"
                src={notify}
                alt="noty"
              ></img>
            )}
          </div>
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
          <>
            <button
              key={uuidv4()}
              onClick={fnCreateOrder}
              id="addNewC"
              className="cButtonType00"
            >
              Add Costumer
            </button>
            <button
              key={uuidv4()}
              onClick={() => {
                setinputCostumer(false);
              }}
              id="addNewC"
              className="cButtonType00Red"
            >
              X
            </button>
          </>
        )}

        {!userState.log && (
          <button
            key={uuidv4()}
            onClick={fnShowMenuLogIn}
            id="idBtnLogIn"
            className="cButtonType00"
          >
            LogIn
          </button>
        )}
        {userState.log &&
          userState.type === "waiter" &&
          Object.keys(state.costumers).length < 5 &&
          !inputCostumer && (
            <button
              key={uuidv4()}
              onClick={fnShowNewCostumer}
              id="idBtnCreateOrder"
              className="cButtonType00"
            >
              Create Order
            </button>
          )}
      </div>
    </div>
  );
}
