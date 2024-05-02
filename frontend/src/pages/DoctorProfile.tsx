import React from 'react';
import ReactDOM from "react-dom";
import ProfileCard from "./templates/ProfileCard";
import DrawerAppBar from "./templates/DrawerAppBar";
import UploadImage from './templates/UploadImage';

const App = () => {
  return (
    <>
      <DrawerAppBar />
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'calc(100vh - 450px)',
        marginTop: '100px'
      }}>
        <div style={{
          flexShrink: 0,  // Prevents the ProfileCard from shrinking
          width: '100%',  // Use 100% of the width of the parent to center the card properly
          maxWidth: '380px' // Ensures the card does not stretch beyond 500px
        }}>
          <ProfileCard
            doctorId="D1987"
            name="Dr. Jane Smith"
            contactNumber="+1 234 567 8900"
            email="dr.janesmith@example.com"
          />
        </div>
      </div>



      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 'calc(100vh - 450px)',
        marginTop: '100px'
      }}>
        <div style={{
          flexShrink: 0,
          width: '100%',
          maxWidth: '600px'
        }}>
          <UploadImage onFileUpload={(file, patientName) => {
            console.log(file, patientName);
          }} />
        </div>
      </div>
    </>
  );
};

export default App;