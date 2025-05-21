"use client";

import {Bar,Line,Doughnut,Pie} from "react-chartjs-2"
import { chartBodyProps } from "../types/page";
import {
    Chart as chartjs,
CategoryScale,
 LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
   ArcElement
} from "chart.js"

interface OptionBody{
    responsive: boolean;
    plugins: {
        legend: {
            position: "top" | "left" | "right" | "bottom" | "center" | "chartArea"
        };
        title: {
            display: boolean;
            text: string;
        };
    };
}

chartjs.register(
    CategoryScale,
 LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
  LineElement,
   ArcElement
 
  
)

const dummyChartData = {
  type: 'bar',
  labels: ['Jan', 'Feb', 'Mar'],
  datasets: [
    {
      label: 'Sales',
      data: [10, 20, 30],
      backgroundColor: 'rgba(75, 192, 192, 0.5)',
    },
  ],
};

const options:OptionBody={
    responsive:true,
  plugins: {
    legend: {
      position:"top",
    },
    title: {
      display: true,
      text: ""
    },
  },
}

const BarChart:React.FC<chartBodyProps> = ({Chdata,chartSelect})=>{
  
const {data} = Chdata
  
   switch (chartSelect){
    case "bar":
      return <Bar data={data} options={options}/>
    case "line":
      return <Line data={data} options={options}/>
      case "pie":
        return <Pie data={data} options={options}/>
        case "doughnut":
           return <Pie data={data} options={options}/>

      default:
        return <div>Unsupported Chart Type</div>
    
   }
}

export default BarChart