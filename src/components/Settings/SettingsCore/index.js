import React, { useState } from "react";
import { Button, Divider, Input, Slider } from "antd";
import { useSelector, useDispatch } from "react-redux";
import Styles from "./settings-core.module.scss";
import Color from "color";
import { changeChartColor, addChartTitle } from "../../../app/slices/chartSlice";

import { Select } from "antd";

const { Option } = Select;


const alignmentOptions = [
  { label: 'Start', value: 'start' },
  { label: 'Center', value: 'center' },
  { label: 'End', value: 'end' }
]

const SettingsCore = ({setVisible}) => {
  const layers = useSelector((state) => state.layer.layers);
  const chartOptions = useSelector(state => state.chart.options);
  const dispatch = useDispatch();
  const [selectedLayer, setSelectedLayer] = useState("");
  const [fontSize, setFontSize] = useState(chartOptions.plugins.title.font.size);
  const [title, setTitle] = useState(chartOptions.plugins.title.text);
  const [alignment, setAlignment] = useState(chartOptions.plugins.title.align);

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

  const handleAlignmentChange = (value) => {
    setAlignment(value);
  }

  const handleSaveLayer = () => {
    let payload = {
      id: selectedLayer,
      borderColor: color,
      backgroundColor: Color(color).alpha(0.5).string(),
    };
    dispatch(changeChartColor(payload));
    setVisible(false);
  };

  const handleSaveTitle = (add) => {
    if (!add) {
      setTitle("");
    }
    let payload = {
      add,
      title,
      align: alignment,
      fontSize
    }
    dispatch(addChartTitle(payload));
    setVisible(false);
  }

  return (
    <div className={Styles["settings-wrapper"]}>

      <div className={Styles["setting-container"]}>
        <h3>Add Chart Title:</h3>
        <div className={Styles["setting-container-inner"]}>
          <label htmlFor="add-title">Add Title:</label>
          <Input id="add-title" placeholder="Enter Title" value={title} onChange={e => setTitle(e.target.value)} />
        </div>

        <div className={Styles["setting-container-inner"]}>
          <label htmlFor="select-alignment">Select Alignment:</label>
          <Select
            id="select-alignment"
            placeholder="Select Alignment"
            optionFilterProp="children"
            value={alignment}
            onChange={handleAlignmentChange}
          >
            {alignmentOptions.map((item) => (
              <Option value={item.value} key={item.value}>
                {item.label}
              </Option>
            ))}
          </Select>
        </div>

        <div className={Styles["setting-container-inner"]}>
          <label htmlFor="font-size">Select Font Size:</label>
          <Slider
            id="font-size"
            min={10}
            max={30}
            onChange={(value) => setFontSize(value)}
            value={fontSize}
          />
        </div>
        <div className={Styles["btn-group"]}>
          <Button
            type="primary"
            style={{ marginTop: "0.4em" }}
            onClick={() => handleSaveTitle(false)}
            disabled={!chartOptions.plugins.title.display}
          >
            Remove Title
          </Button>
          <Button
            type="primary"
            style={{ marginTop: "0.4em" }}
            onClick={() => handleSaveTitle(true)}
            disabled={title === "" ? true : false}
          >
            Add Title
          </Button>
        </div>
      </div>
      <Divider />

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
