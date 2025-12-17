import Plotly from "plotly.js-dist-min";
import createPlotlyComponent from "react-plotly.js/factory";

const Plot = createPlotlyComponent(Plotly);

const baseProps = {
  useResizeHandler: true,
  style: { width: "100%", height: "100%" },
};

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
    title: { text: "Відвідувачі та рейтинг" },
    yaxis: { title: { text: "Відвідувачі" } },
    yaxis2: {
      title: { text: "Рейтинг" },
      overlaying: "y",
      side: "right",
      range: [0, 5],
    },
  };

  return <Plot data={data} layout={layout} {...baseProps} />;
}
