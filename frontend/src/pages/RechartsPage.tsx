import type React from "react";
import MyBarChart from "../components/charts/rerchart/BarChart";
import { Typography } from "antd";
import MyLineChart from "../components/charts/rerchart/LineChart";
import MyPieChart from "../components/charts/rerchart/PieChart";
import MyAreaChart from "../components/charts/rerchart/AreaChart";
import { FloatingContainer } from "../components/FloatingContainer";
import { FloatingButton } from "../components/FloatingButton";
import { LeftCircleFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import MyScatterChart from "../components/charts/rerchart/ScatterChart";
import MyTreeMapChart from "../components/charts/rerchart/TreeMapChart";
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
          <Typography.Paragraph>Best theaters</Typography.Paragraph>
          <MyBarChart />
        </ChartDiv>

        <ChartDiv template="chart">
          <Typography.Paragraph>Tikets by date</Typography.Paragraph>
          <MyLineChart />
        </ChartDiv>

        <ChartDiv template="chart">
          <Typography.Paragraph>Top actors</Typography.Paragraph>
          <MyPieChart />
        </ChartDiv>

        <ChartDiv template="chart">
          <Typography.Paragraph>
            Status for theaters in some time
          </Typography.Paragraph>
          <MyAreaChart />
        </ChartDiv>
        <ChartDiv template="chart">
          <Typography.Paragraph>Best plays</Typography.Paragraph>
          <MyTreeMapChart />
        </ChartDiv>
        <ChartDiv template="chart">
          <Typography.Paragraph>Rating vs favoriate</Typography.Paragraph>
          <MyScatterChart />
        </ChartDiv>
      </ChartDiv>
    </>
  );
};

export default RechartsPage;
