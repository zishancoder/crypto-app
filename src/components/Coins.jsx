import { Button, Container, HStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import CoinCard from "./CoinCard";
import axios from "axios";
import { server } from "../index";
import Loader from "./Loader";
import Error from "./Error";

function Coins() {
  const [coinData, setCoinData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page,setPage] = useState(1);
  const btns = new Array(132).fill(1);


  const btnClickHandler = (val) =>{
    setPage(val);
    setLoading(true);
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${server}/coins/markets?vs_currency=inr&page=${page}`
        );
        setCoinData(response.data);
        setLoading(false);
      } catch (error) {
        setError(true);
      }
    };
    fetchData();
  }, [page]);

  if (error === true) {
    return <Error />;
  }

  return loading ? (
    <Loader />
  ) : (
    <Container maxW={"container.xl"}>
      <HStack wrap={"wrap"} p={"1rem "}>
        {coinData.map((data) => (
          <CoinCard
            imgSrc={data.image}
            name={data.name}
            key={data.id}
            currentPrice={data.current_price}
          />
        ))}
      </HStack>
      <HStack overflowX={"auto"}>
        {btns.map((item, idx) => (
          <Button
            bgColor={"blackAlpha.900"}
            color={"white"}
            variant={"unstyled"}
            onClick={()=>{btnClickHandler(idx+1)}}
          >
            {idx + 1}
          </Button>
        ))}
      </HStack>
    </Container>
  );
}

export default Coins;
