import React, { useEffect, useState } from "react";
import { Tweet } from 'react-tweet'
import { Box, RadioButton, Text, TextArea, TextInput } from "grommet";
import CountDownTimer from "@inlightmedia/react-countdown-timer";
import { dateFormat, truncateAddressString } from "utils";
import axios from "axios";

export const LotteryInfoBlock = (() => {
    const [lotteryInfo, setLotteryInfo] = useState<any>();
    const [isLoaded, setIsLoaded] = useState(false);

    const fetchData = async () => {
        const res = await axios.get('https://inscription-indexer.fly.dev/lottery');

        setLotteryInfo(res.data);
    }

    const getTweetId = (url: string) => {
        const regex = /\/status\/(\d+)/;
        const match = url.match(regex);
        return match[1];
    }

    useEffect(() => {
        fetchData().then(() => setIsLoaded(true));
        const intervalId = setInterval(() => fetchData(), 5000);
        return () => clearInterval(intervalId);
    }, [])

    if (!isLoaded) {
        return null;
    }

    return <Box
        gap="large"
        fill={true}
        align="center"
    >
        <Box>
            <Text>From:{' '}
                <b>{dateFormat(lotteryInfo?.startTime * 1000)}</b>
                {' '}to{' '}
                <b>{dateFormat(lotteryInfo?.endTime * 1000)}</b>
            </Text>
        </Box>

        <Box
            direction="row"
            gap="small"
            fill={true}
            align="center"
            justify="center"
            background="rgb(0, 174, 233)"
            style={{ maxWidth: 400, minHeight: 50 }}
        >
            {lotteryInfo?.endTime * 1000 > Date.now() ?
                <Box direction="row" gap="small" align="center">
                    <Text color="white">Time left:</Text>
                    <CountDownTimer
                        dateTime={new Date(lotteryInfo?.endTime * 1000).toISOString()}
                    />
                </Box> :
                <Text color="white">Finished</Text>
            }
        </Box>

        <Box>
            <Text><b>Origin Inscription:{' '}</b>
                <a
                    target="_blank"
                    style={{ cursor: 'pointer' }}
                    href={`https://explorer.harmony.one/tx/${lotteryInfo?.firstTx}`}>
                    {truncateAddressString(lotteryInfo?.firstTx)}
                </a>
            </Text>
        </Box>

        <Box gap="small" align="center" className="light">
            <Text><b>Closest Entry (current winner):{' '}</b>
                <a
                    target="_blank"
                    style={{ cursor: 'pointer' }}
                    href={`https://explorer.harmony.one/tx/${lotteryInfo?.winnerTx}`}>
                    {truncateAddressString(lotteryInfo?.winnerTx)}
                </a>
            </Text>
            {/* <Text><b>Current Winner Domain:{' '}</b> */}
            {/* <a target="_blank" href={`https://${lotteryInfo?.winnerDomain}.country`}>{lotteryInfo?.winnerDomain}.country</a> */}
            {/* {lotteryInfo?.winnerDomain} */}
            {/* </Text> */}
            <Text><b>Current Winner Tweet</b></Text>
            <Tweet id={getTweetId(lotteryInfo?.winnerLink)} />
        </Box>
    </Box>
})