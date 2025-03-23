// import { useState } from "react"
// import { useHref } from "react-router-dom";
// import { Link } from "react-router-dom";
// import { Room } from "./Room";
// export const Landing = () => {
//     const [name, setName] = useState("");
    
//     return (
//       <div>
//         <input
//           type="text"
//           onChange={(e) => {
//             setName(e.target.value);
//           }}
//         ></input>
//         {/* <Link to={'Room/?name=${name}'} > join </Link> */}
//         <Link to={`/Room?name=${encodeURIComponent(name)}`}>Join</Link>
//       </div>
//     );
// }

// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// export const Landing = () => {
//   const [name, setName] = useState("");
//   const [joined, setJoined] = useState(false);

//   const [localAudioTrack, setLocalAudioTrack] = useState<MediaStreamTrack | null>(null);
//   const [localVideoTrack, setlocalVideoTrack] = useState<MediaStreamTrack | null>(null);
//   const videoRef = useRef<HTMLVideoElement>(null);

//   const getCam= async ()=>{
//     window.navigator.mediaDevices.getUserMedia({
//       video: true,
//       audio: true,
//     });
//   }
//   //media stream
//   const audioTrack = stream.getAudioTracks()[0];
//   const videoTrack = stream.getVideoTracks()[0];
//   setLocalAudioTrack(audioTrack);
//   setlocalVideoTrack(videoTrack);
//   if (!videoRef.current) {
//     return;
//   }
//   videoRef.current.srcObject = new MediaStream([videoTrack]);
//   videoRef.current.play();


//   useEffect(() => {
//     if (videoRef && videoRef.current) { 
//     getCam()
//     }
//   },[videoRef]);



//   return (
//     <div>
//       <video autoPlay ref={videoRef}></video>
//       <input
//         type="text"
//         placeholder="Enter your name"
//         onChange={(e) => setName(e.target.value)}
//       />
//       <Link to={`/Room?name=${encodeURIComponent(name)}`}>
//         <button>Join</button>
//       </Link>
//     </div>
//   );
// };
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Room } from "./Room";

export const Landing = () => {
  const [name, setName] = useState("");
  const [localAudioTrack, setLocalAudioTrack] =
    useState<MediaStreamTrack | null>(null);
  const [localVideoTrack, setlocalVideoTrack] =
    useState<MediaStreamTrack | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [joined, setJoined] = useState(false);

  const getCam = async () => {
    const stream = await window.navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    // MediaStream
    const audioTrack = stream.getAudioTracks()[0];
    const videoTrack = stream.getVideoTracks()[0];
    setLocalAudioTrack(audioTrack);
    setlocalVideoTrack(videoTrack);
    if (!videoRef.current) {
      return;
    }
    videoRef.current.srcObject = new MediaStream([videoTrack]);
    videoRef.current.play();
    // MediaStream
  };

  useEffect(() => {
    if (videoRef && videoRef.current) {
      getCam();
    }
  }, [videoRef]);

  if (!joined) {
    return (
      <div>
        <video autoPlay ref={videoRef}></video>
        <input
          type="text"
          onChange={(e) => {
            setName(e.target.value);
          }}
        ></input>
        <button
          onClick={() => {
            setJoined(true);
          }}
        >
          Join
        </button>
      </div>
    );
  }

  return (
    <Room
      name={name}
      localAudioTrack={localAudioTrack}
      localVideoTrack={localVideoTrack}
    />
  );
};