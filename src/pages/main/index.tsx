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
            <Text size="xlarge" weight="bold">Quest</Text>
            <Text size="medium" style={{ maxWidth: '100%' }}>
                Inscribe your favorite tweet. In 24 hours, the transaction hash with the closest last 2 digits to the Origin Inscription's last 2 digits (in HEX) will become the winner. Prize soon to be announced!
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