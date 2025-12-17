import Plotly from "plotly.js-dist-min";
import createPlotlyComponent from "react-plotly.js/factory";

const Plot = createPlotlyComponent(Plotly);

const baseProps = {
  useResizeHandler: true,
  style: { width: "100%", height: "100%" },
};

export function MyHistogramChart() {
  const data: Plotly.Data[] = [
    {
      type: "histogram",
      x: ["Драма", "Комедія", "Драма", "Опера", "Балет", "Комедія"],
    },
  ];

  const layout: Partial<Plotly.Layout> = {
    title: { text: "Кількість вистав по жанрах" },
    xaxis: { title: { text: "Жанр" } },
    yaxis: { title: { text: "Кількість вистав" } },
  };

  return <Plot data={data} layout={layout} {...baseProps} />;
}
