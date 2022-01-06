import React, { useState } from "react";
import { Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import Styles from "./settings-core.module.scss";
import Color from "color";
import { changeChartColor } from "../../../app/slices/chartSlice";

import { Select } from "antd";

const { Option } = Select;

const SettingsCore = () => {
  const layers = useSelector((state) => state.layer.layers);
  const dispatch = useDispatch();
  const [selectedLayer, setSelectedLayer] = useState("");
  const chartData = useSelector((state) => state.chart.data);
  const [color, setColor] = useState("#fff");
  const layerOptions =
    layers.map((layer) => ({
      label: layer.title,
      value: layer.id,
    })) ?? [];

  const getCurrentLayerColor = (id) => {
    if (chartData.datasets.length > 0) {
      let currentLayer = chartData.datasets.find((el) => el.id === id);
      return currentLayer.borderColor;
    }
    return "#fff";
  };

  const handleLayerChange = (value) => {
    setSelectedLayer(value);
    const layerColor = getCurrentLayerColor(value);
    setColor(layerColor);
  };

  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  const handleSaveLayer = () => {
    let payload = {
      id: selectedLayer,
      borderColor: color,
      backgroundColor: Color(color).alpha(0.5).string(),
    };
    dispatch(changeChartColor(payload));
  };

  return (
    <div className={Styles["settings-wrapper"]}>
      <div className={Styles["setting-container"]}>
        <h3>Change Layer Color:</h3>
        <div className={Styles["setting-container-inner"]}>
          <label htmlFor="select-layer">Select Layer:</label>
          <Select
            id="select-layer"
            placeholder="Select Layer"
            optionFilterProp="children"
            onChange={handleLayerChange}
          >
            {layerOptions.map((item) => (
              <Option value={item.value} key={item.value}>
                {item.label}
              </Option>
            ))}
          </Select>
        </div>

        <div className={Styles["setting-container-inner"]}>
          <label htmlFor="select-color">Select Color:</label>
          <input type="color" value={color} onChange={handleColorChange} />
        </div>
        <Button
          type="primary"
          style={{ marginTop: "0.4em" }}
          onClick={handleSaveLayer}
          disabled={selectedLayer === "" ? true : false}
        >
          Save Color
        </Button>
      </div>
    </div>
  );
};

export default SettingsCore;
