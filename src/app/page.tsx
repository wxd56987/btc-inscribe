"use client";
import { Text, Center, VStack, Button, HStack, Input } from "@chakra-ui/react";
import { useState } from "react";

export default function Home() {
  const [address, setAddress] = useState("");
  const [publickKey, setPublickKey] = useState("");
  const [network, setNetwork] = useState("");
  const [signMessage, setSignMessage] = useState("");
  const [signType, setSignType] = useState("");
  const [signMessageResult, setSignMessageResult] = useState("");
  const [signPsbt, setSignPsbt] = useState("");
  const [signPsbtResult, setSignPsbtResult] = useState("");
  const [txid, setTxid] = useState("");
  return (
    <Center>
      <VStack
        w="full"
        justifyContent="start"
        alignItems="self-start"
        px={10}
        spacing={7}
        maxWidth="7xl"
        py={10}
      >
        <Text>----------Set Network-------------</Text>
        <Text>NetWork: {network}</Text>
        <HStack>
          <Button
            onClick={async () => {
              try {
                let network = await (window as any).unisat.switchNetwork(
                  "livenet"
                );
                setNetwork(network);
              } catch (e) {
                console.log("connect failed");
              }
            }}
            variant={network === "livenet" ? "solid" : "outline"}
          >
            Connect Livenet Network
          </Button>
          <Button
            onClick={async () => {
              try {
                let network = await (window as any).unisat.switchNetwork(
                  "testnet"
                );
                setNetwork(network);
              } catch (e) {
                console.log("connect failed");
              }
            }}
            variant={network === "testnet" ? "solid" : "outline"}
          >
            Connect TestNetwork Network
          </Button>
        </HStack>
        <Text>----------Get Address-------------</Text>
        <Text>Address: {address}</Text>
        <Button
          onClick={async () => {
            try {
              let accounts = await (window as any).unisat.requestAccounts();
              console.log("connect success", accounts);
              setAddress(accounts);
            } catch (e) {
              console.log("connect failed");
            }
          }}
        >
          Connect Wallet
        </Button>
        <Text>----------Get Public key-------------</Text>
        <Text>PublickKey: {publickKey}</Text>
        <Button
          onClick={async () => {
            try {
              let pub = await (window as any).unisat.getPublicKey();
              setPublickKey(pub);
            } catch (e) {
              console.log("connect failed");
            }
          }}
        >
          Get Publick Key
        </Button>
        <Text>----------Sign Message-------------</Text>
        <HStack>
          <Button
            onClick={() => {
              setSignType("ecdsa");
            }}
            variant={signType === "ecdsa" ? "solid" : "outline"}
          >
            ecdsa
          </Button>
          <Button
            onClick={() => {
              setSignType("bip322-simple");
            }}
            variant={signType === "bip322-simple" ? "solid" : "outline"}
          >
            bip322-simple
          </Button>
        </HStack>
        <Input
          placeholder="message to sign"
          value={signMessage}
          defaultValue=""
          onChange={(e) => {
            setSignMessage(e.target.value);
          }}
        />
        <Text>Sign Result: {signMessageResult}</Text>
        <Button
          onClick={async () => {
            try {
              let sig = await (window as any).unisat.signMessage(
                signMessage,
                signType
              );
              console.log(sig);
              setSignMessageResult(sig);
            } catch (e) {
              console.log("connect failed");
            }
          }}
        >
          Sign Message
        </Button>
        <Text>----------Sign Psbt-------------</Text>
        <Input
          placeholder="message to sign psbt"
          value={signPsbt}
          defaultValue=""
          onChange={(e) => {
            setSignPsbt(e.target.value);
          }}
        />
        <Text>Sign Psbt Result: {signPsbtResult}</Text>
        <Button
          onClick={async () => {
            try {
              let sig = await (window as any).unisat.signPsbt(signPsbt);
              console.log(sig);
              setSignPsbtResult(sig);
            } catch (e) {
              console.log("connect failed");
            }
          }}
        >
          Sign Psbt
        </Button>
        <Text>----------Push Psbt-------------</Text>
        <Input placeholder="message to sign psbt" value={signPsbtResult} />
        <Text>Push Psbt Result: {txid}</Text>
        <Button
          onClick={async () => {
            console.log(signPsbtResult, 'sss--->>')
            try {
              let sig = await (window as any).unisat.pushPsbt(signPsbtResult);
              console.log(sig);
              setTxid(sig);
            } catch (e) {
              console.log("connect failed");
            }
          }}
        >Push Psbt</Button>
      </VStack>
    </Center>
  );
}
