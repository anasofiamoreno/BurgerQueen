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

export function ResumeOrder({ state, fnData, classState }) {
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
    costumerArray = Object.entries(costumerArray[1]);
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
      console.log(data);
      if (data != null) setOrderInProgress(Object.keys(data).length);
    });
  };

  if (orderInProgress === 0) {
    fnOrderInProgress();
  }

  const fnSendOrderToServer = () => {
    fnData("noEvents");
  };

  const fnConfirm = async () => {
    if (orderInProgress == 0) {
      console.log("if", orderInProgress);
      await set(
        ref(
          setdb,
          "orders/" +
            state.user.name.slice(0, 1 + state.user.name.search("@")) +
            "/" +
            state.sCostumer
        ),
        {
          [uuidv4().slice(0, 8)]: state.costumers[state.sCostumer],
        }
      );
    } else {
      console.log("else", orderInProgress);
      const nesOrder = {
        [uuidv4().slice(0, 8)]: state.costumers[state.sCostumer],
      };
      const updates = {};
      updates[
        "orders/" +
          state.user.name.slice(0, 1 + state.user.name.search("@")) +
          "/" +
          state.sCostumer +
          "/" +
          [uuidv4().slice(0, 8)]
      ] = state.costumers[state.sCostumer];
      await update(ref(setdb), updates);
    }

    let items = state.costumers[state.sCostumer];
    items = { menuSelected: state.costumers[state.sCostumer].menuSelected };
    fnData("changCostumer", items);

    fnData("doEvents");
  };

  const fnBack = () => {
    fnData("doEvents");
  };

  const fnClear = () => {
    const newCostumer = state.costumers;
    delete newCostumer[state.sCostumer];
    console.log(newCostumer);
    newCostumer[state.sCostumer] = {
      menuSelected: Object.keys(state.menu)[0],
    };
    fnData("delCostumers", newCostumer);
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
