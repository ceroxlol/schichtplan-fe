import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import shift from "../services/shift";
import authService from "../services/auth";

import Timeline from 'react-calendar-timeline'
// make sure you include the timeline stylesheet or the timeline will not be styled
import 'react-calendar-timeline/lib/Timeline.css'
import moment from 'moment'

const ShiftPlan = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      var response;
      if (id) {
        response = await shift.getShiftPlan(id)
      } else {
        response = await shift.getAllShiftPlans()
      }
      const data = await response.data;
      setItems(data);
      setLoading(false);
    }

    fetchData();
  }, [id]);

  useEffect(() => {
    const user = authService.getCurrentUser()
    if (!user) {
      navigate("/");
    } else {
      setUsername(user.username)
      setGroups([{ id: 1, title: user.username, height: 100, rightTitle: 'title in the right sidebar' }])
    }
  }, [navigate]);

  return (
    <div>
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
          {items.length !== 0 &&
            <Timeline
              groups={groups}
              items={items}
              defaultTimeStart={moment().add(-12, 'hour')}
              defaultTimeEnd={moment().add(12, 'hour')}
              itemHeightRatio={1.75}
              canResize
            />
          }
        </div>
      )}
    </div>
  );
};

export default ShiftPlan;
