import React from "react";
import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";

export function MenuD({ state, fnData, userState }) {
  const makeLogOut = () => {
    const firebaseConfig = {
      apiKey: "AIzaSyA1EUw7Yp4Z2O-wl7MqyV9zTc2tPZB5z0w",
      authDomain: "burgerqueendb-3614e.firebaseapp.com",
      projectId: "burgerqueendb-3614e",
      storageBucket: "burgerqueendb-3614e.appspot.com",
      messagingSenderId: "38992262003",
      appId: "1:38992262003:web:01c5062677b18111444b06",
    };
    initializeApp(firebaseConfig);
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        fnData("logOut");
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
          <button className="cButtonType00" onClick={makeLogOut}>
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
