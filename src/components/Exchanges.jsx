import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
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
  const [error, setError] = useState(false);
  const [page, setPage] = useState(1);
  const [totalData, setTotalData] = useState(1);
  const [pageChage,setPageChange] = useState(false);
  const btns = new Array(Math.ceil(totalData / 192)).fill(1);

  function changePageHandler(value) {
    setLoading(true);
    setPage(value);
    setPageChange(true);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${server}/exchanges?per_page=192&page=${page}`
        );
        console.log(response);
        setTotalData(Number(response.headers.total));
        setExchangeData(response.data);
        setLoading(false);
        setPageChange(false);
      } catch (error) {
        setError(true);
      }
    };
    fetchData();
  }, [page,pageChage]);

  if (error === true) {
    return <Error />;
  }

  return loading ? (
    <Loader />
  ) : (
    <Container maxW={"container.xl"}>
      <HStack wrap={"wrap"} justifyContent={'center'}>
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
      <HStack p={'1rem'}>
        {btns.map((item, idx) => {
          return (
            <Button
              onClick={() => {
                changePageHandler(idx + 1);
              }}
              key={idx}
              bgColor={'blackAlpha.900'}
              color={'white'}
              variant={'unstyled'}
            >
              {idx + 1}
            </Button>
          );
        })}
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
