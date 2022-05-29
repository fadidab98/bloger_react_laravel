import React,{useState,useEffect} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import SmLoading from "../../../Layout/admin/SmLoading/SmLoading";
import {
    Chart as ChartJs,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,

} from 'chart.js';
import {Bar} from 'react-chartjs-2';
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
ChartJs.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)

function Dashboard() {
    const history =useHistory();
    const [post,setPost] = useState(0);
    const [category,setCategory] = useState(0);
    const [user,setUser] = useState(0);
    const [loading,setLoading] = useState(true);
    const [Max,setMax]=useState();
    const id = Cookies.get("id");
    const [chartData,setChartData]=useState({
        labels: [],
        datasets: [{
          label: '# Number Of Post Peer Month',
          data: [],
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]

    
    });

const getcharData=()=>{
    axios.get(`api/moderator/chart/${id}`).then(res=>{
        if(res.data.status ==200){
          setLoading(false);
          setMax(res.data.max);
          setChartData({
            labels:res.data.months,
            
            datasets: [{
              label: '# Number Of Post Peer Month',
              data: [res.data.post_count_data],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 1
            }]
    
        
          })
        }
        else if(res.data.status ==400){
            localStorage.removeItem("auth_token");
            localStorage.removeItem("auth_name");
            Cookies.remove("id");
           
            history.push("/login");
            window.location.reload();
            Swal("Warning", res.data.block_message, "warning");
        }
    })
}
   useEffect(()=>{
    getcharData();
      axios.get(`/api/moderator/dashboard/${id}`).then(res=>{
          if(res.data.status == 200){
              setPost(res.data.post);
              setCategory(res.data.category);
              setUser(res.data.viewed);
              setLoading(false);
          }
      });
    
   
   },[])





    if (loading) {
        return <SmLoading />;
      }
  return (
    <div className="container">
      <h1>Dashboard</h1>
        <div class="row">

                     
                    <div class="col-xl-3 col-md-6 mb-4">
                        <div class="card border-left-primary shadow h-100 py-2">
                            <div class="card-body">
                                <div class="row no-gutters align-items-center">
                                    <div class="col mr-2">
                                        <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                            Your Posts</div>
                                        <div class="h5 mb-0 font-weight-bold text-gray-800">{post}</div>
                                    </div>
                                    <div class="col-auto">
                                        <i class="fas fa-paste fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="col-xl-3 col-md-6 mb-4">
                        <div class="card border-left-success shadow h-100 py-2">
                            <div class="card-body">
                                <div class="row no-gutters align-items-center">
                                    <div class="col mr-2">
                                        <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                                            Category</div>
                                        <div class="h5 mb-0 font-weight-bold text-gray-800">{category}</div>
                                    </div>
                                    <div class="col-auto">
                                        <i class="fas fa-cubes fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="col-xl-3 col-md-6 mb-4">
                        <div class="card border-left-info shadow h-100 py-2">
                            <div class="card-body">
                                <div class="row no-gutters align-items-center">
                                    <div class="col mr-2">
                                        <div class="text-xs font-weight-bold text-info text-uppercase mb-1">Total Posts Viewed
                                        </div>
                                        <div class="h5 mb-0 font-weight-bold text-gray-800">{user}</div>
                                    </div>
                                    <div class="col-auto">
                                        <i class="fas fa-eye fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div> 
                    </div>


                    <div class="col-xl-3 col-md-6 mb-4">
                        <div class="card border-left-warning shadow h-100 py-2">
                            <div class="card-body">
                                <div class="row no-gutters align-items-center">
                                    <div class="col mr-2">
                                        <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                            Pending Requests</div>
                                        <div class="h5 mb-0 font-weight-bold text-gray-800">18</div>
                                    </div>
                                    <div class="col-auto">
                                        <i class="fas fa-comments fa-2x text-gray-300"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> 
        </div>
                <div>
                <Bar
                  data={chartData}
                        width={400}
                        height={200}
                        options={{
                        maintainAspectRatio: false,
                        scales: {
                            y: {
                              
                              suggestedMin: 20,
                      
                              
                              suggestedMax: Max,
                            }
                          },
                         }}  
                         /> 
                     
                 </div>
    </div>
  );
}

export default Dashboard;
