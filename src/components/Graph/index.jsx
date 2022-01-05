import React, { useState, useEffect } from "react";
import { Chart as ReactChart } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { useSelector } from "react-redux";
Chart.register(...registerables);

const Graph = () => {
  const optionsData = useSelector((state) => state.chart.options);
  const dataObj = useSelector((state) => state.chart.data);
  const [options, setOptions] = useState(Object.assign({}, optionsData));
  const [data, setData] = useState(
    dataObj && dataObj.datasets.length > 0 ? Object.assign({}, dataObj) : null
  );

  useEffect(() => {
    if (dataObj.datasets.length > 0) {
      setData(Object.assign({}, dataObj));
    }
    if (optionsData) {
      setOptions(Object.assign({}, optionsData));
    }
  }, [dataObj, optionsData]);

  return (
    <>
      {data && (
        <>
          <ReactChart id="stackD" type="bar" data={data} options={options} />
        </>
      )}
    </>
  );
};

export default Graph;
