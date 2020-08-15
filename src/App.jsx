import React, { useRef, useState } from "react";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";

// assets
import deathTireModel from "./assets/models/death_tire.glb";
import defaultTireModel from "./assets/models/default_tire.glb";

// components
import Studio from "./components/Studio";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import CssBaseline from "@material-ui/core/CssBaseline";

// icons
import GitHubIcon from "@material-ui/icons/GitHub";

// theme
const theme = createMuiTheme({
  palette: {
    type: "dark",

    background: {
      default: "#1B1C1E",
    },
  },
  shape: {
    borderRadius: 35,
  },
});

const App = () => {
  const [tire, setTire] = useState(0);
  const [turnLights, setTurnLights] = useState(false);
  const [activeCamera, setActiveCamera] = useState(0);
  const [openDoors, setOpenDoors] = useState(false);

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
    <ThemeProvider theme={theme}>
      <Box width="100%" height="100%">
        <CssBaseline />
        <Box display="flex" flexDirection="column" width="100%" height="100%">
          <Box height={450} ref={containerRef}>
            <Studio
              activeCamera={activeCamera}
              tire={getTire()}
              turnOnLights={turnLights}
              openDoors={openDoors}
            />
          </Box>

          <Box width="100%" height="100%" display="flex" padding={2}>
            <Box flex={1} display="flex" alignItems="flex-end">
              <Button
                component="a"
                href="https://github.com/mmdalipour"
                target="_blank"
                color="secondary"
                startIcon={<GitHubIcon color="secondary" />}
              >
                checkout my github
              </Button>
            </Box>
            <Box
              alignItems="center"
              display="flex"
              justifyContent="space-between"
              overflow="auto"
              flexDirection="column"
            >
              <Box
                display="flex"
                justifyContent="flex-end"
                alignItems="center"
                width="100%"
              >
                <Box padding={1}>
                  <Button
                    variant={tire === 0 ? "contained" : "outlined"}
                    color="secondary"
                    style={{ width: 200 }}
                    onClick={() => setTire(0)}
                  >
                    default tires
                  </Button>
                </Box>
                <Box padding={1}>
                  <Button
                    variant={tire === 1 ? "contained" : "outlined"}
                    color="secondary"
                    style={{ width: 200 }}
                    onClick={() => setTire(1)}
                  >
                    death tires
                  </Button>
                </Box>
              </Box>

              <Box
                display="flex"
                justifyContent="flex-end"
                alignItems="center"
                width="100%"
              >
                <Box padding={1}>
                  <Button
                    variant={openDoors ? "contained" : "outlined"}
                    color="secondary"
                    style={{ width: 200 }}
                    onClick={() => setOpenDoors(true)}
                  >
                    doors opened
                  </Button>
                </Box>
                <Box padding={1}>
                  <Button
                    variant={!openDoors ? "contained" : "outlined"}
                    color="secondary"
                    style={{ width: 200 }}
                    onClick={() => setOpenDoors(false)}
                  >
                    doors closed
                  </Button>
                </Box>
              </Box>

              <Box
                display="flex"
                justifyContent="flex-end"
                alignItems="center"
                width="100%"
              >
                <Box padding={1}>
                  <Button
                    variant={turnLights ? "contained" : "outlined"}
                    color="secondary"
                    style={{ width: 200 }}
                    onClick={() => setTurnLights(true)}
                  >
                    lights on
                  </Button>
                </Box>
                <Box padding={1}>
                  <Button
                    variant={!turnLights ? "contained" : "outlined"}
                    color="secondary"
                    style={{ width: 200 }}
                    onClick={() => setTurnLights(false)}
                  >
                    lights off
                  </Button>
                </Box>
              </Box>

              <Box
                display="flex"
                justifyContent="flex-end"
                alignItems="center"
                width="100%"
              >
                <Box padding={1}>
                  <Button
                    variant={activeCamera === 0 ? "contained" : "outlined"}
                    color="secondary"
                    style={{ width: 200 }}
                    onClick={() => setActiveCamera(0)}
                  >
                    main camera
                  </Button>
                </Box>
                <Box padding={1}>
                  <Button
                    variant={activeCamera === 1 ? "contained" : "outlined"}
                    color="secondary"
                    style={{ width: 200 }}
                    onClick={() => setActiveCamera(1)}
                  >
                    camera 1
                  </Button>
                </Box>

                <Box padding={1}>
                  <Button
                    variant={activeCamera === 2 ? "contained" : "outlined"}
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
      </Box>
    </ThemeProvider>
  );
};

export default App;
