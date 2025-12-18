import Plotly from "plotly.js-dist-min";
import createPlotlyComponent from "react-plotly.js/factory";
import { baseLayout, baseProps } from "./BaseLayout";

const Plot = createPlotlyComponent(Plotly);

export function MyBoxChart() {
  const data: Plotly.Data[] = [
    {
      type: "box",
      y: [80, 100, 120, 150, 200, 300],
      boxpoints: "all",
    },
  ];

  const layout: Partial<Plotly.Layout> = {
    ...baseLayout,
    title: { text: "Out tickets random" },
    yaxis: {
      title: { text: "Price" },
    },
  };

  return <Plot data={data} layout={layout} {...baseProps} />;
}
