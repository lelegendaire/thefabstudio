"use client";
import { useEffect, useRef, useState } from "react";
import Copy from "./components/Copy";
import "./style_footer.css";
export default function About_us() {
  const sectionRef = useRef(null);
  const svgRef = useRef(null);
  const pathRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const svg = svgRef.current;
    const path = pathRef.current;

    if (!svg || !path) return;
      // --- Fonction pour recalculer la longueur du tracé
    function updatePathLength() {
      const newLength = path.getTotalLength();
      path.style.strokeDasharray = `${newLength}`;
      path.style.strokeDashoffset = `${newLength}`;
      return newLength;
    }

    let pathLength = updatePathLength();
    
   

    const handleScroll = () => {
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const distance = window.scrollY - 200;
      const totalDistance = svg.clientHeight - window.innerHeight;
      const percentage = Math.min(distance / totalDistance, 1); // clamp entre 0 et 1

      path.style.strokeDashoffset = `${pathLength * (1 - percentage)}`;
    };
    // Intersection Observer : active/désactive l’animation
    handleScroll(); // au cas où on recharge en plein milieu de la page
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", () => {
      pathLength = updatePathLength();
      handleScroll();
    });
    return () =>{
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updatePathLength);
    };
  }, []);
  return (
    <section
      ref={sectionRef}
      className="font-[Satoshi] text-white h-full p-4 bg-black relative"
      id="about_section"
    >
      <div className="z-10  relative">
        <Copy>
          <h1 className=" font-bold sm:text-8xl text-5xl bg-black sm:w-2xl w-full z-10 relative">
            About Us
          </h1>
        </Copy>
        <Copy>
          <p className="sm:w-2xl w-xs ml-auto sm:text-2xl text-xs">
            It all started with a simple thought, on a summer afternoon in 2023:
            what if I built a studio capable of creating truly unique websites,
            tailored to every person? It was just a dream, but already a strong
            conviction.
          </p>
        </Copy>
        <Copy>
          <p className="sm:w-2xl w-xs mr-auto sm:text-2xl text-xs sm:mt-80 mt-20">
            For a year, I worked on my first site – a project that would
            eventually allow people to easily create customizable websites. A
            year of testing, coding, and countless nights imagining how to make
            the web more original.
          </p>
        </Copy>
        <Copy>
          <p className="sm:w-2xl w-xs ml-auto sm:text-2xl text-xs sm:mt-80 mt-20">
            After months of work, the site was finally deployed. The Fab Studio
            officially came to life. I created an Instagram account to share
            ideas and my first creations.
          </p>
        </Copy>
        <Copy>
          <p className="sm:w-2xl w-xs mr-auto sm:text-2xl text-xs sm:mt-120 mt-40 sm:mb-50 mb-10">
            The Fab Studio was born of a desire to push back the boundaries of
            the web. A visual laboratory where innovation, aesthetics and
            interactivity meet to invent unique experiences.<br></br>
          </p>
        </Copy>
      </div>
      <svg
        ref={svgRef}
        viewBox="0 0 868 1448"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="squiggle absolute sm:top-[-250px] top-[0px] left-0 w-full sm:h-[400vh] h-[900px]  pointer-events-none"
      >
        <path
          className="line_glow"
          ref={pathRef}
          d="M13.0003 15C76.2003 76.6 123 61 239.5 79C356 97 618 122.179 643.5 115.5C669 108.821 751.5 78 747 46C742.5 14 717 -12 677 25C637 62 730 422.5 730 422.5H644C644 422.5 618 422.5 559 422.5C500 422.5 521 499.3 461 498.5C401 497.7 387.333 447.5 388 422.5C388.333 401.167 403.394 357.5 461 357.5C483 357.5 483 395.5 461 395.5C433.486 395.5 429 436.5 461 436.5C488.07 436.5 530 397.5 530 367.5C530 337.5 500.6 322.5 419 334.5C337.4 346.5 391 422.5 342 422.5C293 422.5 176 422.5 176 422.5C176 422.5 36.2912 486.749 12.9999 433C2.90705 409.709 5.35473 381.269 25.9999 366.5C40.7691 355.934 54.6859 353.975 72.4999 357.5C162.528 375.314 72.4999 658.5 118.108 738.138C150.648 794.959 167.069 862.982 231.108 876.638C260.135 882.828 323.608 878.138 323.608 844.638C323.608 811.138 323.608 776.138 323.608 742.138C323.608 720.868 319.608 712.138 298.108 712.138C277.916 712.138 244.608 706.947 244.608 727.138C244.608 750.638 265.719 736.638 284.108 736.638C319.108 736.638 374.608 729.638 417.608 750.638C424.56 754.034 420.967 738.874 421.108 731.138C421.611 703.523 379.544 644.638 382.108 672.138C387.608 731.138 385.608 766.638 387.608 844.638C387.904 856.188 372.755 864.124 362.108 859.638C349.871 854.483 357.794 838.196 362.108 825.638C374.318 790.087 423.923 834.271 458.108 818.638C479.772 808.731 511.352 804.984 506.608 781.638C502.416 761.013 463.083 778.588 458.108 758.138C452.558 735.33 482.054 729.849 501.108 716.138C518.336 703.74 527.968 688.727 549.107 690.638C587.612 694.12 514.113 773.202 549.107 789.638C565.544 797.359 595.608 789.638 595.608 789.638C595.608 789.638 772.348 856.539 809.108 781.638C816.872 765.818 804.733 744.651 821.108 738.138C835.809 732.292 850.718 740.649 858.108 754.638C866.616 770.747 856.036 785.368 844.108 799.138C833.863 810.965 820.09 807.494 809.108 818.638C778.777 849.418 831.237 1077.99 821.108 1120C805.99 1182.69 766.201 1214.35 706.608 1239C649.772 1262.51 628.178 1265.41 578.608 1229C557.608 1213.57 486.108 1186 484.108 1159C481.977 1130.23 447.608 1132.5 447.108 1160C446.608 1187.5 447.108 1211 413.108 1211C383.608 1211 381.608 1243 413.108 1243C444.608 1243 447.108 1237 447.108 1283.5C447.108 1330 484.108 1320.22 484.108 1283.5C484.108 1250.5 476.108 1239 515.608 1239C549.608 1239 538.107 1219 506.608 1219L454.108 1227L356.608 1234C356.608 1234 258.974 1242.64 224.608 1248.5C190.241 1254.36 170.974 1257.64 136.608 1263.5C102.241 1269.36 120.024 1310.59 127.608 1339.5C144.92 1405.5 225.802 1384.3 293.108 1395.5C375.397 1409.2 484.577 1308.04 506.608 1388.5C512.589 1410.35 506.608 1446.5 506.608 1446.5"
          stroke="#b98d6b"
          strokeWidth="7"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
    </section>
  );
}
