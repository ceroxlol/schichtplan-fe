import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import shift from "../services/shift";

import "./ShiftPlan.css";

const ShiftPlan = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState("");

    useEffect(() => {
        const response = shift.getAllShiftPlans()
    });

    // useEffect(() => {
    // 	function getUserDetails() {
    // 		if (id) {
    // 			fetch(`http://localhost:4000/schedules/${id}`)
    // 				.then((res) => res.json())
    // 				.then((data) => {
    // 					setUsername(data.username);
    // 					setSchedules(data.schedules);
    // 					setTimezone(data.timezone.label);
    // 					setLoading(false);
    // 				})
    // 				.catch((err) => console.error(err));
    // 		}
    // 	}
    // 	getUserDetails();
    // }, [id]);

    useEffect(() => {
        if (!localStorage.getItem("user")) {
            navigate("/");
        }
    }, [navigate]);

    return (
        <main className='profile'>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div style={{ width: "70%" }}>
                    <h2
                        style={{
                            marginBottom: "30px",
                        }}
                    >
                        Hey, {username}
                    </h2>
                    <p
                        style={{
                            marginBottom: "10px",
                        }}
                    >
                        Here is your schedule:
                    </p>
                    <table>
                        <tbody>
                            {schedules.map((sch) => (
                                <tr key={sch.day}>
                                    <td style={{ fontWeight: "bold" }}>
                                        {sch.day.toUpperCase()}
                                    </td>
                                    <td>{sch.startTime || "Unavailable"}</td>
                                    <td>{sch.endTime || "Unavailable"}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </main>
    );
};

export default ShiftPlan;
