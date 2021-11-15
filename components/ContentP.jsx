import { React } from "react";
import { MenuBQ } from "./MenuBQ";
import { ResumeOrder } from "./ResumeOrder";
import { ContentKitchen } from "./ContentKitchen";
import { LogIn } from "./LogIn";
import Logo from "../img/logo.png";
import { v4 as uuidv4 } from "uuid";

export function ContentPage({ state, fnData, classState, orders, userState }) {
  return (
    <div id="idContentP" key={uuidv4()} className="cContentP">
      <LogIn fnData={fnData} userState={userState} />

      {Object.entries(state.costumers).length !== 0 &&
        userState.type === "waiter" &&
        userState.log === true && (
          <MenuBQ
            key={"MenuBQ"}
            state={state}
            classState={classState}
            fnData={fnData}
          />
        )}
      {Object.entries(state.costumers).length !== 0 &&
        userState.type === "waiter" &&
        userState.log === true && (
          <ResumeOrder
            key={uuidv4()}
            state={state}
            fnData={fnData}
            classState={classState}
            userState={userState}
          />
        )}
      {userState.type === "kitchen" && userState.log === true && (
        <>
          <ContentKitchen orders={orders} />
        </>
      )}

      {Object.entries(state.costumers).length === 0 &&
        userState.log === false && (
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
