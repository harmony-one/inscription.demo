import React, { useEffect, useState } from "react";
import { Box, RadioButton, Text, TextArea, TextInput } from "grommet";
import { SendTxBlock } from "./SendTxBlock";
import { LotteryInfoBlock } from "./LotteryInfoBlock";
import { InscriptionHistory } from "./InscriptionHistory";

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
    return <Box gap="large" fill={true} align="center">
        <Box gap="medium" align="center" fill={true}>
            <Text size="xlarge" weight="bold">Quest Lottery</Text>
            <Text size="medium" style={{ maxWidth: '100%' }}>
                Send an inscription transaction with your favorite tweet to the lottery address 0x3abf101D3C31Aec5489C78E8efc86CaA3DF7B053. A daily winner gets 1000 ONE tokens and 100 HOG tokens as of Jan 18th, 2024.
            </Text>
        </Box>

        <Plane background="#f2f3f7">
            <LotteryInfoBlock />
        </Plane>

        <Plane borderOpacity="0.1">
            <SendTxBlock />
        </Plane>

        <Plane background="#f2f3f7">
            <InscriptionHistory />
        </Plane>
    </Box>
})