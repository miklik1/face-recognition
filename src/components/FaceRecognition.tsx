import React from "react";

interface FaceRecognitionProps {
  imageUrl: string;
  box: Record<string, number>
}

const FaceRecognition: React.FC<FaceRecognitionProps> = ({
  imageUrl,
  box,
}: FaceRecognitionProps) => {
  return (
    <div style={{ width: 800 + "px", height: 400 + "px" }}>
      <div className="absolute" style={{ width: 800 + "px", height: "auto" }}>
        <img
          id="inputimage"
          className="rounded-md drop-shadow-md"
          src={imageUrl}
          alt="sample"
        />
        <div
          className="bounding-box"
          style={{
            left: box.leftCol,
            top: box.topRow,
            right: box.rightCol,
            bottom: box.bottomRow,
          }}
        ></div>
      </div>
    </div>
  );
};

export default FaceRecognition;
