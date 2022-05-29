// Import dependencies
import React, { useRef, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";
// import { nextFrame } from "@tensorflow/tfjs";
// Import drawing utility here
import { drawRect } from "../utils/utilities";
import Head from 'next/head'
// Layout Import
import Layout from '../Layout/Layout'
import { useSnackbar } from 'notistack';
import axios from 'axios'
function App() {
  
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  async function alertEmail(){
      await axios.get(
        '/api/alert-email',);
  }

  
  // Main function
  const runCoco = async () => {
    //  Load network by calling local API which further load ML Model 
    const net = await tf.loadGraphModel('http://localhost:3489/api/model')
    // Loop and detect Faces
    setInterval(() => {
      detect(net);
      // async function alert(){
      //   const video = webcamRef.current.video;
      //   const img = tf.browser.fromPixels(video)
      //   const resized = tf.image.resizeBilinear(img, [640, 480])
      //   const casted = resized.cast('int32')
      //   const expanded = casted.expandDims(0)
      //   const obj = await net.executeAsync(expanded)
      //   const x=await obj[6].array()
      //   if(x[0][0]>=0.98){
      //     // enqueueSnackbar('Alert, Criminal Detected',{ variant: 'error' }); 
      //     alertEmail()}
      // }
      // alert()
    }, 16.7);
  };

  const detect = async (net) => {
    // Check data is available or not
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set Video Width
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set Canvas height and width
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // 4. TODO - Make Detections
      const img = tf.browser.fromPixels(video)
      const resized = tf.image.resizeBilinear(img, [640, 480])
      const casted = resized.cast('int32')
      const expanded = casted.expandDims(0)
      const obj = await net.executeAsync(expanded)
      // console.log('Boxes',await obj[5].array())
      // console.log('Classes',await obj[1].array())
      // console.log(await obj[7].array())

      // console.log('Object',x[0][0])
 

      const boxes = await obj[6].array()
      const classes = await obj[4].array()
      const scores = await obj[7].array()

      // Draw mesh
      const ctx = canvasRef.current.getContext("2d");

      // Update drawing utility
      requestAnimationFrame(() => { drawRect(boxes[0], classes[0], scores[0], 0.7, videoWidth, videoHeight, ctx) });

      tf.dispose(img)
      tf.dispose(resized)
      tf.dispose(casted)
      tf.dispose(expanded)
      tf.dispose(obj)

    }
  };

  useEffect(() => {
    async function fetch() {
      runCoco()
    }
    fetch()
  }, []);

  return (
    <>
      <Layout>
      <Head>
        <title>Microsoft Engage Project</title>
        <meta name="description" content="Microsoft Engage Project" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="App">
        <header className="App-header">
          <Webcam
          audio={false}
            ref={webcamRef}
            muted={true}
            style={{
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              left: 0,
              right: 0,
              textAlign: "center",
              zindex: 9,
              width: 640,
              height: 480,
            }}
          />

          <canvas
            ref={canvasRef}
            style={{
              position: "absolute",
              marginLeft: "auto",
              marginRight: "auto",
              left: 0,
              right: 0,
              textAlign: "center",
              zindex: 8,
              width: 640,
              height: 480,
            }}
          />
        </header>
      </div>

      </Layout>

    </>
  );
}

export default App;
