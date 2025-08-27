import React, { useContext, useState } from "react";
import withAuth from "../utils/withAuth";
import { useNavigate } from "react-router-dom";
import "../App.css";
import { Button, IconButton, TextField } from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";
import { AuthContext } from "../contexts/AuthContext";

function HomeComponent() {
  const navigate = useNavigate();
  const [meetingCode, setMeetingCode] = useState("");

  const { addToUserHistory } = useContext(AuthContext);

  const handleJoinVideoCall = async () => {
    if (!meetingCode.trim()) return;
    await addToUserHistory(meetingCode);
    navigate(`/${meetingCode}`);
  };

  return (
    <>
      {/* Navbar */}
      <div className="navBar">
        <div className="navLeft">
          <h2 className="logoText">StreamMeet</h2>
        </div>

        <div className="navRight">
          <IconButton onClick={() => navigate("/history")} title="History">
            <RestoreIcon sx={{ color: "#FF9839" }} />
          </IconButton>
          <p className="navText">History</p>

          <Button
            variant="outlined"
            sx={{
              ml: 2,
              borderRadius: "20px",
              borderColor: "#FF9839",
              color: "#FF9839",
              "&:hover": {
                borderColor: "#FF9839",
                backgroundColor: "rgba(255,152,57,0.1)",
              },
            }}
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/auth");
            }}
          >
            Logout
          </Button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="meetContainer">
        {/* Left Side */}
        <div className="leftPanel">
          <div className="contentBox">
            <h2 className="headline">
              Providing <span style={{ color: "#FF9839" }}>Quality Video Calls</span> 
              <br /> Just Like Quality Education
            </h2>

            <div className="joinBox">
              <TextField
                onChange={(e) => setMeetingCode(e.target.value)}
                id="outlined-basic"
                label="Enter Meeting Code"
                variant="outlined"
                sx={{ flex: 1, borderRadius: "8px" }}
              />
              <Button
                onClick={handleJoinVideoCall}
                variant="contained"
                sx={{
                  px: 4,
                  borderRadius: "8px",
                  background: "linear-gradient(45deg, #FF9839, #FF5733)",
                  "&:hover": {
                    background: "linear-gradient(45deg, #FF5733, #FF9839)",
                  },
                }}
              >
                Join
              </Button>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="rightPanel">
          <img src="/logo3.png" alt="StreamMeet Logo" className="heroImage" />
        </div>
      </div>
    </>
  );
}

export default withAuth(HomeComponent);
