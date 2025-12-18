import Plotly from "plotly.js-dist-min";
import createPlotlyComponent from "react-plotly.js/factory";
import { baseLayout, baseProps } from "./BaseLayout";

const Plot = createPlotlyComponent(Plotly);

export function MyCombinedChart() {
  const data: Plotly.Data[] = [
    {
      type: "bar",
      x: ["Гамлет", "Кармен", "Лускунчик"],
      y: [1200, 900, 1500],
      name: "Відвідувачі",
    },
    {
      type: "scatter",
      mode: "lines+markers",
      x: ["Гамлет", "Кармен", "Лускунчик"],
      y: [4.6, 4.2, 4.8],
      name: "Середній рейтинг",
      yaxis: "y2",
    },
  ];

  const layout: Partial<Plotly.Layout> = {
    ...baseLayout,
    title: { text: "More visitors - better rating, isn't it?" },
    yaxis: { title: { text: "Visitors" } },
    yaxis2: {
      title: { text: "Rating" },
      overlaying: "y",
      side: "right",
      range: [0, 5],
    },
  };

  return <Plot data={data} layout={layout} {...baseProps} />;
}
