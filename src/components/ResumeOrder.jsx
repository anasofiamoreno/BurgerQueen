import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  getFirestore,
  setDoc,
  getDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { set, ref, getDatabase, get, onValue, update } from "firebase/database";

export function ResumeOrder({ state, fnData, classState, userState }) {
  const [orderInProgress, setOrderInProgress] = useState(0);

  let costumerArray = [];
  let totalCost = 0;
  const db = getFirestore();
  const setdb = getDatabase();

  if (Object.entries(state.costumers).length >= 1) {
    costumerArray = ["", "no entries"];
    costumerArray = Object.entries(state.costumers).find(
      (element) => element[0] === state.sCostumer
    );
    console.log(costumerArray);
    costumerArray = Object.entries(costumerArray[1].orders);
    costumerArray.forEach((element) => {
      element[0] !== "menuSelected" &&
        (totalCost += element[1].quantity * element[1].price);
    });
  }

  const fnOrderInProgress = async () => {
    const starCountRef = ref(
      setdb,
      "orders/" +
        state.user.name.slice(0, 1 + state.user.name.search("@")) +
        "/" +
        state.sCostumer
    );
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      //if (data != null) setOrderInProgress(Object.keys(data).length);
    });

    const docRef = doc(db, "validUsers", userState.name);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log(docSnap.data());
      if (docSnap.data().costumers[state.sCostumer] != undefined)
        setOrderInProgress(
          Object.keys(docSnap.data().costumers[state.sCostumer].orders).length
        );
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  if (orderInProgress === 0) {
    fnOrderInProgress();
  }

  const fnSendOrderToServer = () => {
    fnData("noEvents");
  };

  const fnConfirm = async () => {
    const date = Date.now();
    const nOrder = uuidv4().slice(0, 8);

    let tempOrder = state.costumers[state.sCostumer];
    tempOrder.date = date;
    if (orderInProgress == 0) {
      const washingtonRef = doc(db, "validUsers", userState.name);

      // Set the "capital" field of the city 'DC'
      await updateDoc(washingtonRef, {
        ["costumers." + [state.sCostumer] + ".orders." + nOrder + ".items"]:
          state.costumers[state.sCostumer].orders,

        ["costumers." + [state.sCostumer] + ".orders." + nOrder + ".date"]:
          date,

        ["costumers." + [state.sCostumer] + ".orders." + nOrder + ".state"]:
          "doing",

        ["costumers." + [state.sCostumer] + ".orders." + nOrder + ".time"]: "",
      });

      await set(
        ref(
          setdb,
          "orders/" +
            state.user.name.slice(0, 1 + state.user.name.search("@")) +
            "/" +
            state.sCostumer
        ),
        {
          [uuidv4().slice(0, 8)]: tempOrder,
        }
      );
    } else {
      const nesOrder = {
        [uuidv4().slice(0, 8)]: state.costumers[state.sCostumer].orders,
      };

      const washingtonRef = doc(db, "validUsers", userState.name);

      // Set the "capital" field of the city 'DC'
      await updateDoc(washingtonRef, {
        ["costumers." + [state.sCostumer] + ".orders." + nOrder + ".items"]:
          state.costumers[state.sCostumer].orders,

        ["costumers." + [state.sCostumer] + ".orders." + nOrder + ".date"]:
          date,

        ["costumers." + [state.sCostumer] + ".orders." + nOrder + ".state"]:
          "doing",

        ["costumers." + [state.sCostumer] + ".orders." + nOrder + ".time"]: "",
      });

      const updates = {};
      updates[
        "orders/" +
          state.user.name.slice(0, 1 + state.user.name.search("@")) +
          "/" +
          state.sCostumer +
          "/" +
          [uuidv4().slice(0, 8)]
      ] = tempOrder;

      await update(ref(setdb), updates);
    }

    let items = state.costumers[state.sCostumer];
    items.orders = {};
    fnData("changCostumer", items);

    fnData("doEvents");
  };

  const fnBack = () => {
    fnData("doEvents");
  };

  const fnClear = () => {
    const newCostumer = state.costumers;
    newCostumer[state.sCostumer].orders = {};
    fnData("render");
    //fnData("delCostumers", newCostumer);
  };

  return (
    <div key={uuidv4()} id="idResumeOrder" className="cResumeOrder">
      <div key={uuidv4()} className="cContournResumeOrder">
        <div>
          <p key={uuidv4()} className="cFontTypeTitleMB">
            Resume {state.sCostumer}
          </p>
          <table key={uuidv4()} className="cTableResume cFontTypeTextS">
            <thead>
              <tr>
                <th>Dish</th>
                <th>Qty</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody className="cTableResumeMargin">
              {costumerArray.map((element) => {
                return (
                  element[0] !== "menuSelected" && (
                    <React.Fragment key={uuidv4()}>
                      <tr>
                        <td>{element[0]}</td>
                        <td>{element[1].quantity}</td>
                        <td>{"$" + element[1].price}</td>
                      </tr>
                    </React.Fragment>
                  )
                );
              })}
            </tbody>
          </table>

          {costumerArray.length > 0 && (
            <React.Fragment key={uuidv4()}>
              <div className="cTotalResume">
                <div>
                  <p className="cFontTypeTextSB"> Total = {"$" + totalCost} </p>
                </div>
              </div>
            </React.Fragment>
          )}
        </div>
        {orderInProgress > 0 && (
          <div>
            <p>Orders In Progress</p>
            <p>{orderInProgress}</p>
          </div>
        )}

        <div>
          {classState.Button === "cNoEvent" && (
            <React.Fragment>
              <button
                className="cButtonTypeConfirmOr cFontTypeTitleM"
                onClick={fnConfirm}
              >
                Confirm Order
              </button>{" "}
              <button
                className="cButtonTypeBackOr cFontTypeTitleM"
                onClick={fnBack}
              >
                Back
              </button>
            </React.Fragment>
          )}
        </div>
        <div className={"cMakeOrder " + classState.Button}>
          {totalCost !== 0 && (
            <div>
              <button
                key={uuidv4()}
                className="cButtonTypeMkOr cFontTypeTitleM"
                type="button"
                onClick={fnSendOrderToServer}
              >
                Make Order
              </button>
              <button
                className="cButtonTypeClOr cFontTypeTitleM"
                onClick={fnClear}
              >
                {" "}
                Clear
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
