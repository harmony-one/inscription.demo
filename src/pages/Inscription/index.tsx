import React, { useState } from "react";
import { Box, Text, TextArea } from "grommet";
import { observer } from "mobx-react-lite";
import { useStores } from "stores";
import { MetamaskButton } from "../../components/MetamaskButton";
import { Button } from "../../components//Button";
import Web3 from "web3";
import { InscriptionText } from "./InscriptionText";
import { InscriptionHrc20 } from "./InscriptionHRC20";
import { InscriptionHistory } from "./InscriptionHistory";
import { InscriptionOneCountry } from "./InscriptionOneCountry";

enum INS_TABS {
    COUNTRY = 'OneCountry',
    HRC20 = 'OneScription',
    TEXT = 'Text',
    HISTORY = 'History',
}

const TabButton = ({ children, active, onClick }) => {
    console.log(active)

    return <Button
        size="auto"
        transparent
        onClick={onClick}
        style={{
            background: active ? "rgb(56, 179, 255)" : "white",
            color: active ? "white" : "black",
        }}
    >
        {children}
    </Button>
}

export const Inscription = observer((props) => {
    const [tab, setTab] = useState<INS_TABS>(INS_TABS.COUNTRY);

    return <Box gap="60px" pad="large" align="start" justify="start">
        <Box direction="row" gap="20px">
            <TabButton
                onClick={() => setTab(INS_TABS.COUNTRY)}
                active={tab === INS_TABS.COUNTRY}
            >
                {INS_TABS.COUNTRY}
            </TabButton>

            <TabButton
                onClick={() => setTab(INS_TABS.HRC20)}
                active={tab === INS_TABS.HRC20}
            >
                {INS_TABS.HRC20}
            </TabButton>

            <TabButton
                onClick={() => setTab(INS_TABS.TEXT)}
                active={tab === INS_TABS.TEXT}
            >
                {INS_TABS.TEXT}
            </TabButton>

            <TabButton
                onClick={() => setTab(INS_TABS.HISTORY)}
                active={tab === INS_TABS.HISTORY}
            >
                {/* {INS_TABS.HISTORY} */}
                Indexer
            </TabButton>
        </Box>

        <Box
            gap="20px"
            fill={true}
            style={{
                minWidth: 800,
                minHeight: 400,
            }}
        >
            {tab === INS_TABS.HRC20 && <InscriptionHrc20 />}
            {tab === INS_TABS.TEXT && <InscriptionText />}
            {tab === INS_TABS.HISTORY && <InscriptionHistory />}
            {tab === INS_TABS.COUNTRY && <InscriptionOneCountry />}
        </Box>
    </Box>
})