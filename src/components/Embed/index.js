import React, { useState } from "react";
import Styles from "./embed.module.scss";
import { useSelector } from "react-redux";
import { Drawer, Button, Tooltip } from "antd";
import { BsCode } from "react-icons/bs";
import EmbedCore from "./EmbedCore";

const Embed = () => {
  const chartData = useSelector((state) => state.chart.data);
  const [visible, setVisible] = useState(false);

  const onClose = () => {
    setVisible(false);
  };
  return (
    <>
      <Tooltip placement="bottom" title="Embed">
        <Button
          type="primary"
          shape="circle"
          style={{ display: "grid", placeContent: "center" }}
          icon={<BsCode style={{ fontSize: "22px" }} />}
          disabled={chartData.datasets.length === 0}
          onClick={() => setVisible((prev) => !prev)}
          className={Styles["embed-trigger"]}
        />
      </Tooltip>
      <Drawer
        title="Embed Code"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
      >
        <EmbedCore setVisible={setVisible} />
      </Drawer>
    </>
  );
};

export default Embed;
