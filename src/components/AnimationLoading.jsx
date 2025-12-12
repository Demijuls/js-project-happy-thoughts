import Lottie from "lottie-react";
import animationData from "../assets/animationData.json";

const AnimationLoading = () => {
  const options = {
    animationData: animationData,
    loop: true,
    autoplay: true,
  };

  const { View } = Lottie(options);

  return (
    <div style={{ height: 400, width: 400 }}>
      <Lottie
        animationData={animationData}
        loop={true}
        autoplay={true}
        style={{ width: 400, height: 400 }}
      />
    </div>
  );
};

export default AnimationLoading;
