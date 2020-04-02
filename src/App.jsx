import React, { useRef, useState, useEffect } from "react";

// components
import Studio from "./components/Studio";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";

// icons
import TireIcon from "@material-ui/icons/LensOutlined";
import DoorIcon from "@material-ui/icons/MeetingRoomOutlined";
import LightIcon from "@material-ui/icons/EmojiObjectsOutlined";

const App = () => {
  const [studioSize, setStudioSize] = useState(null);

  const containerRef = useRef();

  useEffect(() => {
    const container = containerRef.current;
    setStudioSize({ width: container.offsetWidth, height: container.offsetHeight });
  }, []);
  return (
    <Box width="100%" height="100%" style={{backgroundColor: "#fff"}}>
      <CssBaseline />
      <Box display="flex" flexDirection="column" width="100%" height="100%">
        <Box height={450} ref={containerRef}>
          {!!studioSize && (
            <Studio
              width={studioSize.width}
              height={studioSize.height}
            />
          )}
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
              >
                default tires
              </Button>
            </Box>
            <Box padding={1}>
              <Button
                variant="contained"
                color="secondary"
                style={{ width: 200 }}
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
              >
                turn on lights
              </Button>
            </Box>
            <Box padding={1}>
              <Button
                variant="contained"
                color="secondary"
                style={{ width: 200 }}
              >
                turn off lights
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default App;
