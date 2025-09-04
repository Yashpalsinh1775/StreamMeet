import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import { IconButton } from "@mui/material";

export default function History() {
  const { getHistoryOfUser } = useContext(AuthContext);
  const [meetings, setMeetings] = useState([]);
  const routeTo = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const history = await getHistoryOfUser();
        setMeetings(history);
      } catch {
        // TODO: Snackbar/Error handling
      }
    };

    fetchHistory();
  }, []);

  let formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="historyContainer">
      {/* Back Home Button */}
      <div className="historyHeader">
        <IconButton onClick={() => routeTo("/home")}>
          <HomeIcon sx={{ fontSize: 28, color: "#FF9839" }} />
        </IconButton>
        <h2 className="historyTitle">Meeting History</h2>
      </div>

      {/* Meeting Cards */}
      <div className="historyGrid">
        {meetings.length !== 0 ? (
          meetings.map((e, i) => (
            <Card key={i} variant="outlined" className="historyCard">
              <CardContent>
                <Typography sx={{ fontSize: 16, fontWeight: 600 }} gutterBottom>
                  Code: {e.meetingCode}
                </Typography>
                <Typography sx={{ color: "text.secondary" }}>
                  Date: {formatDate(e.date)}
                </Typography>
              </CardContent>
            </Card>
          ))
        ) : (
          <p className="noHistory">No meetings found</p>
        )}
      </div>
    </div>
  );
}
