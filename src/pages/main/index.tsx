import React, { useEffect, useState } from "react";
import { Box, RadioButton, Text, TextArea, TextInput } from "grommet";
import { SendTxBlock } from "./SendTxBlock";
import { LotteryInfoBlock } from "./LotteryInfoBlock";
import { InscriptionHistory } from "./InscriptionHistory";
import axios from "axios";

const Plane = (props?: any) => {
    return <Box
        pad="large"
        fill={true}
        style={{
            border: `1px solid rgba(0, 0, 0, ${props.borderOpacity ?? '0.01'})`,
            borderRadius: '15px',
            background: props.background
        }}
    >
        {props.children}
    </Box>
}

export const Main = (() => {
    const [lotteryInfo, setLotteryInfo] = useState<any>();
    const [isLoaded, setIsLoaded] = useState(false);

    const fetchData = async () => {
        const res = await axios.get('https://inscription-indexer.fly.dev/lottery');

        setLotteryInfo(res.data);
    }

    useEffect(() => {
        fetchData().then(() => setIsLoaded(true));
        const intervalId = setInterval(() => fetchData(), 5000);
        return () => clearInterval(intervalId);
    }, [])

    return <Box gap="large" fill={true} align="center">
        <Box gap="medium" align="center" fill={true}>
            <Text size="xlarge" weight="bold">Quest</Text>
            <Text size="medium" style={{ maxWidth: '100%' }}>
                Inscribe your favorite tweet. In 24 hours, the transaction hash with the closest last 2 digits to the Origin Inscription's last 2 digits (in HEX) will win 10,000 ONES and 2,000 ONE!
                <br /> <br />
                <em><small>*In the event of tie, winner will be decided based on the latest inscription.</small></em>
            </Text>
        </Box>

        <Plane background="#f2f3f7">
            <LotteryInfoBlock isLoaded={isLoaded} lotteryInfo={lotteryInfo} />
        </Plane>

        <Plane borderOpacity="0.1">
            <SendTxBlock />
        </Plane>

        <Plane background="#f2f3f7">
            <InscriptionHistory lotteryInfo={lotteryInfo} />
        </Plane>
    </Box>
})