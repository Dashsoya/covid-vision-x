import { AppBar, Toolbar, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import Header from './Header';
import '../../../static/patient/css/Report.css';
import xrayImg from '../../../static/images/xray.png';

const Report = () => {
  return (
    <div>
      <Header/>

      <section>
        <h1 id="patientProfile">My Report</h1>

        <div id="tablediv">
          <img src={xrayImg} id="patientImg" alt="Patient X-ray" />
          <table id="infoTable">
            <tbody>
              <tr>
                <th><label htmlFor="id">Patient ID:</label></th>
                <td>T0992</td>
              </tr>

              <tr>
                <th><label htmlFor="name">Patient Name:</label></th>
                <td>Bryant Ng</td>
              </tr>
              <tr>
                <th><label htmlFor="status">Covid-19 Diagnosis status:</label></th>
                <td>Completed</td>
              </tr>
              <tr>
                <th><label htmlFor="status">Covid-19 Diagnosis outcome:</label></th>
                <td>Positive</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Report;