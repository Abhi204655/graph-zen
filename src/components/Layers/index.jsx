import React from "react";
import { useSelector } from "react-redux";
import LayerItem from "./LayerItem";
import Styles from "./layers.module.scss";

const Layers = () => {
  const layers = useSelector((state) => state.layer.layers);
  return (
    <div className={Styles["layers-container"]}>
      {layers.map((layer, index) => (
        <LayerItem
          layer={layer}
          key={layer.id}
          isLast={index === layers.length - 1 ? true : false}
        />
      ))}
    </div>
  );
};

export default Layers;
