import React from "react";
import { updateDoc, doc, getFirestore } from "firebase/firestore";

export function OrderStick({ name, order, ordername, date, state, orderTime }) {
  const fnBtnReady = async () => {
    const db = getFirestore();

    const second = (Date.now() - date) / 1000;
    const minuts = second / 60;
    const hours = minuts / 60;
    const readyTime =
      "Hours: " +
      Math.trunc(hours) +
      " Minuts: " +
      Math.trunc((hours - Math.trunc(hours)) * 60);

    const refk = doc(db, "validUsers", "kitchen@bqueen.com");
    await updateDoc(refk, {
      ["record." + ordername + ".order"]: order,
      ["record." + ordername + ".time"]: readyTime,
    });

    const refw = doc(db, "validUsers", "waiter@bqueen.com");
    await updateDoc(refw, {
      ["costumers." + name + ".orders." + ordername + ".state"]: "ready",
      ["costumers." + name + ".orders." + ordername + ".time"]: readyTime,
    });
  };

  const fnBtnStore = async () => {
    const db = getFirestore();
    const refw = doc(db, "validUsers", "waiter@bqueen.com");
    await updateDoc(refw, {
      ["costumers." + name + ".orders." + ordername + ".state"]: "stored",
    });
  };

  return (
    <div className="cPostick">
      <div>
        <h3>Order #{ordername}</h3>
        {state === "ready" && <h4>{orderTime}</h4>}
      </div>
      <div>
        <table className="cTablePostick">
          <thead>
            <tr>
              <th>Qty</th>
              <th>Item</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(order).map((item) => {
              return (
                <tr>
                  <td>{order[item].quantity}</td>
                  <td>{item}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="cBtnReady">
        {state === "doing" && (
          <button className="cButtonType04" onClick={fnBtnReady}>
            Ready
          </button>
        )}
        {state === "ready" && (
          <button className="cButtonType05" onClick={fnBtnStore}>
            Store Order
          </button>
        )}
      </div>
    </div>
  );
}
