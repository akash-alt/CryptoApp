import React from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import { server } from "../index"
import { useState } from 'react';
import { Container, Heading, HStack, Image, Text, VStack } from '@chakra-ui/react';
import Loader from './Loader';
import ErrorShow from './ErrorShow';
import CoinCard from './CoinCard';

const Exchanges = () => {

  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try{
        const { data } = await axios.get(`${server}/exchanges`)
        console.log(data)
        setExchanges(data)
        setLoading(false)
      }catch(error){
        setLoading(false)
        setError(true)
      }
    }
    fetchData()
  }, [])

  if(error) return <ErrorShow message={"error while fetching data"}/>

  return (
    <>
      <Container maxW={"container.xl"}>
        {
          loading ? <Loader /> :
            <>
              <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
                {
                  exchanges.map((item) => (
                    <ExchangeCard
                      key={item.id}
                      name={item.name}
                      rank={item.trust_score_rank}
                      img={item.image}
                      url={item.url}
                    />
                  ))
                }
              </HStack>
            </>
        }
      </Container>
    </>
  )
}

//* this is used for shifting one page to another page
const ExchangeCard = ({ name, rank, img, url }) => {
  return (
    <a href={url} target={"_blank"}>
      <VStack
        w={"52"}
        shadow={"lg"}
        p={"8"}
        borderRadius={"lg"}
        transition={"all 0.3s"}
        m={"4"}
        css={{
          "&:hover": {
            transform: "scale(1.1)",
          },
        }}
      >
        <Image
          src={img}
          w={"10"}
          h={"10"}
          objectFit={"contain"}
          alt={"Exchange"}
        />
        <Heading size={"md"} noOfLines={1}>
          {rank}
        </Heading>

        <Text noOfLines={1}>{name}</Text>
      </VStack>
    </a>
  )
}

export default Exchanges