import { Box, Image} from "@chakra-ui/react";
import React from "react";
import coin from "../assets/btc.png";
import { motion } from "framer-motion";

function Home() {
  return (
    <Box
      w={"100%"}
      bgColor={"blackAlpha.900"}
      h={"80vh"}
      color={"white"}
      p={"4"}
      boxSizing={'border-box'}
    >
      <motion.div
        style={{
          height: "100%",
          width:'100%'
        }}

        animate={{
          translateY:'20px'
        }}

        transition={{
          duration:1.5,
          repeat:Infinity,
          repeatType:'reverse'
        }}
      >
        <Image src={coin} h={"100%"} w={"100%"} objectFit={"contain"} filter={'grayscale(1)'}/>
      </motion.div>
    </Box>
  );
}

export default Home;
