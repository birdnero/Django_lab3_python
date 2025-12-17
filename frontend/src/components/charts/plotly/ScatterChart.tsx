import Plotly from "plotly.js-dist-min";
import createPlotlyComponent from "react-plotly.js/factory";

const Plot = createPlotlyComponent(Plotly);

const baseProps = {
  useResizeHandler: true,
  style: { width: "100%", height: "100%" },
};

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
    title: { text: "Ціна квитка vs Продані квитки" },
    xaxis: { title: { text: "Ціна (₴)" } },
    yaxis: { title: { text: "Кількість квитків" } },
  };

  return <Plot data={data} layout={layout} {...baseProps} />;
}
