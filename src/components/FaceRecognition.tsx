const FaceRecognition = ({ imageUrl, box } : any) => {
  return (
    <div>
      <div className="absolute">
        <img id='inputimage' className="rounded-md drop-shadow-md" src={imageUrl} alt="sample" />
        <div className="bounding-box" style={{left: box.leftCol, top: box.topRow, right: box.rightCol, bottom: box.bottomRow}}></div>
      </div>
    </div>
  );
};

export default FaceRecognition;
