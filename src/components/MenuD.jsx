import React from "react";
import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import { firebaseConfig } from "../keyFireBase";

export function MenuD({ fnData, userState }) {
  const makeLogOut = () => {
    initializeApp(firebaseConfig);
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        fnData("logOut");
        fnData("setAllCostumers", {});
        fnData("sCostumer", "");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <div id="idMenuD" className="cMenuD">
      <div className="cMenuSI">
        <p className="cFontTypeTitleS_White">{userState.name}</p>
      </div>
      <div className="cMenuSD">
        {userState.log && (
          <button className="cButtonTypeLogOut" onClick={makeLogOut}>
            Log Out
          </button>
        )}
        {userState.type === "admin" && (
          <div className="cFontTypeTitleS_White">
            <input type="checkbox" id="serv1" value="servFB" /> Server FireBase
            <input type="checkbox" id="serv2" value="servLocal" /> Server Local
          </div>
        )}
      </div>
    </div>
  );
}
