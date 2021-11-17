import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { getFirestore, updateDoc, doc, deleteField } from "firebase/firestore";

export function ResumeOrder({
  state,
  fnData,
  classState,
  userState,
  sCostumer,
}) {
  const [orderInProgress, setOrderInProgress] = useState(0);

  useEffect(() => {
    setOrderInProgress(
      Object.keys(state.costumers[sCostumer].ordersInKitchen).length
    );
  }, [orderInProgress, sCostumer, state.costumers]);

  let costumerArray = [];
  let totalCost = 0;
  const db = getFirestore();

  if (Object.entries(state.costumers).length >= 1) {
    costumerArray = ["", "no entries"];
    costumerArray = Object.entries(state.costumers).find(
      (element) => element[0] === sCostumer
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

    let tempOrder = state.costumers[sCostumer];
    tempOrder.date = date;

    const Ref = doc(db, "validUsers", userState.name);

    await updateDoc(Ref, {
      ["costumers." + [sCostumer] + ".orders." + nOrder + ".items"]:
        state.costumers[sCostumer].orders,

      ["costumers." + [sCostumer] + ".orders." + nOrder + ".date"]: date,

      ["costumers." + [sCostumer] + ".orders." + nOrder + ".state"]: "doing",

      ["costumers." + [sCostumer] + ".orders." + nOrder + ".time"]: "",

      sCostumer: sCostumer,
    });

    let items = state.costumers[sCostumer];
    items.orders = {};
    fnData("doEvents");
  };

  const fnBack = () => {
    fnData("doEvents");
  };

  const fnClear = () => {
    const newCostumer = state.costumers;
    newCostumer[sCostumer].orders = {};
    fnData("render");
    //fnData("delCostumers", newCostumer);
  };

  const fnShowOrdersInProgress = () => {
    return (
      <table className="cTableStatusOrders">
        <thead>
          <tr>
            <th>Order</th>
            <th>State</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(state.costumers[sCostumer].ordersInKitchen).map(
            (itemss) => {
              return (
                <tr key={itemss[0]}>
                  <td>{"No. " + itemss[0]}</td>
                  <td>
                    {itemss[1].state.charAt(0).toUpperCase() +
                      itemss[1].state.slice(1)}
                  </td>
                  <td>
                    {itemss[1].state === "doing" && (
                      <button
                        className="cButtonType00WithOutMarginRed"
                        onClick={() => {
                          fnEditStateOrder(itemss[0], "cancel");
                        }}
                      >
                        Cancel
                      </button>
                    )}
                    {itemss[1].state === "ready" && (
                      <button
                        className="cButtonType00WithOutMarginGreen"
                        onClick={() => {
                          fnEditStateOrder(itemss[0], "served");
                        }}
                      >
                        Done
                      </button>
                    )}
                    {itemss[1].state === "stored" && (
                      <button
                        className="cButtonType00WithOutMarginGreen"
                        onClick={() => {
                          fnEditStateOrder(itemss[0], "served");
                        }}
                      >
                        Done
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
      ["costumers." + [sCostumer] + ".orders." + order + ".state"]: newState,
      sCostumer: sCostumer,
    });
  };

  const fnDeleteCostumer = async () => {
    const Ref = doc(db, "validUsers", userState.name);

    const newCostumer = {};
    Object.keys(state.costumers).forEach((costumer) => {
      if (costumer !== sCostumer)
        newCostumer[costumer] = state.costumers[costumer];
    });

    fnData("setAllCOstumers", newCostumer);

    await updateDoc(Ref, {
      ["costumers." + sCostumer]: deleteField(),
      sCostumer: "",
    });
  };

  return (
    <div key={uuidv4()} id="idResumeOrder" className="cResumeOrder">
      <div key={uuidv4()} className="cContournResumeOrder">
        <div>
          <p key={uuidv4()} className="cFontTypeTitleMB">
            Resume {sCostumer}
          </p>

          {totalCost === 0 && (
            <>
              <div className="cEditOrders">
                <p className="cFontTypeTitleMB">
                  {orderInProgress} Orders In Progress
                </p>

                {orderInProgress === 0 && (
                  <button
                    className="cButtonTypeDeleteCostumer"
                    onClick={fnDeleteCostumer}
                  >
                    Delete Costumer
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
                className="cButtonTypeConfirmOr cFontTypeTitleM"
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
