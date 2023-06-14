import { Box, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";



function CoinCard({ imgSrc, name, currentPrice, currenySymbol='₹' }) {
  return (
    <Link to={'/coindetails'}>
      <Box
        p={"1rem"}
        w={"8rem"}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        flexDirection={"column"}
        borderRadius={"5px"}
        boxShadow={"0 5px 10px black"}
        m={"1rem"}
        transition={'all 0.5s'}
        css={{
          '&:hover':{
            translate:'0 -20%',
          }
        }}
      >
        <Image src={imgSrc} h={"3rem"} w={"3rem"} />
        <Heading fontSize={"md"} noOfLines={"1"} m={'0.5rem 0'}>
          {name}
        </Heading>
        <Text>{currenySymbol} {currentPrice?currentPrice:"NA"}</Text>
      </Box>
    </Link>
  );
}

export default CoinCard;
