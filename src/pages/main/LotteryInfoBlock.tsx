import React, { useEffect, useState } from "react";
import { Box, RadioButton, Text, TextArea, TextInput } from "grommet";
import CountDownTimer from "@inlightmedia/react-countdown-timer";
import { dateFormat, truncateAddressString } from "utils";

export const LotteryInfoBlock = (() => {
    const [lotteryInfo, setLotteryInfo] = useState({
        startTime: 1706018981,
        endTime: 1706105381,
        firstTx: '0xed92180b65d6597b6cb6b89ea54cdff6fc61543302e03e4e5f16b33f31d8ecc7',
        winnerTx: '0xed92180b65d6597b6cb6b89ea54cdff6fc61543302e03e4e5f16b33f31d8ecc7',
        winnerDomain: 'c7',
    });

    return <Box
        gap="large"
        fill={true}
        align="center"
    >
        <Box>
            <Text>From:{' '}
                <b>{dateFormat(lotteryInfo.startTime * 1000)}</b>
                {' '}to{' '}
                <b>{dateFormat(lotteryInfo.endTime * 1000)}</b>
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
                dateTime={new Date(lotteryInfo.endTime * 1000).toISOString()}
            />
        </Box>

        <Box>
            <Text><b>First tx:{' '}</b>
                <a
                    target="_blank"
                    style={{ cursor: 'pointer' }}
                    href={`https://explorer.harmony.one/tx/${lotteryInfo.firstTx}`}>
                    {truncateAddressString(lotteryInfo.firstTx)}
                </a>
            </Text>
        </Box>

        <Box>
            <Text><b>Winner tx:{' '}</b>
                ???
            </Text>
        </Box>
    </Box>
})