import Plotly from "plotly.js-dist-min";
import createPlotlyComponent from "react-plotly.js/factory";
import { baseLayout, baseProps } from "./BaseLayout";

const Plot = createPlotlyComponent(Plotly);

export default function MyRadarChart() {
  const data: Plotly.Data[] = [
    {
      type: "scatterpolar",
      r: [120, 230, 310, 420, 510],
      theta: ["1⭐", "2⭐", "3⭐", "4⭐", "5⭐"],
      fill: "toself",
    },
  ];

  const layout: Partial<Plotly.Layout> = {
    ...baseLayout,
    title: { text: "How good we are?" },
    polar: {
      radialaxis: { visible: true },
    },
  };

  return (
    <Plot data={data} layout={{ ...layout, autosize: true }} {...baseProps} />
  );
}
