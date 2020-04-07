import React, { useRef, useState, useEffect } from "react";

// assets
import deathTireModel from "./assets/models/death_tire.glb";
import defaultTireModel from "./assets/models/default_tire.glb";

// components
import Studio from "./components/Studio";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";

// icons
import TireIcon from "@material-ui/icons/LensOutlined";
import DoorIcon from "@material-ui/icons/MeetingRoomOutlined";
import LightIcon from "@material-ui/icons/EmojiObjectsOutlined";
import CameraIcon from "@material-ui/icons/CameraOutlined";

const App = () => {
  const [tire, setTire] = useState(0);
  const [turnLights, setTurnLights] = useState(false);
  const [activeCamera, setActiveCamera] = useState(0);

  const containerRef = useRef();

  const getTire = () => {
    switch (tire) {
      case 0:
        return defaultTireModel;
      case 1:
        return deathTireModel;
      default:
        return defaultTireModel;
    }
  };

  return (
    <Box width="100%" height="100%" style={{ backgroundColor: "#fff" }}>
      <CssBaseline />
      <Box display="flex" flexDirection="column" width="100%" height="100%">
        <Box height={450} ref={containerRef}>
          <Studio activeCamera={activeCamera} tire={getTire()} turnOnLights={turnLights}/>
        </Box>

        <Box
          alignItems="center"
          display="flex"
          justifyContent="space-between"
          overflow="auto"
          flexDirection="column"
          flexGrow={1}
          width="100%"
          padding={2}
        >
          <Box display="flex" alignItems="center" width="100%">
            <Box flexGrow={1}>
              <TireIcon color="secondary" />
            </Box>
            <Box padding={1}>
              <Button
                variant="contained"
                color="secondary"
                style={{ width: 200 }}
                onClick={() => setTire(0)}
              >
                default tires
              </Button>
            </Box>
            <Box padding={1}>
              <Button
                variant="contained"
                color="secondary"
                style={{ width: 200 }}
                onClick={() => setTire(1)}
              >
                death tires
              </Button>
            </Box>
          </Box>

          <Box display="flex" alignItems="center" width="100%">
            <Box flexGrow={1}>
              <DoorIcon color="secondary" />
            </Box>
            <Box padding={1}>
              <Button
                variant="contained"
                color="secondary"
                style={{ width: 200 }}
              >
                open doors
              </Button>
            </Box>
            <Box padding={1}>
              <Button
                variant="contained"
                color="secondary"
                style={{ width: 200 }}
              >
                close doors
              </Button>
            </Box>
          </Box>

          <Box display="flex" alignItems="center" width="100%">
            <Box flexGrow={1}>
              <LightIcon color="secondary" />
            </Box>
            <Box padding={1}>
              <Button
                variant="contained"
                color="secondary"
                style={{ width: 200 }}
                onClick={() => setTurnLights(true)}
              >
                turn on lights
              </Button>
            </Box>
            <Box padding={1}>
              <Button
                variant="contained"
                color="secondary"
                style={{ width: 200 }}
                onClick={() => setTurnLights(false)}
              >
                turn off lights
              </Button>
            </Box>
          </Box>

          <Box display="flex" alignItems="center" width="100%">
            <Box flexGrow={1}>
              <CameraIcon color="secondary" />
            </Box>
            <Box padding={1}>
              <Button
                variant="contained"
                color="secondary"
                style={{ width: 200 }}
                onClick={() => setActiveCamera(0)}
              >
                main camera
              </Button>
            </Box>
            <Box padding={1}>
              <Button
                variant="contained"
                color="secondary"
                style={{ width: 200 }}
                onClick={() => setActiveCamera(1)}
              >
               camera 1
              </Button>
            </Box>

            <Box padding={1}>
              <Button
                variant="contained"
                color="secondary"
                style={{ width: 200 }}
                onClick={() => setActiveCamera(2)}
              >
               camera 2
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default App;
