import React from "react";
import Styles from "./sidebar.module.scss";
import { Button, Divider } from "antd";
import { AppstoreAddOutlined, DownloadOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";

import { add } from "../../app/slices/layerSlice";
import { Layers } from "..";
import { useSelector } from "react-redux";

import { saveAs } from "file-saver";

const Sidebar = () => {
  const dispatch = useDispatch();
  const canBeLayered = useSelector((state) => state.chart.canBeLayered);
  const multiLayer = useSelector((state) => state.layer.layers).length > 0;
  const chartInit = useSelector((state) => state.chart.init);
  const downloadChart = () => {
    const canvasSave = document.getElementById("stackD");
    if (canvasSave)
      canvasSave.toBlob(function (blob) {
        saveAs(blob, "testing.png");
      });
  };

  return (
    <aside className={Styles["sidebar-container"]}>
      <div className={Styles["sidebar-top"]}>
        <h1 className={Styles["App-logo"]}>Graph-Zen</h1>
        <span>1.0.0</span>
      </div>
      <div className={Styles["sidebar-main"]}>
        <div className={Styles["sidebar-title"]}>
          <h2>Layers</h2>
          <Button
            type="primary"
            icon={<DownloadOutlined />}
            onClick={downloadChart}
            disabled={!chartInit}
          >
            Download Chart
          </Button>
        </div>
        <Divider />
        <Layers />
        <Button
          type="primary"
          icon={<AppstoreAddOutlined />}
          onClick={() => {
            dispatch(add(multiLayer));
          }}
          disabled={!canBeLayered}
        >
          Add Layer
        </Button>
      </div>
    </aside>
  );
};

export default Sidebar;
