import React, { useState } from "react";
import {
  Typography,
  Grid,
  Tabs,
  Tab,
  Paper,
  Button,
} from "@material-ui/core";
// import * as Icons from "@material-ui/icons";
import Layout from "../../Layout/Layout";
// styles
import useStyles from "../../components/styles/os";

// components
import PageTitle from "../../components/ui/PageTitle/PageTitle";

// icons sets
import "font-awesome/css/font-awesome.min.css";

import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";

const steps = [
  {
    label: "Step 1",
    description: `Clone this repository: https://github.com/apoorva-01/Face-Recognition-WebApp-For-Crime-Prevention`,
  },
  {
    label: "Step 2",
    description: ` Create a new virtual environment using:

    python -m venv frme`,
  },
  {
    label: "Step 3",
    description: `Activate your virtual environment using: 

    .\\tfod\\Scripts\\activate # Windows`,
  },
  {
    label: "Step 4",
    description: `Install dependencies and add virtual environment to the Python Kernel

    ${`python -m pip install --upgrade pip`}
    
    ${`pip install ipykernel`}
    
    ${`python -m ipykernel install --user --name=frme`}
    
    ${`pip install jupyter`}`,
  },
  {
    label: "Step 5",
    description: `Run Notebook (Ensure you change the kernel to the virtual environment as shown below)`,
  },
  {
    label: "Step 6",
    description: `Run cells upto folder setup`,
  },
  {
    label: "Step 7",
    description: `At section 1.4 Capturing Images you can uncommment the code & run it to capture at that moment or you can run next cell to add images in Tensorflow/workspace/models/my_ssd_mobnet
`,
  },
  {
    label: "Step 8",
    description: `After section 1.5 Labeling Images you need to manually divide collected images into two folders train and test. So now all folders and annotations should be split between the following two folders.
    /Tensorflow/workspace/images/train
    /Tensorflow/workspace/images/test`,
  },
  {
    label: "Step 9",
    description: `At section 2.11 Load Train Model From Checkpoint: Please make sure to enter latest Checkoint name and then run this cell.
    You can find it in Tensorflow/workspace/models/my_ssd_mobnet`,
  },
  {
    label: "Step 10",
    description: `Run all cells`,
  },
];

export default function IconsPage() {
  var classes = useStyles();

  // Tab 
  var [activeTabId, setActiveTabId] = useState(0);

  // Stepper
  const [activeStep, setActiveStep] = React.useState(0);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleReset = () => {
    setActiveStep(0);
  };
  return (
    <Layout>
      <PageTitle
        title="Windows"/>
      <Paper className={classes.iconsContainer}>
        <Tabs
          indicatorColor="primary"
          textColor="primary"
          value={activeTabId}
          onChange={(e, id) => setActiveTabId(id)}
          className={classes.iconsBar}
        >
          <Tab label="Steps" classes={{ root: classes.tab }} />
          <Tab label="Dependencies" classes={{ root: classes.tab }} />
        </Tabs>

        {/* Steps */}
        {activeTabId === 0 && (
          <div>
            <Grid container spacing={2}>
              <Box sx={{ maxWidth: 400 , pl: 3, pr: 3}}>
                <Stepper activeStep={activeStep} orientation="vertical">
                  {steps.map((step, index) => (
                    <Step key={step.label}>
                      <StepLabel
                        optional={
                          index === 2 ? (
                            <Typography variant="caption">Last step</Typography>
                          ) : null
                        }
                      >
                        {step.label}
                      </StepLabel>
                      <StepContent>
                        <Typography>{step.description}</Typography>
                        <Box sx={{ mb: 2 }}>
                          <div>
                            <Button
                              variant="contained"
                              onClick={handleNext}
                              sx={{ mt: 1, mr: 1 }}
                            >
                              {index === steps.length - 1
                                ? "Finish"
                                : "Continue"}
                            </Button>
                            <Button
                              disabled={index === 0}
                              onClick={handleBack}
                              sx={{ mt: 1, mr: 1 }}
                            >
                              Back
                            </Button>
                          </div>
                        </Box>
                      </StepContent>
                    </Step>
                  ))}
                </Stepper>
                {activeStep === steps.length && (
                  <Paper square elevation={0} sx={{ p: 3 }}>
                    <Typography>
                      All steps completed - you&apos;re finished
                    </Typography>
                    <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                      Reset
                    </Button>
                  </Paper>
                )}
              </Box>
            </Grid>
          </div>
        )}
        {activeTabId === 1 && (
          <div>
            <Grid container spacing={2}>
              <List sx={{ width: "100%", bgcolor: "background.paper" }}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt="Nvidia CUDA" src="/dependencies/cuda.png" />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Nvidia CUDA"
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        ></Typography>
                        {""}
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />

                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt="Nvidia CUDNN" src="/dependencies/cudnn.png" />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Nvidia CUDNN"
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        ></Typography>
                        {""}
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />

                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt="Nvidia GPU Card" src="/dependencies/gpu.png" />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Nvidia GPU Card"
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        ></Typography>
                        {""}
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar alt="Microsoft Visual C++" src="/dependencies/visual.png" />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Microsoft Visual C++"
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: "inline" }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        ></Typography>
                        {""}
                      </React.Fragment>
                    }
                  />
                </ListItem>
                <Divider variant="inset" component="li" />
              </List>
            </Grid>
          </div>
        )}
      </Paper>
    </Layout>
  );
}
