import React, { useEffect, useState } from "react";
import { Tweet } from 'react-tweet'
import { Box, RadioButton, Text, TextArea, TextInput } from "grommet";
import CountDownTimer from "@inlightmedia/react-countdown-timer";
import { dateFormat, truncateAddressString } from "utils";
import { ILotteryInfo } from "./types";

export const LotteryInfoBlock = ((
    { isLoaded, lotteryInfo }: { isLoaded: boolean, lotteryInfo?: ILotteryInfo }
) => {
    const getTweetId = (url: string) => {
        const regex = /\/status\/(\d+)/;
        const match = url.match(regex);
        return match[1];
    }

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
                lotteryInfo?.startTime * 1000 > Date.now() ?
                    <Box direction="row" gap="small" align="center">
                        <Text color="white">Time before start:</Text>
                        <CountDownTimer
                            dateTime={new Date(lotteryInfo?.startTime * 1000).toISOString()}
                        />
                    </Box> :
                    <Box direction="row" gap="small" align="center">
                        <Text color="white">Time left:</Text>
                        <CountDownTimer
                            dateTime={new Date(lotteryInfo?.endTime * 1000).toISOString()}
                        />
                    </Box> :
                <Text color="white">Finished</Text>
            }
        </Box>

        {lotteryInfo?.firstTx &&
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
        }

        <Box gap="small" align="center" className="light">
            {lotteryInfo?.winnerTx &&
                <Text><b>Closest Entry (Current Winner):{' '}</b>
                    <a
                        target="_blank"
                        style={{ cursor: 'pointer' }}
                        href={`https://explorer.harmony.one/tx/${lotteryInfo?.winnerTx}`}>
                        {truncateAddressString(lotteryInfo?.winnerTx)}
                    </a>
                </Text>
            }
            {/* <Text><b>Current Winner Domain:{' '}</b> */}
            {/* <a target="_blank" href={`https://${lotteryInfo?.winnerDomain}.country`}>{lotteryInfo?.winnerDomain}.country</a> */}
            {/* {lotteryInfo?.winnerDomain} */}
            {/* </Text> */}
            {lotteryInfo?.winnerLink &&
                <>
                    <Text><b>Current Winner Tweet</b></Text>
                    <Tweet id={getTweetId(lotteryInfo?.winnerLink)} />
                </>
            }
        </Box>
    </Box>
})