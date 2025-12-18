import Plotly from "plotly.js-dist-min";
import createPlotlyComponent from "react-plotly.js/factory";
import { baseLayout, baseProps } from "./BaseLayout";

const Plot = createPlotlyComponent(Plotly);

export function MyHistogramChart() {
  const data: Plotly.Data[] = [
    {
      type: "histogram",
      x: ["Драма", "Комедія", "Драма", "Опера", "Балет", "Комедія"],
    },
  ];

  const layout: Partial<Plotly.Layout> = {
    ...baseLayout,
    title: { text: "So, how popular genre is?" },
    xaxis: { title: { text: "Genre" } },
    yaxis: { title: { text: "Occurrences" } },
  };

  return <Plot data={data} layout={layout} {...baseProps} />;
}
