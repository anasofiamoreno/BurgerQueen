import { useEffect } from "react";
import React from "react";

export function OrderStick({ name, order }) {
  //delete order.menuSelected;
  //delete order.date;
  console.log(order);
  useEffect(() => {
    let ordersArray = Object.keys(order);
    console.log(ordersArray);
  }, []);

  return (
    <div className="cPostick">
      <div>
        <h3>{name}</h3>
      </div>
      <div>
        <table className="cTablePostick">
          <thead>
            <tr>
              <th>Cuantity</th>
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
        <button className="cButtonType04">Ready</button>
      </div>
    </div>
  );
}
