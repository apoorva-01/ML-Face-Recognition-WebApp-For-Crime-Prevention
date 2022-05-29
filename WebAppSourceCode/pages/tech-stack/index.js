import React, { useState } from "react";
import { Typography, Grid, Tabs, Tab, Paper, Button } from "@material-ui/core";
import Layout from "../../Layout/Layout";
// styles
import useStyles from "../../components/styles/os.js";
// components
import PageTitle from "../../components/ui/PageTitle/PageTitle";
// icons sets
import "font-awesome/css/font-awesome.min.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Divider from "@mui/material/Divider";
import Avatar from "@mui/material/Avatar";

export default function IconsPage() {
  var classes = useStyles();

  // Tab Changes
  var [activeTabId, setActiveTabId] = useState(0);

  return (
    <Layout>
      <PageTitle title="Tech Stack" />
      <Paper className={classes.iconsContainer}>
        <Tabs
          indicatorColor="primary"
          textColor="primary"
          value={activeTabId}
          onChange={(e, id) => setActiveTabId(id)}
          className={classes.iconsBar}
        >
          <Tab label="Machine Learning" classes={{ root: classes.tab }} />
          <Tab label="Web App Frontend" classes={{ root: classes.tab }} />
          <Tab label="Web App Backend" classes={{ root: classes.tab }} />
          <Tab label="Database" classes={{ root: classes.tab }} />
        </Tabs>

        {/* Steps */}
        {activeTabId === 0 && (
          <div>
            <Grid container spacing={2}>
              <List sx={{ width: "100%", bgcolor: "background.paper" }}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar  sx={{ width: 50, height: 50 }} alt="Python" src="/dependencies/python.png" />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Python"
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
                    <Avatar  sx={{ width: 50, height: 50 }}
                      alt="Nvidia CUDA"
                      src="/dependencies/tensorflow.png"
                    />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Tensorflow Object Detection API"
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
                    <Avatar  sx={{ width: 50, height: 50 }} alt="OpenCV" src="/dependencies/opencv.png" />
                  </ListItemAvatar>
                  <ListItemText
                    primary="OpenCV"
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
        {activeTabId === 1 && (
          <div>
            <Grid container spacing={2}>
              <List sx={{ width: "100%", bgcolor: "background.paper" }}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar  sx={{ width: 50, height: 50 }} alt="React" src="/dependencies/react.png" />
                  </ListItemAvatar>
                  <ListItemText
                    primary="React"
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
                    <Avatar  sx={{ width: 50, height: 50 }} alt="HTML & CSS" src="/dependencies/html.png" />
                  </ListItemAvatar>
                  <ListItemText
                    primary="HTML & CSS"
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
                    <Avatar  sx={{ width: 50, height: 50 }} alt="Javascript" src="/dependencies/js.png" />
                  </ListItemAvatar>
                  <ListItemText
                    primary="Javascript"
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
                    <Avatar  sx={{ width: 50, height: 50 }} alt="JSX" src="/dependencies/jsx.png" />
                  </ListItemAvatar>
                  <ListItemText
                    primary="JSX"
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

        {activeTabId === 2 && (
          <div>
            <Grid container spacing={2}>
            <List sx={{ width: "100%", bgcolor: "background.paper" }}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar  sx={{ width: 50, height: 50 }} alt="NextJs" src="/dependencies/next.png" />
                  </ListItemAvatar>
                  <ListItemText
                    primary="NextJs"
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
                    <Avatar  sx={{ width: 50, height: 50 }} alt="NodeJS (API Design)" src="/dependencies/node.png" />
                  </ListItemAvatar>
                  <ListItemText
                    primary="NodeJS (API Design)"
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
              </List>
            </Grid>
          </div>
        )}
        {activeTabId === 3 && (
          <div>
            <Grid container spacing={2}>
            <List sx={{ width: "100%", bgcolor: "background.paper" }}>
                <ListItem alignItems="flex-start">
                  <ListItemAvatar>
                    <Avatar  sx={{ width: 50, height: 50 }} alt="MongoDB" src="/dependencies/mongo.png" />
                  </ListItemAvatar>
                  <ListItemText
                    primary="MongoDB"
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

              </List>
            </Grid>
          </div>
        )}
      </Paper>
    </Layout>
  );
}
