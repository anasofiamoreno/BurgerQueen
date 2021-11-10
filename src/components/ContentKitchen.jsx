import { useEffect } from "react";
import React from "react";
import { OrderStick } from "./OrderStick";

export function ContentKitchen({ state, fnData, orders }) {
  console.log(orders);
  useEffect(() => {
    let ordersArray = Object.keys(orders);
    console.log(ordersArray);
  }, []);

  return (
    <div className="cContenteKitchen">
      {Object.keys(orders).map((costumer) => {
        return Object.keys(orders[costumer]).map((order) => {
          return (
            <OrderStick
              name={costumer}
              ordername={order}
              order={orders[costumer][order]}
            />
          );
        });
      })}
    </div>
  );
}
