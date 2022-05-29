import React, { useState } from "react";
import {
  Typography,
  Grid,
  Tabs,
  Tab,
  Paper,
  Button,
} from "@material-ui/core";
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
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';

const steps = [
  {
    label: "Step 1",
    description: ` Open Notebook: https://colab.research.google.com/drive/1IZN28VTu9jmbCwplff6QRR8CP2SylZIs?usp=sharing`,
  },
  {
    label: "Step 2",
    description: `Set Notebook settings to GPU (It is required for training model)`,
  },
  {
    label: "Step 3",
    description: `Run cells upto folder setup`,
  },
  {
    label: "Step 4",
    description: `At section 1.4 Capturing Images you can uncommment the code & run it to capture at that moment or you can run next cell to add images in Tensorflow/workspace/models/my_ssd_mobnet`,
  },
  {
    label: "Step 5",
    description: `After section 1.5 Labeling Images you need to manually divide collected images into two folders train and test. 
    
    So now all folders and annotations should be split between the following two folders.
    /Tensorflow/workspace/images/train
    /Tensorflow/workspace/images/test`,
  },
  {
    label: "Step 6",
    description: `At section 2.11 Load Train Model From Checkpoint: Please make sure to enter latest Checkoint name and then run this cell.
    You can find it in Tensorflow/workspace/models/my_ssd_mobnet`,
  },
  {
    label: "Step 7",
    description: `Run all cells: After excecuting all the cells you will get your model as model.json in Tensorflow/workspace/models/my_ssd_mobnetTensorflow/workspace/models/my_ssd_mobnet/tfjsexport`,
  },
  {
    label: "Step 8",
    description: `You can optionally evaluate your model inside of Tensorboard. Once the model has been trained and you have run the evaluation command under 

    Navigate to the evaluation folder for your trained model e.g. cd Tensorlfow/workspace/models/my_ssd_mobnet/eval
    and open Tensorboard with the following command
    
    tensorboard --logdir=.
     
    Tensorboard will be accessible through your browser and you will be able to see metrics including mAP - mean Average Precision, and Recall.
    `,
  },

];

export default function IconsPage() {
  var classes = useStyles();

  // Tabs
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
        title="Google Colab" />
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


        {/* Steps to Run on Google Colab*/}
        {activeTabId === 0 && (
          <div>
            <Grid container spacing={2} >
              <Box sx={{ maxWidth: 400, pl: 3, pr: 3 }} >
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

        {/* Dependencies */}
        {activeTabId === 1 && (
          <div>
            <Grid container spacing={2}>
              <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <ListItem alignItems="flex-start">

                  <ListItemText
                    primary=" Just a Google account to access Google Colab "
                    secondary={
                      <React.Fragment>
                        <Typography
                          sx={{ display: 'inline' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >

                        </Typography>
                        {"All other dependencies are built in...👍"}
                      </React.Fragment>
                    }
                  />
                </ListItem>

              </List>

            </Grid>
          </div>
        )}
      </Paper>
    </Layout>
  );
}
