import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { getFirestore, updateDoc, doc, deleteField } from "firebase/firestore";
import { ref, getDatabase, update } from "firebase/database";

export function ResumeOrder({ state, fnData, classState, userState }) {
  const [orderInProgress, setOrderInProgress] = useState(0);

  useEffect(() => {
    console.log();
    setOrderInProgress(
      Object.keys(state.costumers[state.sCostumer].ordersInKitchen).length
    );
  }, [orderInProgress, state.sCostumer, state.costumers]);

  let costumerArray = [];
  let totalCost = 0;
  const db = getFirestore();
  const setdb = getDatabase();

  if (Object.entries(state.costumers).length >= 1) {
    costumerArray = ["", "no entries"];
    costumerArray = Object.entries(state.costumers).find(
      (element) => element[0] === state.sCostumer
    );
    costumerArray = Object.entries(costumerArray[1].orders);
    costumerArray.forEach((element) => {
      element[0] !== "menuSelected" &&
        (totalCost += element[1].quantity * element[1].price);
    });
  }

  const fnSendOrderToServer = () => {
    fnData("noEvents");
  };

  const fnConfirm = async () => {
    const date = Date.now();
    const nOrder = uuidv4().slice(0, 8);

    let tempOrder = state.costumers[state.sCostumer];
    tempOrder.date = date;
    if (orderInProgress === 0) {
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
    } else {
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

  const fnShowOrdersInProgress = () => {
    return (
      <table>
        <thead>
          <tr>
            <th>Order</th>
            <th>State</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(state.costumers[state.sCostumer].ordersInKitchen).map(
            (itemss) => {
              return (
                <tr>
                  <td>{itemss[0]}</td>
                  <td>{itemss[1].state}</td>
                  <td>
                    {itemss[1].state === "doing" && (
                      <button
                        className="cButtonType00"
                        onClick={() => {
                          fnEditStateOrder(itemss[0], "cancel");
                        }}
                      >
                        Cancel Order
                      </button>
                    )}
                    {itemss[1].state === "ready" && (
                      <button
                        className="cButtonType00"
                        onClick={() => {
                          fnEditStateOrder(itemss[0], "served");
                        }}
                      >
                        Served
                      </button>
                    )}
                  </td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
    );
  };

  const fnEditStateOrder = async (order, newState) => {
    const Ref = doc(db, "validUsers", userState.name);

    await updateDoc(Ref, {
      ["costumers." + [state.sCostumer] + ".orders." + order + ".state"]:
        newState,
    });
  };

  const fnDeleteCostumer = async () => {
    const Ref = doc(db, "validUsers", userState.name);

    await updateDoc(Ref, {
      ["costumers." + state.sCostumer]: deleteField(),
    });

    const newCostumer = {};
    Object.keys(state.costumers).forEach((costumer) => {
      if (costumer !== state.sCostumer)
        newCostumer[costumer] = state.costumers[costumer];
    });
    let newSCostumer = "";
    Object.keys(state.costumers).forEach((element, i) => {
      if (i === 0) {
        newSCostumer = element;
      }
    });
    console.log(newCostumer);
    fnData("teste", newCostumer, newSCostumer);
  };

  return (
    <div key={uuidv4()} id="idResumeOrder" className="cResumeOrder">
      <div key={uuidv4()} className="cContournResumeOrder">
        <div>
          <p key={uuidv4()} className="cFontTypeTitleMB">
            Resume {state.sCostumer}
          </p>

          {totalCost === 0 && (
            <>
              <div className="cEditOrders">
                <p className="cFontTypeTitleMB">
                  {orderInProgress} Orders In Progress
                </p>

                {orderInProgress === 0 && (
                  <button className="cButtonType00" onClick={fnDeleteCostumer}>
                    Delet Costumer
                  </button>
                )}
                {orderInProgress !== 0 && fnShowOrdersInProgress()}
              </div>
            </>
          )}

          {totalCost !== 0 && (
            <table key={uuidv4()} className="cTableResume cFontTypeTextS">
              <thead>
                <tr>
                  <th>Dish</th>
                  <th>Qty</th>
                  <th>Price</th>
                </tr>
              </thead>
            </table>
          )}
          <div className="cTableResumeSup">
            <table key={uuidv4()} className="cTableResume cFontTypeTextS">
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
          </div>
        </div>

        {costumerArray.length > 0 && (
          <React.Fragment key={uuidv4()}>
            <div className="cTotalResume">
              <div>
                <p className="cFontTypeTextSB"> Total = {"$" + totalCost} </p>
              </div>
            </div>
          </React.Fragment>
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
