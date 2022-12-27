import React from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import { server } from "../index"
import { useState } from 'react';
import { Button, Container, Heading, HStack, Image, Radio, RadioGroup, Text, VStack } from '@chakra-ui/react';
import Loader from './Loader';
import ErrorShow from './ErrorShow';
import CoinCard from './CoinCard';

const Coin = () => {

  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [pages, setPages] = useState(1);
  const [currency, setCurrency] = useState("usd")

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const changePage = (page) => {
    setPages(page)
    setLoading(2)
  }

  const btn = new Array(132).fill(1)


  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${pages}`)
        console.log(data)
        setCoins(data)
        setLoading(false)
      } catch (error) {
        setLoading(false)
        setError(true)
      }
    }
    fetchCoins()
  }, [currency, pages])

  if (error) return <ErrorShow message={"error while fetching coins"} />

  return (
    <>
      <Container maxW={"container.xl"}>
        {
          loading ? <Loader /> :
            <>
              <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
                <HStack spacing={"4"}>
                  <Radio value={"inr"}>INR</Radio>
                  <Radio value={"usd"}>USD</Radio>
                  <Radio value={"eur"}>EUR</Radio>
                </HStack>
              </RadioGroup>

              <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
                {
                  coins.map((item) => (
                    <CoinCard
                      id={item.id}
                      key={item.id}
                      price={item.current_price}
                      symbol={item.symbol}
                      name={item.name}
                      rank={item.trust_score_rank}
                      img={item.image}
                      url={item.url}
                      currencySymbol={currencySymbol}
                    />
                  ))
                }
              </HStack>

              <HStack w={"full"} overflowX={"auto"} p={"8"}>

                {
                  btn.map((item, index) => (
                    <Button
                      key={index}
                      onClick={() => changePage(index + 1)}>
                      {index + 1}
                    </Button>
                  ))
                }
              </HStack>
            </>
        }
      </Container>
    </>
  )
}

export default Coin