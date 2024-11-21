import React from "react";
import CustomCard from "../../re-components/Student/card";
import { useNavigate } from "react-router-dom";
import '../../style/studentstyles/dashboard.css'
import {
  ProgressCircleRing,
  ProgressCircleRoot,
} from "../../components/ui/progress-circle"

const Dashboard= () => {
  const navigate = useNavigate();
  const handleView = () => {
    navigate("/repayment");
  }; 

  return (
    <> 
    <div className="dash">
    <div className="head">
        <h1>Welcome User <br />Total Overview of Student's Bills</h1>
        
    </div>
      <div className="all">
        <CustomCard className='one'>
          <h1>TOTAL DEPT</h1>
          <p style={{fontSize:'xx-large',fontWeight:'bolder'}}>Total Amount = 600,000 XAF</p>
          <div className="break">
          <p>Tuition Fees : 400,000 XAF</p>
          <p>Financial Aid : 100,000 XAF</p>
          <p>Interest = 20% Of <br />(Tuition Fees + Financial Aid)</p>
          </div>
        
        </CustomCard>
        <CustomCard className='two'>
        <h1>REPAYMENT</h1>
        <ProgressCircleRoot value={35} size='xl' >
      <ProgressCircleRing color='#05acee'  css={{ "--thickness": "2px",'heigth':'' }} />
    </ProgressCircleRoot>
        </CustomCard>

        </div>
        </div>
    </>
  );
};

export default Dashboard;
