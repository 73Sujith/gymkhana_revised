import React, { useEffect } from "react";
import gsap from "gsap";

interface LoaderProps {
  text?: string;
  title?: string;
}

const Loader: React.FC<LoaderProps> = ({
  text = "Loading...",
  title = "Welcome to IITH Student Gymkhana",
}) => {
  useEffect(() => {
    gsap.to("#loader", { autoAlpha: 0, duration: 0.5 });
  }, []);

  return (
    <div
      id="loader"
      className="h-[100vh] w-full fixed bg-p z-[70] flex justify-center items-center flex-col gap-5"
    >
      <div className="text-3xl text-white font-semibold text-center">
        <h2>{title}</h2>
      </div>
      <div className="progress">
        <div className="color"></div>
      </div>
      <div className="text-r text-xl">
        <h2>{text}</h2>
      </div>

      {/* Style */}
      <style>
        {`
          #loader {
            background: #190d57;
            background-size: 80%;
          }

          .progress {
            position: relative;
            height: 7px;
            width: 40%;
            border: 10px solid #ff3b43;
            border-radius: 15px;
          }
          .progress .color {
            position: absolute;
            background-color: #ffffff;
            width: 0px;
            height: 10px;
            border-radius: 15px;
            top: -5px;
            animation: progres 4s infinite linear;
          }
          @keyframes progres {
            0% {
              width: 0%;
            }
            25% {
              width: 50%;
            }
            50% {
              width: 75%;
            }
            75% {
              width: 85%;
            }
            100% {
              width: 100%;
            }
          }
        `}
      </style>

      {/* Script */}
      <script
        is="inline"
        src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.3/gsap.min.js"
      ></script>
      <script defer>
        {`
          console.log(gsap);
          window.addEventListener("load", () => {
            gsap.to("#loader", { autoAlpha: 0, duration: 0.5 });
          });
        `}
      </script>
    </div>
  );
};

export default Loader;
