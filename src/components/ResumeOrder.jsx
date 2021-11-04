import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  getFirestore,
  setDoc,
  getDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

export function ResumeOrder({ state, fnData, classState }) {
  const [orderInProgress, setOrderInProgress] = useState("");

  const db = getFirestore();
  console.log("1", state.costumers, "2", state);
  //const costumerArray = Object.entries(state.costumers.find(element => element.name === state.sCostumer))
  //console.log(Object.entries(state.costumers).length)
  let costumerArray = [];
  let totalCost = 0;
  if (Object.entries(state.costumers).length >= 1) {
    costumerArray = ["", "no entries"];
    costumerArray = Object.entries(state.costumers).find(
      (element) => element[0] === state.sCostumer
    );
    costumerArray = Object.entries(costumerArray[1]);
    console.log(costumerArray);
    costumerArray.forEach((element) => {
      element[0] !== "menuSelected" &&
        (totalCost += element[1].quantity * element[1].price);
    });
  }
  const jj = async () => {
    const temp = await getDoc(doc(db, state.user.name, state.sCostumer));
    if (temp.exists()) {
      setOrderInProgress(temp.data());
    }

    console.log(orderInProgress);
  };
  if (orderInProgress === "") {
    jj();
  }

  const fnSendOrderToServer = () => {
    fnData("noEvents");
  };

  const fnConfirm = async () => {
    if (orderInProgress.length === 0) {
      await setDoc(doc(db, state.user.name, state.sCostumer), {
        [uuidv4().slice(0, 8)]: state.costumers[state.sCostumer],
      });
    } else {
      await updateDoc(doc(db, state.user.name, state.sCostumer), {
        [uuidv4().slice(0, 8)]: state.costumers[state.sCostumer],
      });
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
    newCostumer[state.sCostumer] = { menuSelected: Object.keys(state.menu)[0] };
    fnData("delCostumers", newCostumer);
  };

  return (
    <div key={uuidv4()} id="idResumeOrder" className="cResumeOrder">
      <div key={uuidv4()} className="cContournResumeOrder">
        <div>
          <p key={uuidv4()} className="cFontTypeTitleM">
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
        {Object.keys(orderInProgress).length > 0 && (
          <div>
            <p>Orders In Progress</p>
            <p>{Object.keys(orderInProgress).length}</p>
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
