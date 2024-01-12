import React, { useEffect, useState } from "react";
import { Box, RadioButton, Text, TextArea, TextInput } from "grommet";
import { observer } from "mobx-react-lite";
import { useStores } from "stores";
import { MetamaskButton } from "../../components/MetamaskButton";
import { Button } from "../../components//Button";
import Web3 from "web3";

enum INS_TABS {
    DEPLOY = 'OneScription-Deploy',
    MINT = 'OneScription-Mint',
    TRANSFER = 'OneScription-Transfer',
}

// @ts-ignore
const web3 = new Web3(window.ethereum);

export const InscriptionHrc20 = observer((props) => {
    const [value, setValue] = useState('');
    const [value2, setValue2] = useState('');
    const [value3, setValue3] = useState('');

    const [type, setType] = useState(INS_TABS.DEPLOY);

    const [jsonData, setJsonData] = useState();

    const [error, setError] = useState('');
    const [tx, setTx] = useState('');
    const { user } = useStores();

    useEffect(() => {
        let jsonData;

        switch (type) {
            case INS_TABS.DEPLOY:
                jsonData = {
                    "p": "hrc-20",
                    "op": "deploy",
                    "tick": value,
                    "max": value2,
                    "lim": value3
                }
                break;
        }

        setJsonData(jsonData)
    }, [value, value2, value3, type])

    const onClickSend = async () => {
        setError('');
        setTx('');

        // Get gas price
        web3.eth.getGasPrice().then(function (gasPrice) {
            // Perform the 0 ETH transfer to the user's account with the gas price
            web3.eth.sendTransaction({
                from: user.address,
                to: user.address,
                value: '0',
                data: web3.utils.toHex(jsonData),
                gasPrice: gasPrice
            }, function (error, transactionHash) {
                if (!error) {
                    console.log('Transaction successful:', transactionHash);
                    setTx(transactionHash)
                } else {
                    console.log('Transaction error:', error);
                    setError(error?.message)
                }
            });
        }).catch(function (error) {
            console.log('Error getting gas price:', error);
            setError(error?.message)
        });
    }

    if (!user.address) {
        return <Box
            pad="large"
            align="center"
            justify="center"
            gap="30px"
            height="300px"
        >
            <MetamaskButton
                active={true}
                onClick={() => user.signIn()}
            />

            <Text size="18px" weight="bold" textAlign="center">
                Connect your MetaMask wallet to continue
            </Text>
        </Box>
    }

    return <Box gap="20px">
        {/* <Box>
            <RadioButton
                name="radio"
                checked={true}
                label="chosen"
                onChange={(event) => { }}
            />
        </Box> */}

        <Box
            fill={true}
            direction="column"
            gap="5px"
        >
            <Text>Tick:</Text>
            <Box width="600px">
                <TextInput
                    size="auto"
                    placeholder=""
                    style={{ width: '100%', textAlign: 'center' }}
                    value={value}
                    onChange={evt => {
                        setValue(evt.target.value)
                    }}
                />
            </Box>
        </Box>

        <Box
            fill={true}
            direction="column"
            gap="5px"
        >
            <Text>Max Supply:</Text>
            <Box width="600px">
                <TextInput
                    size="auto"
                    placeholder="0"
                    style={{ width: '100%', textAlign: 'center' }}
                    value={value2}
                    onChange={evt => {
                        setValue2(evt.target.value)
                    }}
                />
            </Box>
        </Box>

        <Box
            fill={true}
            direction="column"
            gap="5px"
        >
            <Text>Limit per Mint:</Text>
            <Box width="600px">
                <TextInput
                    size="auto"
                    placeholder="0"
                    style={{ width: '100%', textAlign: 'center' }}
                    value={value3}
                    onChange={evt => {
                        setValue3(evt.target.value)
                    }}
                />
            </Box>
        </Box>

        <Box
            fill={true}
            direction="column"
            gap="5px"
        >
            <Text>JSON:</Text>

            <Box width="600px">
                <TextArea
                    size="auto"
                    disabled={true}
                    placeholder="data:"
                    style={{ width: '100%', textAlign: 'center' }}
                    value={JSON.stringify(jsonData)}
                />
            </Box>
        </Box>

        <Box
            fill={true}
            direction="column"
            gap="5px"
        >
            <Text>Hex:</Text>

            <Box width="600px">
                <TextArea
                    size="auto"
                    disabled={true}
                    placeholder="data:"
                    style={{ width: '100%', textAlign: 'center' }}
                    value={web3.utils.toHex(jsonData)}
                />
            </Box>
        </Box>

        <Button
            size="auto"
            transparent
            onClick={() => onClickSend()}
            color="Basic700"
        >
            Send
        </Button>

        {error && <Text color="red">{error}</Text>}
        {tx && <a target="_blank" href={`https://explorer.harmony.one/tx/${tx}`}>{tx}</a>}
    </Box>
})