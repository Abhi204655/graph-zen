import React, { useState, useEffect } from "react";
import { Chart as ReactChart } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { useSelector } from "react-redux";
import Styles from './graph.module.scss';
Chart.register(...registerables);

const Graph = () => {
  const optionsData = useSelector((state) => state.chart.options);
  const dataObj = useSelector((state) => state.chart.data);
  const [options, setOptions] = useState(Object.assign({}, optionsData));
  const [data, setData] = useState(
    dataObj && dataObj.datasets.length > 0 ? Object.assign({}, dataObj) : null
  );

  useEffect(() => {

    setData(Object.assign({}, dataObj));

    if (optionsData) {
      setOptions(Object.assign({}, optionsData));
    }
  }, [dataObj, optionsData]);

  return (
    <>
      {data && data?.datasets?.length > 0 ? (
        <>
          <ReactChart id="stackD" type="bar" data={data} options={options} />
        </>
      ) : <h1 className={Styles.heading}>Please Add a Layer to see the magic🪄</h1>}
    </>
  );
};

export default Graph;
