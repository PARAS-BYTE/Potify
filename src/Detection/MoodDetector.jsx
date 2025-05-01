import { useState, useEffect, useRef } from 'react';
import * as faceapi from '@vladmandic/face-api';
import './MoodDetector.css'
import { useNavigate } from 'react-router-dom';

const MoodDetector = () => {
  const videoRef = useRef(null);
  const [is,setis]=useState(false)
  const canvasRef = useRef(null);
  const debugRef = useRef(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [mood, setMood] = useState('Ready to detect your mood');
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [webcamStarted, setWebcamStarted] = useState(false);
  const [debugInfo, setDebugInfo] = useState('Debug info will appear here');
  const detectionIntervalRef = useRef(null);

 
  // Add debug message
  const addDebug = (message) => {
    const timestamp = new Date().toLocaleTimeString();
    const newMessage = `[${timestamp}] ${message}\n`;
    
    setDebugInfo((prevDebug) => {
      const combinedMessage = prevDebug + newMessage;
      // Keep only the most recent 20 lines
      const lines = combinedMessage.split('\n');
      if (lines.length > 21) {
        return lines.slice(lines.length - 21).join('\n');
      }
      return combinedMessage;
    });
    
    console.log(message);
  };

  useEffect(()=>{
    startWebcam()
  },[])
  // Start webcam
  const startWebcam = async () => {
    addDebug("Starting webcam...");
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 720 },
          height: { ideal: 560 },
          facingMode: "user" // Use front camera on mobile devices
        }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        addDebug("Webcam started successfully");
        
        // Wait for video metadata to load
        videoRef.current.onloadedmetadata = () => {
          addDebug(`Video dimensions: ${videoRef.current.videoWidth}x${videoRef.current.videoHeight}`);
          setWebcamStarted(true);
        };
      }
    } catch (err) {
      addDebug(`ERROR: Webcam error: ${err.message}`);
      setMood("Webcam access denied");
    }
  };

  // Load face-api models
  const loadModels = async () => {
    setMood("Loading AI models...");
    
    try {
      // Use CDN-hosted models instead of local files
      const cdnModelPath = 'https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model';
      addDebug("Loading models from CDN: " + cdnModelPath);
      
      // Load models directly from CDN
      addDebug("Loading tiny face detector model...");
      await faceapi.nets.tinyFaceDetector.loadFromUri(cdnModelPath);
      addDebug("Tiny face detector loaded successfully");
      
      addDebug("Loading face expression model...");
      await faceapi.nets.faceExpressionNet.loadFromUri(cdnModelPath);
      addDebug("Face expression model loaded successfully");
      
      addDebug("All models loaded successfully!");
      setMood("Ready to detect mood");
      setModelsLoaded(true);
    } catch (error) {
      addDebug("Error loading models from CDN: " + error);
      setMood("Failed to load AI models");
      
      // Try alternative loading method
      try {
        addDebug("Trying alternative loading method...");
        const altCdnPath = 'https://justadudewhohacks.github.io/face-api.js/models';
        
        addDebug("Loading from alternative CDN: " + altCdnPath);
        await faceapi.nets.tinyFaceDetector.loadFromUri(altCdnPath);
        await faceapi.nets.faceExpressionNet.loadFromUri(altCdnPath);
        
        addDebug("Alternative loading successful!");
        setMood("Ready to detect mood");
        setModelsLoaded(true);
      } catch (altError) {
        addDebug("Alternative loading also failed: " + altError);
        setMood("Failed to load AI models");
      }
    }
  };

  // Get emoji based on emotion
  const getEmoji = (emotion) => {
    switch(emotion) {
      case 'happy': return '';
      case 'sad': return '';
      case 'angry': return '';
      case 'fearful': return '';
      case 'disgusted': return '';
      case 'surprised': return '';
      case 'neutral': return '';
      default: return '';
    }
  };

  // Start mood detection
  const startMoodDetection = () => {
    if (isDetecting || !videoRef.current || !canvasRef.current) return;
    
    addDebug("Starting mood detection...");
    setMood("Looking for faces...");
    setIsDetecting(true);
    
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    const displaySize = { width: video.width, height: video.height };
    faceapi.matchDimensions(canvas, displaySize);
    
    // Detection parameters
    const detectionOptions = new faceapi.TinyFaceDetectorOptions({
      inputSize: 416,    // Try different input sizes: 128, 416, 512
      scoreThreshold: 0.3  // Try lowering this: 0.5 (default) to 0.3 or even 0.1
    });
    
    addDebug("Detection options set");
    
    detectionIntervalRef.current = setInterval(async () => {
      try {
        // Check if video is ready
        if (video.readyState !== 4) {
          addDebug("Video not ready yet, readyState: " + video.readyState);
          return; // Video not ready yet
        }
        
        // Attempt to detect faces
        const detections = await faceapi
          .detectAllFaces(video, detectionOptions)
          .withFaceExpressions();
        
        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        
        // Clear the canvas and draw detections
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        faceapi.draw.drawDetections(canvas, resizedDetections);
        
        if (detections.length > 0) {
          const expressions = detections[0].expressions;
          const sorted = Object.entries(expressions).sort((a, b) => b[1] - a[1]);
          
          // Get the most prominent emotion with confidence level
          const topEmotion = sorted[0][0];
          const confidence = sorted[0][1].toFixed(2);
          
          // Format the emotion name to look nicer (capitalize first letter)
          const formattedEmotion = topEmotion.charAt(0).toUpperCase() + topEmotion.slice(1);
          
          // Set mood with emoji
          const emoji = getEmoji(topEmotion);
          setMood(`${formattedEmotion}`);
            








            setis(true)




          "There is the last thing i need"







          
        
          //
          // Log the detailed info to debug
          addDebug(`Detected mood: ${formattedEmotion} (confidence: ${confidence})`);
          
          // Draw a box around the face with mood label
          ctx.strokeStyle = 'green';
          ctx.lineWidth = 3;
          const box = resizedDetections[0].detection.box;
          ctx.strokeRect(box.x, box.y, box.width, box.height);
          
          // Add label above the box
          ctx.fillStyle = 'rgba(0, 255, 0, 0.5)';
          ctx.fillRect(box.x, box.y - 30, 120, 30);
          ctx.fillStyle = 'white';
          ctx.font = '20px Arial';
          ctx.fillText(formattedEmotion, box.x + 5, box.y - 10);
        } else {
          setMood("No face detected");
        }
      } catch (error) {
        addDebug("Detection error: " + error.message);
        setMood("Detection error");
      }
    }, 500);
  };

  // Stop mood detection
  const stopMoodDetection = () => {
    if (!isDetecting) return;
    
    addDebug("Stopping mood detection");
    clearInterval(detectionIntervalRef.current);
    detectionIntervalRef.current = null;
    setIsDetecting(false);
    
    // Clear the canvas
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
    
    // setMood();
  };

  // Toggle detection on/off
  const toggleDetection = () => {
    if (isDetecting) {
      stopMoodDetection();
    } else {
      startMoodDetection();
    }
  };

  // Initialize component
  useEffect(() => {
    // Check if face-api is loaded
    if (typeof faceapi === 'undefined') {
      addDebug("ERROR: Face API not loaded properly");
      setMood("Error: Face API not loaded");
      return;
    } else {
      addDebug("Face API loaded successfully");
    }
    
    // Start webcam and load models
    startWebcam();
    loadModels();
    
    // Cleanup on component unmount
    return () => {
      if (detectionIntervalRef.current) {
        clearInterval(detectionIntervalRef.current);
      }
      
      // Stop webcam
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  const navigate=useNavigate()
  if(is){
    // console.log(mood)
    // setis(true)
    stopMoodDetection()
    let searchQuery=mood;
    // console.log("search Query ",searchQuery)
    navigate("/detected",{state : {searchQuery}})
    return (
        <> 
            <div>Mood is {mood}</div>
        </>
    )
  }else{

  
  return (
    <div className="mood-detector">
      <h1>Mood Detector</h1>
      
      <div className="controls">
        <button 
          className="detect-button"
          onClick={toggleDetection}
          disabled={!modelsLoaded || !webcamStarted}
        >
          {isDetecting ? "Stop Detection" : "Start Mood Detection"}
        </button>
      </div>
      
      <div className="mood-display">
        {mood}
      </div>
      
      <div className="video-container">
        <video  
        style={{visibility :"hidden"}}
          ref={videoRef}
          width="1"
          height="1"
          autoPlay
          muted
        />
        <canvas  
        // style={{visibility :"hidden"}}
        style={{display :"none"}}
          ref={canvasRef}
          width="120"
          height="120"
        />
        <img src="https://cdn.pixabay.com/animation/2024/06/30/08/03/08-03-48-336_512.gif" alt="" />
      </div>
      
      {/* <div 
        className="debug-info"
        ref={debugRef}
      >
        {debugInfo}
      </div> */}
    </div>
  );
};
}

export default MoodDetector;









