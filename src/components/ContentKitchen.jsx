import { useEffect, useState } from "react";
import React from "react";
import { OrderStick } from "./OrderStick";
import { v4 as uuidv4 } from "uuid";

export function ContentKitchen({ state, fnData, orders }) {
  const [arr, setarr] = useState([]);

  useEffect(() => {
    let array = [];
    Object.keys(orders).map((costumer) => {
      return Object.keys(orders[costumer].orders).map((order) => {
        array.push({
          name: costumer,
          ordername: order,
          order: orders[costumer].orders[order].items,
          date: orders[costumer].orders[order].date,
        });
      });
    });
    console.log(array);

    array = array.sort((a, b) => {
      return a.date - b.date;
    });

    setarr(array);
  }, []);

  return (
    <div className="cContenteKitchen">
      {arr.map((order) => {
        return (
          <OrderStick
            key={uuidv4()}
            name={order.name}
            ordername={order.ordername}
            order={order.order}
          />
        );
      })}
    </div>
  );
}
