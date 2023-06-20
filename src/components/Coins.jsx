import { Button, Container, HStack, Radio, RadioGroup } from "@chakra-ui/react";
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
  const [currency,setCurrency] = useState('inr');
  const [currencySymbol,setCurrencySymol] = useState('₹');

  const btns = new Array(132).fill(1);


  const btnClickHandler = (val) =>{
    setPage(val);
    setLoading(true);
  }
  
  useEffect(()=>{
    const symbol = currency==='inr'?'₹':currency==='usd'?'$':'€';
    setCurrencySymol(symbol);
  },[currency])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${server}/coins/markets?vs_currency=${currency}&page=${page}`
        );
        setCoinData(response.data);
        setLoading(false);
      } catch (error) {
        setError(true);
      }
    };
    fetchData();
  }, [page,currency]);

  if (error === true) {
    return <Error />;
  }

  return loading ? (
    <Loader />
  ) : (
    <Container maxW={"container.xl"}>
      <RadioGroup value={currency} onChange={setCurrency} display={'flex'} gap={'1rem'}>
        <Radio value='inr'>INR</Radio>
        <Radio value='usd'>USD</Radio>
        <Radio value='eur'>EUR</Radio>
      </RadioGroup>
      <HStack wrap={"wrap"} p={"1rem "} justifyContent={'center'}>
        {coinData.map((data) => (
          <CoinCard
            id={data.id}
            imgSrc={data.image}
            name={data.name}
            key={data.id}
            currentPrice={data.current_price}
            currenySymbol={currencySymbol}
          />
        ))}
      </HStack>
      <HStack overflowX={"auto"}>
        {btns.map((item, idx) => (
          <Button
            key={idx}
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
