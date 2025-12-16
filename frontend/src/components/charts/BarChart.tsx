import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import { Varialbles } from "../../config";
import { useToken } from "../../utils/StateManager";

type RatingItem = {
  name: string;
  rating: number;
};

export default function MyBarChart() {
  const [data, setData] = useState<RatingItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${Varialbles.backend}api/theaters/stats/rating/2/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${useToken.getState().token}`,
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
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" hide/>
        <YAxis domain={[0, 5]} />
        <Tooltip />
        <Bar dataKey="rating" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
}
