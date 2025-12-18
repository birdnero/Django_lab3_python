import Plotly from "plotly.js-dist-min";
import createPlotlyComponent from "react-plotly.js/factory";
import { baseLayout, baseProps } from "./BaseLayout";

const Plot = createPlotlyComponent(Plotly);

export function MyScatterChart() {
  const data: Plotly.Data[] = [
    {
      x: [100, 150, 200, 250, 300],
      y: [500, 420, 300, 180, 90],
      mode: "markers",
      type: "scatter",
    },
  ];

  const layout: Partial<Plotly.Layout> = {
    ...baseLayout,
    title: { text: "Do we scare people with price?" },
    xaxis: { title: { text: "Price" } },
    yaxis: { title: { text: "Sold tickets" } },
  };

  return <Plot data={data} layout={layout} {...baseProps} />;
}
