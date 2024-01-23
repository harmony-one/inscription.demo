import React, { useEffect, useState } from "react";
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

    useEffect(() => {
        fetchData().then(() => setIsLoaded(true));

        const intervalId = setInterval(() => fetchData(), 5000);

        return () => clearInterval(intervalId);
    }, [])

    if(!isLoaded) {
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
            <Text color="white">Time left: </Text>
            <CountDownTimer
                dateTime={new Date(lotteryInfo?.endTime * 1000).toISOString()}
            />
        </Box>

        <Box>
            <Text><b>First tx:{' '}</b>
                <a
                    target="_blank"
                    style={{ cursor: 'pointer' }}
                    href={`https://explorer.harmony.one/tx/${lotteryInfo?.firstTx}`}>
                    {truncateAddressString(lotteryInfo?.firstTx)}
                </a>
            </Text>
        </Box>

        <Box gap="small" align="center">
            <Text><b>Winner tx:{' '}</b>
                <a
                    target="_blank"
                    style={{ cursor: 'pointer' }}
                    href={`https://explorer.harmony.one/tx/${lotteryInfo?.winnerTx}`}>
                    {truncateAddressString(lotteryInfo?.winnerTx)}
                </a>
            </Text>
            <Text><b>Winner domain:{' '}</b>
                {lotteryInfo?.winnerDomain}
            </Text>

            <Text><b>Winner link:{' '}</b>
                {lotteryInfo?.winnerLink}
            </Text>
        </Box>
    </Box>
})