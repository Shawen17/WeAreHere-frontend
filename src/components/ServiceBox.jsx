import { useEffect } from "react";
import styled from "styled-components";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

const Top = styled.img`
  display: flex;
  width: 100%;
  height: 50%;
  flex: 1;
`;

const Bottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  overflow: hidden;
  position: relative;
`;

const Title = styled.h4`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #18a558;
`;

const ServiceBox = ({ message, src, alt, invert = false, title }) => {
  const control = useAnimation();
  const [ref, inView] = useInView();

  const boxVariant = {
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    hidden: { opacity: 0, scale: 0 },
  };

  useEffect(() => {
    if (inView) {
      control.start("visible");
    } else {
      control.start("hidden");
    }
  }, [control, inView]);

  const handleInvert = (val) => {
    if (val === true) {
      return (
        <motion.div
          ref={ref}
          variants={boxVariant}
          initial="hidden"
          animate={control}
          className="con"
        >
          <Title>{title}</Title>
          <Bottom>
            <div className="bar">
              <span className="bar_content">{message}</span>
            </div>
          </Bottom>

          <Top src={src} alt={alt} />
        </motion.div>
      );
    } else {
      return (
        <motion.div
          ref={ref}
          variants={boxVariant}
          initial="hidden"
          animate={control}
          className="con"
        >
          <Title>{title}</Title>

          <Top src={src} alt={alt} />

          <Bottom>
            <div className="bar">
              <span className="bar_content">{message}</span>
            </div>
          </Bottom>
        </motion.div>
      );
    }
  };

  return handleInvert(invert);
};

export default ServiceBox;
