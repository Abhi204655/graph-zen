import React, { useState } from "react";
import { useSelector } from "react-redux";

import { FileUpload, Sidebar, Graph, Settings, Embed } from "../../components";

import Styles from "./dashboard.module.scss";

const Dashboard = () => {
  const uploaded = useSelector((state) => state.data.uploaded);
  const [visible, setVisible] = useState(!uploaded);

  return (
    <>
      <FileUpload visible={visible} setVisible={setVisible} />
      <main className={Styles["App-wrapper"]}>
        <Sidebar setVisible={setVisible} />
        <div className={Styles["graph-container"]}>
          <Graph />
          <Settings />
          <Embed />
        </div>
      </main>
    </>
  );
};

export default Dashboard;
