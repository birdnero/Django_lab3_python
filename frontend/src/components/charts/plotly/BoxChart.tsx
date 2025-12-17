import Plotly from "plotly.js-dist-min";
import createPlotlyComponent from "react-plotly.js/factory";

const Plot = createPlotlyComponent(Plotly);

const baseProps = {
  useResizeHandler: true,
  style: { width: "100%", height: "100%" },
};

export function MyBoxChart() {
  const data: Plotly.Data[] = [
    {
      type: "box",
      y: [80, 100, 120, 150, 200, 300],
      boxpoints: "all",
    },
  ];

  const layout: Partial<Plotly.Layout> = {
    title: { text: "Розподіл цін квитків" },
    yaxis: { title: { text: "Ціна (₴)" } },
  };

  return <Plot data={data} layout={layout} {...baseProps} />;
}
