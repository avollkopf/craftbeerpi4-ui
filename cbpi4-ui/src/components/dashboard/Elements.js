import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import React, { useContext, useState } from "react";
import Draggable from "react-draggable";
import "../../App.css";
import "../../led.css";
import { DashboardContext } from "./DashboardContext";

export const DashboardContainer = ({ name, id, index, type }) => {
  const { state, actions } = useContext(DashboardContext);
  const selected = actions.is_selected(id);
  const model = actions.get_data(id);
  const [x, setX] = useState(model.x);
  const [y, setY] = useState(model.y);

  let inputStyle = { position: "absolute" };

  if (selected === true) {
    inputStyle = { ...inputStyle, borderRadius: 5, border: "1px solid rgba(142, 250, 0, .5)" };
  }
  const draggable = state.draggable;

  const Widget = type;

  const handleDrag = (e, ui) => {
    setX(x + ui.deltaX);
    setY(y + ui.deltaY);
    actions.update_default_prop(id, "x", x + ui.deltaX);
    actions.update_default_prop(id, "y", y + ui.deltaY);
  };

  const select = (e) => {
    if (!draggable) {
      return;
    }
    e.stopPropagation();
    actions.setSelected(()=>({ type: "E", id }));
  };

  const render_icons = () => {
    if (selected) {
      return (
        <>
          <div style={{ position: "absolute", top: -40, left: -40 }}>
            <IconButton aria-label="delete" color="primary" variant="contained" onPointerDown={() => actions.remove(id)}>
              <DeleteIcon />
            </IconButton>
          </div>
        </>
      );
    }
  
  };

  return (
    <Draggable disabled={!draggable} onDrag={handleDrag} bounds="parent" grid={[5, 5]} defaultPosition={{ x, y }}>
      <div onPointerDown={select} style={inputStyle}>
        <Widget id={id} width={model.props?.width} height={model.props?.height} />
        {render_icons()}
      </div>
    </Draggable>
  );
};








