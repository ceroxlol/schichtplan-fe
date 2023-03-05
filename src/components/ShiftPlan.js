import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import shiftService from "../services/shift";
import authService from "../services/auth";
import userService from "../services/user";
import {defaultTimeStart, defaultTimeEnd, interval, sidebarWidth, lineHeight} from '../config';

import Timeline from 'react-calendar-timeline'
// make sure you include the timeline stylesheet or the timeline will not be styled
import 'react-calendar-timeline/lib/Timeline.css'
import './style.css'
import moment from 'moment'

const ShiftPlan = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchScheduleData = async () => {
      try {
        const response = id ? await shiftService.getShiftPlan(id) : await shiftService.getAllShiftPlans();
        const data = await response.data;
        setItems(data);
        setLoading(false);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.log('Unauthorized access!');
          navigate("/login")
        } else {
          console.error(error);
        }
      }
    }

    fetchScheduleData();
  }, [id, navigate]);

  useEffect(() => {
    const fetchUsersData = async () => {
      const response = await (id ? userService.getCurrentUser() : userService.getAllUsers());
      const data = Array.isArray(response.data) ? response.data : [response.data];
      setGroups(data.map(user => ({ id: user.userId, title: user.username })));
    }

    fetchUsersData();
  }, [id]);

  useEffect(() => {
    const user = authService.getCurrentUser()
    if (!user) {
      navigate("/");
    } else {
      setUsername(user.username)
      setGroups([{ id: user.userId, title: user.username }])
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
              defaultTimeStart={defaultTimeStart}
              defaultTimeEnd={defaultTimeEnd}
              itemHeightRatio={0.75}
              sidebarWidth={sidebarWidth}
              lineHeight={lineHeight}
            />
          }
        </div>
      )}
    </div>
  );
};

export default ShiftPlan;
