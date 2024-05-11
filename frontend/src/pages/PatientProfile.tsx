import Header from "./templates/Header";
import "../../../static/patient/css/Profile.css";
import ProfileCard from "../pages/templates/ProfileCard";
import { useEffect, useState } from "react";

function PatientProfile() {
    const [patientProfile, setPatientProfile] = useState<any>(null);

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const tokens = JSON.parse(
                    localStorage.getItem("authTokens") || "{}"
                );
                const token = tokens.access;
                const res = await fetch("/baseUrl/patientProfile/", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: "Bearer " + token,
                    },
                });
                if (!res.ok) {
                    throw new Error("http error: status " + res.status);
                }
                const data = await res.json();
                setPatientProfile(data);
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };
        fetchdata();
    }, []);

    return (
        <div>
            <Header userRole={"patient"} />

            {/* Profile starts */}
            <section id="patientProfilePage">
                <h1 id="profileTitle">My Profile</h1>
                <div id="patientProfileCard">
                    {patientProfile && (
                        <ProfileCard
                            id={patientProfile.id}
                            name={patientProfile.name}
                            username={patientProfile.username}
                            password={patientProfile.password}
                            role={patientProfile.role}
                            contactNumber={patientProfile.phone_number}
                            email={patientProfile.email}
                            pageContext="profile"
                        />
                    )}
                </div>
            </section>
            {/* Profile ends */}
        </div>
    );
}

export default PatientProfile;
