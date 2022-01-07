import React, { useState } from "react";
import Styles from "./settings.module.scss";
import {  Button, Drawer } from "antd";
import { useSelector } from 'react-redux'
import { SettingOutlined } from "@ant-design/icons";
import SettingsCore from "./SettingsCore";

const Settings = () => {
  const chartData = useSelector(state => state.chart.data);
  const [visible, setVisible] = useState(false);

  const onClose = () => {
    setVisible(false);
  };
  return (
    <>
        <Button
          type="primary"
          shape="circle"
          icon={<SettingOutlined />}
          onClick={() => setVisible(prev => !prev)}
          disabled={chartData.datasets.length === 0}
          className={Styles["settings-trigger"]}
        />
      <Drawer
        title="Settings"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}

      >
        <SettingsCore setVisible={setVisible}/>
      </Drawer>
    </>
  );
};

export default Settings;
