import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  HStack,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import Loader from "./Loader";
import Error from "./Error";
import { server } from "../index";

function Exchanges() {
  const [exchangeData, setExchangeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,setError] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${server}/exchanges?per_page=192&page=1`
      );
      console.log(response);
      setExchangeData(response.data);
      setLoading(false);
    } catch (error) {
      setExchangeData(false)
      setError(true);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if(error===true){
    return <Error/>
  }

  return loading ? (
    <Loader />
  ) : (
    <Container maxW={"container.xl"}>
      <HStack wrap={"wrap"}>
        {exchangeData.map((item) => (
          <ExchangeCard
            key={item.id}
            name={item.name}
            imgUrl={item.image}
            rank={item.trust_score_rank}
            url={item.url}
          />
        ))}
      </HStack>
    </Container>
  );
}

const ExchangeCard = ({ name, imgUrl, rank, url }) => (
  <Box
    shadow={"0px 5px 10px black"}
    m={"2rem 1rem"}
    p={"1rem"}
    h={"auto"}
    w={"7rem"}
    borderRadius={"5px"}
    css={{
      "&:hover": {
        translate: "0 -20%",
      },
    }}
    transition={"all 0.5s"}
    cursor={"pointer"}
  >
    <VStack>
      <a
        href={url}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
        target="blank"
      >
        <Image src={imgUrl} h={"10"} w={"10"}></Image>
        <Heading fontSize={"md"} noOfLines={"1"} m={"1rem 0"}>
          {name}
        </Heading>
        <Text>Rank {rank}</Text>
      </a>
    </VStack>
  </Box>
);

export default Exchanges;
