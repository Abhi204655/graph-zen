import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, message, Select, Tooltip } from "antd";
import Styles from "./layer-item.module.scss";
import {
  DeleteOutlined,
  DownOutlined,
  SaveOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { remove, saveLayer } from "../../../app/slices/layerSlice";
import {
  addSeries,
  removeSeries,
  hideSeries,
} from "../../../app/slices/chartSlice";
import Color from "color";
import { GetRandomColor } from "../../../utils";

const { Option } = Select;

const graphTypeData = [
  { label: "Bar", value: "bar" },
  { label: "Line", value: "line" },
  { label: "Area", value: "area" },
];

const LayerItem = ({ layer }) => {
  const dispatch = useDispatch();
  const uploadedData = useSelector((state) => state.data.data);
  const dataTypes = useSelector((state) => state.data.dataTypes);
  const [show, setShow] = useState(!layer.saved);

  const layers = useSelector((state) => state.layer.layers);
  const multipleLayers = layer.multiLayer;

  const [xValue, setXValue] = useState(layer.xAxis ?? "");
  const [yValue, setYValue] = useState(layer.yAxis ?? "");
  const [graphType, setGraphType] = useState(layer.type ?? "");
  //   const [layerTitle, setLayerTitle] = useState(layer.title);
  const [hidden, setHidden] = useState(false);

  const handleChange = (value, type) => {
    switch (type) {
      case 1:
        setXValue(value);
        break;
      case 2:
        setYValue(value);
        break;
      case 3:
        setGraphType(value);
        break;
      default:
        break;
    }
  };

  const handleSaveLayer = () => {
    let customXValue = xValue;
    if (multipleLayers) {
      customXValue = layers[0].xAxis;
    }
    const payload = {
      id: layer.id,
      xAxis: customXValue,
      yAxis: yValue,
      type: graphType,
    };
    dispatch(saveLayer(payload));
    let xAxisData = uploadedData[customXValue];
    let yAxisData = uploadedData[yValue];
    let combinedData = [];
    for (let iterator = 0; iterator < xAxisData.length; iterator++) {
      combinedData.push({
        x: xAxisData[iterator],
        y: parseFloat(yAxisData[iterator]),
      });
    }
    const graphColor = GetRandomColor();

    let bgColor = Color(graphColor).alpha(0.5).string();

    let newSeries = {
      id: layer.id,
      label: yValue,
      data: combinedData,
      backgroundColor: bgColor,
      borderColor: graphColor,
      borderWidth: 2,
      type: graphType,
    };
    if (newSeries.type === "area") {
      newSeries.type = "line";
      newSeries.fill = "start";
    }

    dispatch(addSeries(newSeries));
    setShow(false);
    message.success("Layer Saved Successfully");
  };

  //   const handleLayerTitleChange = (e) => {
  //     setLayerTitle(e.target.value);
  //   };

  const isDisabled = () => {
    if (graphType === "" || yValue === "") {
      return true;
    } else {
      if (multipleLayers) {
        return false;
      } else if (xValue === "") return true;
    }
    return false;
  };

  const handleHideLayer = () => {
    let hiddenStatus = hidden;
    setHidden((prev) => !prev);
    dispatch(hideSeries({ id: layer.id, hidden: !hiddenStatus }));
  };

  const handleShow = () => {
    if (layer.saved) {
      setShow(prev => !prev);
    }
    else {
      message.warning("Please save the Layer First!")
    }
  }

  return (
    <div className={Styles["layer-wrapper"]}>
      <div className={Styles["layer-top"]}>
        <p>{layer.title}</p>
        {/* <input
          value={layerTitle}
          onChange={handleLayerTitleChange}
          className={Styles["layer-title"]}
        /> */}
        <div className={Styles["btn-container"]}>
          {layer.saved &&
          <Tooltip placement="bottom" title={hidden ? "Unhide" : "Hide"}>
            {hidden ? (
              <EyeInvisibleOutlined onClick={handleHideLayer}/>
            ) : (
              <EyeOutlined onClick={handleHideLayer}/>
            )}
          </Tooltip>}
          <Tooltip placement="bottom" title="Delete">
            <DeleteOutlined
              onClick={() => {
                dispatch(remove(layer.id));
                if (layer.saved) {
                  dispatch(removeSeries(layer.id));
                }
              }}
              className={Styles["icon-btn"]}
            />
          </Tooltip>
          <DownOutlined
            className={Styles["icon-btn"]}
            onClick={handleShow}
          />
        </div>
      </div>
      {show && (
        <div className={Styles["layer-main"]}>
          <div className={Styles["input-container"]}>
            <label>Select Graph Type*</label>
            <Select
              value={graphType}
              style={{ width: "100%" }}
              onChange={(value) => handleChange(value, 3)}
            >
              {graphTypeData.map((item) => (
                <Option key={item.value} value={item.value}>
                  {item.label}
                </Option>
              ))}
            </Select>
          </div>
          {!multipleLayers && (
            <div className={Styles["input-container"]}>
              <label>Select X-Axis Data*</label>
              <Select
                disabled={!graphType}
                value={xValue}
                style={{ width: "100%" }}
                onChange={(value) => handleChange(value, 1)}
              >
                {uploadedData &&
                  Object.keys(uploadedData).map((item) => (
                    <Option key={item} value={item}>
                      {item} - [{dataTypes[item]}]
                    </Option>
                  ))}
              </Select>
            </div>
          )}
          <div className={Styles["input-container"]}>
            <label>Select Y-Axis Data*</label>
            <Select
              disabled={!graphType}
              value={yValue}
              style={{ width: "100%" }}
              onChange={(value) => handleChange(value, 2)}
            >
              {uploadedData &&
                Object.keys(uploadedData).map((item) => (
                  <Option
                    key={item}
                    value={item}
                    disabled={dataTypes[item] === "string" ? true : false}
                  >
                    {item} - [{dataTypes[item]}]
                  </Option>
                ))}
            </Select>
          </div>
          <Button
            type="primary"
            icon={<SaveOutlined />}
            onClick={handleSaveLayer}
            disabled={isDisabled()}
          >
            Save Layer
          </Button>
        </div>
      )}
    </div>
  );
};

export default LayerItem;
