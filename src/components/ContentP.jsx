import { React } from "react";
import { MenuBQ } from "./MenuBQ";
import { ResumeOrder } from "./ResumeOrder";
import { LogIn } from "./LogIn";
import Logo from "../img/logo.png";
import { v4 as uuidv4 } from "uuid";

export function ContentPage({ state, fnData, classState }) {
  return (
    <div id="idContentP" key={uuidv4()} className="cContentP">
      <LogIn fnData={fnData} />
      {console.log(
        Object.entries(state.costumers).length,
        state.user.log,
        state
      )}
      {Object.entries(state.costumers).length !== 0 &&
        state.user.log === true && (
          <MenuBQ
            key={"MenuBQ"}
            state={state}
            classState={classState}
            fnData={fnData}
          />
        )}
      {Object.entries(state.costumers).length !== 0 &&
        state.user.log === true && (
          <ResumeOrder
            key={uuidv4()}
            state={state}
            fnData={fnData}
            classState={classState}
          />
        )}
      {Object.entries(state.costumers).length === 0 &&
        state.user.log === false && (
          <img
            key={uuidv4()}
            className="cImgBack"
            src={Logo}
            alt="Logo BurgerQueen"
          ></img>
        )}
    </div>
  );
}
