import React from "react";
import Styles from "./settings.module.scss";
import { Popover, Button } from "antd";
import {useSelector} from 'react-redux'
import { SettingOutlined } from "@ant-design/icons";
import SettingsCore from "./SettingsCore";

const Settings = () => {
  const chartData = useSelector(state => state.chart.data);
  return (
    <Popover
      placement="leftTop"
      title="Settings"
      content={SettingsCore}
      trigger="click"
    >
      <Button
        type="primary"
        shape="circle"
        icon={<SettingOutlined />}
        disabled={chartData.datasets.length === 0}
        className={Styles["settings-trigger"]}
      />
    </Popover>
  );
};

export default Settings;
