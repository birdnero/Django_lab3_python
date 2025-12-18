import Plotly from "plotly.js-dist-min";
import createPlotlyComponent from "react-plotly.js/factory";
import { baseLayout, baseProps } from "./BaseLayout";

const Plot = createPlotlyComponent(Plotly);

export function MyHeatmapChart() {
  const data: Plotly.Data[] = [
    {
      type: "heatmap",
      x: ["Драма", "Комедія", "Балет"],
      y: ["20–30", "30–40", "40+"],
      z: [
        [2, 5, 1],
        [3, 2, 4],
        [6, 1, 2],
      ],
    },
  ];

  const layout: Partial<Plotly.Layout> = {
    ...baseLayout,
    title: { text: "Let's stereotype" },
  };

  return <Plot data={data} layout={layout} {...baseProps} />;
}
