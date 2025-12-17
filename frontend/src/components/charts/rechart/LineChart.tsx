import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Varialbles } from "../../../config";
import { useToken } from "../../../utils/StateManager";

type DateStat = {
  date: string;
  amount: number;
};

export default function MyLineChart() {
  const [data, setData] = useState<DateStat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${Varialbles.backend}api/tickets/stats/by/date/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${useToken.getState().token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="amount" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
}
