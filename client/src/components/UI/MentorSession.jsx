import React, { useEffect, useState } from "react";
import API from "../../../utils/api";  // Your axios instance with baseURL
import Typography from "@mui/material/Typography";

const MentorSession = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMentorSessions = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get("/dataInput/mentor", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (Array.isArray(res.data)) {
          setSessions(res.data);
        } else {
          setSessions([]);
        }
        setLoading(false);
      } catch (err) {
        setError(err,"Failed to load mentor sessions");
        setLoading(false);
      }
    };

    fetchMentorSessions();
  }, []);

  if (loading) return <div>Loading mentor sessions...</div>;
  if (error) return <div>{error}</div>;
  if (!sessions.length) return <div>No mentor sessions found.</div>;

  return (
    <div>
      <Typography variant="h6" gutterBottom>Mentor Sessions</Typography>
      <ul>
        {sessions.map((session) => (
          <li key={session._id}>
            Mentor: {session.mentor}, Date: {session.sessionDate}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MentorSession;
