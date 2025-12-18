import type React from "react";
import MyBarChart from "../components/charts/rechart/BarChart";
import { Typography } from "antd";
import MyLineChart from "../components/charts/rechart/LineChart";
import MyPieChart from "../components/charts/rechart/PieChart";
import MyAreaChart from "../components/charts/rechart/AreaChart";
import { FloatingContainer } from "../components/FloatingContainer";
import { FloatingButton } from "../components/FloatingButton";
import { LeftCircleFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import MyScatterChart from "../components/charts/rechart/ScatterChart";
import MyTreeMapChart from "../components/charts/rechart/TreeMapChart";
import { ChartDiv } from "../components/ChartDiv";

const RechartsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <FloatingContainer>
        <FloatingButton
          Icon={LeftCircleFilled}
          onClick={() => navigate(-1)}
          inContainer
        />
      </FloatingContainer>
      <ChartDiv template="screen">
        <Typography.Title level={1}>Some cool statistic</Typography.Title>

        <ChartDiv template="chart">
          <Typography.Paragraph>
            Best theaters(cause we cool)
          </Typography.Paragraph>
          <MyBarChart />
        </ChartDiv>

        <ChartDiv template="chart">
          <Typography.Paragraph>
            Tikets by <Typography.Text delete>year</Typography.Text>{" "}
            <Typography.Text delete>month</Typography.Text> date!
          </Typography.Paragraph>
          <MyLineChart />
        </ChartDiv>

        <ChartDiv template="chart">
          <Typography.Paragraph>
            Actors without social life
          </Typography.Paragraph>
          <MyPieChart />
        </ChartDiv>

        <ChartDiv template="chart">
          <Typography.Paragraph>
            Mega race between theaters
          </Typography.Paragraph>
          <MyAreaChart />
        </ChartDiv>
        <ChartDiv template="chart">
          <Typography.Paragraph>
            Wierd chart about best plays
          </Typography.Paragraph>
          <MyTreeMapChart />
        </ChartDiv>
        <ChartDiv template="chart">
          <Typography.Paragraph>Should you visit it?</Typography.Paragraph>
          <MyScatterChart />
        </ChartDiv>
      </ChartDiv>
    </>
  );
};

export default RechartsPage;
