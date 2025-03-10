import { Card, CardContent, Typography, LinearProgress } from "@mui/material";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import "../Admin/DashBoard.css"
const data = Array.from({ length: 31 }, (_, i) => ({
  day: i + 1,
  tablet: Math.random() * 5000 + 2000,
  mobile: Math.random() * 3000 + 1000,
}));

const revenueData = [
  { name: "Group A", value: 400, color: "#0088FE" },
  { name: "Group B", value: 300, color: "#00C49F" },
  { name: "Group C", value: 200, color: "#FFBB28" },
  { name: "Group D", value: 100, color: "#FF8042" },
];


export default function Dashboard() {
    // Cập nhật class cho body khi dark mode thay đổi
    const { isDarkMode, setIsDarkMode } = useOutletContext();
    useEffect(() => {
      if (isDarkMode) {
        document.body.classList.add("dark");
      } else {
        document.body.classList.remove("dark");
      }
    }, [isDarkMode]);
  return (
    <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
      <div className="grid grid-cols-4 gap-6" style={{display:"flex",gap:"10px",marginBottom:"10px"}}>
        <Card className="shadow-sm" style={{width:"300px",height:"250px"} }>
          <CardContent>
            <Typography variant="h6">Visits Today</Typography>
            <Typography variant="h4" color="primary">12,678</Typography>
            <Typography variant="body2">Registrations: 860 | Sign Out: 32 | Rate: 3.25%</Typography>
          </CardContent>
        </Card>
        <Card className="shadow-sm flex justify-center items-center" style={{width:"300px",height:"250px"}}>
          <CardContent>
            <Typography variant="h6">Revenue Breakdown</Typography>
            <PieChart width={180} height={180}>
              <Pie data={revenueData} cx="50%" cy="50%" outerRadius={60} dataKey="value">
                {revenueData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </CardContent>
        </Card>
        <Card className="shadow-sm" style={{width:"300px",height:"250px"}}>
          <CardContent>
            <Typography variant="h6">App Performance</Typography>
            <Typography variant="body2">Integration</Typography>
            <LinearProgress variant="determinate" value={70} className="mb-2" />
            <Typography variant="body2">SDK</Typography>
            <LinearProgress variant="determinate" value={50} />
          </CardContent>
        </Card>
        <Card className="shadow-sm" style={{width:"300px",height:"250px"}}>
          <CardContent>
            <Typography variant="h6">Server Overview</Typography>
            <Typography variant="body2">60% / 37°C / 3.3 GHz</Typography>
            <Typography variant="body2">54% / 31°C / 3.1 GHz</Typography>
            <Typography variant="body2">57% / 21°C / 3.0 GHz</Typography>
          </CardContent>
        </Card>
      </div>
      <Card className="shadow-lg">
        <CardContent>
          <Typography variant="h6">Daily Line Chart</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="tablet" stroke="#ff7300" strokeWidth={2} dot={{ r: 3 }} />
              <Line type="monotone" dataKey="mobile" stroke="#387908" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
