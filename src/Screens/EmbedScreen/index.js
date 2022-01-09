import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Chart as ReactChart } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import { getDataFromEmbedId } from "../../app/slices/chartSlice";
import { useParams } from "react-router-dom";
import { Loader } from "../../components";
import { Button, Empty } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

Chart.register(...registerables);

const EmbedScreen = () => {
  const { embedId } = useParams();
  const dispatch = useDispatch();
  const graphFetched = useSelector((state) => state.chart.graphFetched);
  const options = useSelector((state) => state.chart.options);
  const data = useSelector((state) => state.chart.data);
  const graphLoading = useSelector((state) => state.chart.embedLoading);
  const navigate = useNavigate();

  useEffect(() => {
    if (embedId) {
      dispatch(getDataFromEmbedId(embedId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {graphLoading ? (
        <Loader />
      ) : (
        <>
          {graphFetched ? (
            <ReactChart
              id="stackD"
              type="bar"
              data={Object.assign({}, data)}
              options={Object.assign({}, options)}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100vh",
                display: "grid",
                placeContent: "center",
              }}
            >
              <Empty />
              <Button
                style={{ marginTop: "1em" }}
                icon={<ArrowLeftOutlined />}
                onClick={() => navigate("/", { replace: true })}
              >
                Back To Home
              </Button>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default EmbedScreen;
