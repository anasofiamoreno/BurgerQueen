import { React, useState } from "react";
import { MenuItem } from "./MenuItem";
import { v4 as uuidv4 } from "uuid";

export function MenuBQ({ state, fnData, classState, sCostumer }) {
  const menuSelected = state.costumers[sCostumer].menuSelected;
  const menusList = Object.keys(state.menu);
  const menuitems = Object.values(state.menu);

  const [selectedMenu, setSelectedMenu] = useState([
    Object.keys(state.menu[menuSelected]),
    menuSelected,
  ]);
  const fnShowMenu = (items, typeMenu) => {
    setSelectedMenu([Object.keys(items), typeMenu]);
    let newMenuSelected = state.costumers[sCostumer];
    newMenuSelected.menuSelected = typeMenu;

    //fnData("changCostumer", newMenuSelected);
  };

  return (
    <div id="idMenuBQ" className="cMenuBQ">
      <div className={classState.MenuBQ}>
        <div className="cContournMenuSup">
          {menusList.map(
            (element, i) =>
              i < 3 && (
                <button
                  key={uuidv4()}
                  onClick={() => fnShowMenu(menuitems[i], element)}
                  className="cButtonType01 cFontTypeTitleM"
                  type="button"
                >
                  {element}
                </button>
              )
          )}
        </div>
        <div className="cContournMenuDow">
          <table className="cTable cFontTypeTextS">
            <tbody>
              <tr>
                <th>Dish</th>
                <th>Price</th>
              </tr>

              {selectedMenu[0].map((element, i) => (
                <MenuItem
                  key={element}
                  item={element}
                  price={state.menu[selectedMenu[1]][element].price}
                  state={state}
                  fnData={fnData}
                  sCostumer={sCostumer}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
