import { Avatar,Box, Text, VStack } from "@chakra-ui/react";
import React from "react";

function Footer() {
  return (
    <Box
      bgColor={"blackAlpha.900"}
      display={"flex"}
      justifyContent={"space-between"}
      boxSizing={'border-box'}
      p={'2rem'}
      alignItems={'center'}
    >
      <VStack alignItems={'flex-start'}>
        <Text color={"white"} fontSize={'lg'}>About</Text>
        <Text color={"whiteAlpha.800"}>This website provide insight about crypto currencies.</Text>
      </VStack>
      <VStack>
        <Avatar size={'lg'} src={'https://lh3.googleusercontent.com/a/AAcHTtfsDzOaWVGV_jvqQPQv4BSuFVAuj26kz7kV7EFAFg=s360-c-no'}></Avatar>
        <Text color={"white"} textAlign={'center'}>Made by Zishan<br/>With ❤️</Text>
      </VStack>
    </Box>
  );
}

export default Footer;
