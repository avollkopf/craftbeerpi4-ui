import React, { useContext, useEffect, useState } from "react";
import { useActor } from "../../data";

import { DashboardContext } from "../DashboardContext";

export const Path = ({ id, coordinates, condition=null, stroke = 10 , max_x = 400, max_y = 600 }) => {
  const { state, actions } = useContext(DashboardContext);
  const actor = useActor()
  const [data, setData1] = useState(coordinates);
  const [dragging, setDragging] = useState(false);
  const [origin, setOrigin] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);
  const [ani, setAni] = useState(false)


  


  useEffect(()=> {

    const actor_cache = actor.reduce((obj, item)=> { 
      obj[item.id] = item.state
      return obj
    }, {})

    
    const p = state.pathes.find((e) => e.id === id)
    
    if(!p.condition || p.condition.length === 0) {
        setAni(false)
    }
    else {
      setAni(p.condition.reduce((sum, next) => sum && actor_cache[next], true))
    }

  }, [actor])

  const draggable = state.draggable;

  const gen_path = () => {
    let path_string = "";

    for (const [index, value] of data.entries()) {
      const [x, y] = value;
      index === 0 ? (path_string += "M ") : (path_string += " L ");
      path_string += x;
      path_string += " ";
      path_string += y;
    }
    return path_string;
  };

  const add_point = (e, index, x, y) => {
    e.stopPropagation();
    e.preventDefault();
    const d2 = [...data.slice(0, index + 1), [x, y], ...data.slice(index + 1)];
    setData1([...d2]);
  };

  const remove_point = (index) => {
    data.splice(index, 1);
    setData1([...data]);
  };


  const render_handles = () => {
    const len = data.length;

    let result = [];
    for (const [index, value] of data.entries()) {
      if (index < len - 1) {
        const [x, y] = value;
        const [next_x, next_y] = data[index + 1];
        const x_point = (x + next_x) / 2;
        const y_point = (y + next_y) / 2;

        result.push(
          <g>
            <circle onPointerDown={(e) => add_point (e, index, x_point, y_point)} cx={x_point} cy={y_point} fillOpacity="0.4" r={12} />
            <text x={x_point} y={y_point} textAnchor="middle" fontSize="20px" fill="#fff" alignmentBaseline="central">
              +
            </text>
          </g>
        );
      }
    }
    return result;
  };

  const down = (e, index) => {
    e.stopPropagation();
    const el = e.target;
    el.setPointerCapture(e.pointerId);
    setOrigin({ x: data[index][0], y: data[index][1], clientX: e.clientX, clientY: e.clientY });
    setDragging(true);
  };

  const up = (e, index) => {
    e.stopPropagation();
    setDragging(false);
    actions.update_path(id, data);
  };
  const move = (e, index) => {
    e.stopPropagation();

    e.preventDefault();
    if (dragging) {
      const delta_x = e.clientX - origin.clientX;
      const detal_y = e.clientY - origin.clientY;
      const data2 = [...data[index]];

      if (origin.x + delta_x < 0) {
        data2[0] = 0;
      } else if (origin.x + delta_x > max_x) {
        data2[0] = max_x;
      } else {
        const t = origin.x + delta_x;
        data2[0] = origin.x + delta_x - (t % 5);
      }

      if (origin.y + detal_y < 0) {
        data2[1] = 0;
      } else if (origin.y + detal_y > max_y) {
        data2[1] = max_y;
      } else {
        const t2 = origin.y + detal_y;
        data2[1] = origin.y + detal_y - (t2 % 5);
      }
      const d2 = [...data.slice(0, index), data2, ...data.slice(index + 1)];
      setData1([...d2]);
    }
  };

  const handle = () => {
    return data.map((data, index) => (
      <g key={index}>
        <circle cx={data[0]} cy={data[1]} r="5" fill="#8efa00" />
        <circle
          onDoubleClick={() => {
            remove_point(index);
          }}
          onPointerMove={(e) => move(e, index)}
          onPointerDown={(e) => down(e, index)}
          onPointerUp={(e) => up(e, index)}
          cx={data[0]}
          cy={data[1]}
          r="20"
          fill="#8efa00"
          fillOpacity="0.1"
        />
      </g>
    ));
  };

  const select = (e) => {
    if (!draggable) {
      return;
    }
    e.stopPropagation();
    e.preventDefault();
    setActive(!active);
    actions.setSelectedPath(current => ({ type: "P", id }));
    actions.setSelected(current => ({ type: "P", id }));
  };


  


  

  const glow = () => (is_acktive() ? "10%" : "0%");
  const is_acktive = () => {
    return actions.is_selected(id)
    //return state?.selectedPath?.id === id;
  };

  const animation = ani ? "draw" : ""

  return (
    <>
      <g key={id}>
        <path d={gen_path()} id="1" fill="none" stroke="#9A9A9A" strokeLinejoin="round" strokeWidth={stroke} pointerEvents="stroke"></path>
        <path className={animation} strokeLinejoin="round" d={gen_path()} fill="none" stroke="#4A4A4A" strokeWidth={stroke - 2} strokeMiterlimit="10" pointerEvents="stroke"></path>
        <path onPointerDown={(e) => select(e)} d={gen_path()} fill="none" strokeOpacity={glow()} stroke="blue" strokeLinejoin="round" strokeWidth={stroke + 10} pointerEvents="stroke"></path>
        {is_acktive() ? handle() : ""}
        {is_acktive() ? render_handles() : ""}
      </g>
    </>
  );
};
