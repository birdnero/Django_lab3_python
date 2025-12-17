import Plotly from "plotly.js-dist-min";
import createPlotlyComponent from "react-plotly.js/factory";

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
    title: { text: "Розподіл оцінок вистав" },
    polar: {
      radialaxis: { visible: true },
    },
  };

  return (
    <Plot
      data={data}
      layout={{ ...layout, autosize: true }}
      useResizeHandler
      style={{ width: "100%", height: "100%" }}
    />
  );
}
