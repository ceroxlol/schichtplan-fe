import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import shift from "../services/shift";
import authService from "../services/auth";

import Timeline from 'react-calendar-timeline'
// make sure you include the timeline stylesheet or the timeline will not be styled
import 'react-calendar-timeline/lib/Timeline.css'
import moment from 'moment'

const ShiftPlan = () => {
  //const { id } = useParams();
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await shift.getAllShiftPlans()
      const data = await response.data;
      setItems(data);
      setLoading(false);
    }

    fetchData();
  }, []);

  useEffect(() => {
    const user = authService.getCurrentUser()
    if (!user) {
      navigate("/");
    } else {
      setUsername(user.username)
      setGroups([{ id: 1, title: user.username, height: 100, rightTitle: 'title in the right sidebar' }])
    }

    setItems([
      {
        id: 1,
        group: 1,
        title: 'item 1',
        start_time: 1677838446073,
        end_time: 1677849446073
      },
      {
        id: 3,
        group: 1,
        title: 'item 3',
        start_time: moment().add(2, 'hour'),
        end_time: moment().add(3, 'hour')
      }
    ])
  }, [navigate]);

  useEffect(() =>{
    console.log(items)
  }, [items])

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
