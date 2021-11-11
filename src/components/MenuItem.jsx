import React from "react";

export function MenuItem({ item, price, state, fnData }) {
  const fnAddItem = (item, price) => {
    let items = state.costumers[state.sCostumer].orders;
    if (items[item] === undefined) {
      items[item] = { quantity: 1, type: false, price: price };
    } else {
      items[item].quantity += 1;
    }
    //fnData("changCostumer", items);
    fnData("render");
  };

  const fnRemoveItem = () => {
    let items = state.costumers[state.sCostumer].orders;

    items[item] && items[item].quantity > 1
      ? (items[item].quantity -= 1)
      : delete items[item];

    //fnData("changCostumer", items);
    fnData("render");
  };

  return (
    <React.Fragment>
      <tr>
        <td>{item}</td>
        <td>{price}</td>
        <td>
          <div className="cContournMenuByItem">
            <button
              data-testid={"id-" + item + "-add"}
              className="cButtonType03"
              id={"id-" + item + "-add"}
              name={"id-" + item + "-add"}
              onClick={() => {
                fnAddItem(item, price);
              }}
            >
              +
            </button>
            <button
              className="cButtonType03"
              name={"id-" + item + "-rem"}
              onClick={fnRemoveItem}
            >
              -
            </button>
          </div>
        </td>
      </tr>
    </React.Fragment>
  );
}
