import React, { useEffect, useState } from "react";
import API from "../../../utils/api"; 
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const MentorSession = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMentorSessions = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get("/mentors", {
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
        setError("Failed to load mentor sessions: " + err.message);
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
      <Typography variant="h6" gutterBottom>
        Mentor Sessions
      </Typography>
      <List>
        {sessions.map((session) => (
          <ListItem key={session._id}>
            <ListItemText
              primary={`Mentor: ${session.mentor}`}
              secondary={`Availability: ${session.sessionDate}`}
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default MentorSession;
