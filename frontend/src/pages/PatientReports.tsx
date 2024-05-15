import { useEffect, useState } from "react";
import Header from "./templates/Header";
import UserBox from "./templates/UserBox";
import { ReportDetails } from "./UserAccInterface";
import "../css/DoctorReport.css";

const PatientReports = () => {
    const [reportData, setReportData] = useState<ReportDetails[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const tokens = JSON.parse(
                    localStorage.getItem("authTokens") || "{}"
                );
                const token = tokens.access;
                const res = await fetch(
                    "https://CovidVisionX.eba-aap3dwij.ap-southeast-1.elasticbeanstalk.com/patientReport/",
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: "Bearer " + token,
                        },
                    }
                );
                const data = await res.json();
                console.log(data);
                setReportData(data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        fetchData();
    }, []);
    return (
        <>
            <Header userRole={"patient"} />
            <section className="doctorReportPage">
                <h1 id="doctorReportTitle">My Report</h1>
                <div id="itemTitleBar">
                    <p id="reportId">Report ID</p>
                    <p id="reportPatientName">Patient Name</p>
                    <p id="reportPatientResult">Status</p>
                </div>

                <div id="userListContainer">
                    <div id="userList">
                        {reportData && (
                            <UserBox
                                users={reportData}
                                context="patientReport"
                            />
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};

export default PatientReports;
