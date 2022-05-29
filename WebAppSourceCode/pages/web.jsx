import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';

function WebcamSample() {

    const [isShowVideo, setIsShowVideo] = useState(false);
    const videoElement = useRef(null);
    
    const videoConstraints = {
        width: 640,
        height: 480,
        facingMode: "user"
    }

    const startCam = () => {
        setIsShowVideo(true);
    }

    const stopCam = () => {
        let stream = videoElement.current.stream;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        setIsShowVideo(false);
    }

    return (
        <div>
            <div className="camView">
                {isShowVideo &&
                    <Webcam audio={false} ref={videoElement} videoConstraints={videoConstraints} />
                }
            </div>
            <button onClick={startCam}>Start Video</button>
            <button onClick={stopCam}>Stop Video</button>
        </div>
    );
};

export default WebcamSample;