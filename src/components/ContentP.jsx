import { React } from "react";
import { MenuBQ } from "./MenuBQ";
import { ResumeOrder } from "./ResumeOrder";
import { ContentKitchen } from "./ContentKitchen";
import { LogIn } from "./LogIn";
import Arrow from "../img/Arrow.png";
import Logo from "../img/logo.png";
import { v4 as uuidv4 } from "uuid";

export function ContentPage({
  state,
  fnData,
  classState,
  orders,
  userState,
  sCostumer,
}) {
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
            sCostumer={sCostumer}
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
            sCostumer={sCostumer}
          />
        )}
      {userState.type === "kitchen" && userState.log === true && (
        <>
          {userState.log === true &&
            userState.type === "kitchen" &&
            Object.keys(orders).length === 0 && (
              <p className="cFontTypeTitleMB">No Order on List</p>
            )}
          <ContentKitchen orders={orders} />
        </>
      )}

      {userState.log === false && (
        <img
          key={uuidv4()}
          className="cImgBack"
          src={Logo}
          alt="Logo BurgerQueen"
        ></img>
      )}

      {userState.log === true &&
        Object.keys(state.costumers).length === 0 &&
        userState.type === "waiter" && (
          <div className="cDivArrow">
            <p className="cFontTypeTitleMB">Create New Costumer</p>
            <img
              key={uuidv4()}
              className="cImgArrow"
              src={Arrow}
              alt="Logo BurgerQueen"
            ></img>
          </div>
        )}
    </div>
  );
}
