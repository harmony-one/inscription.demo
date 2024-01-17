import React, { useState } from "react";
import { Box, Text, TextArea } from "grommet";
import { observer } from "mobx-react-lite";
import { useStores } from "stores";
import { MetamaskButton } from "../../components/MetamaskButton";
import { Button } from "../../components//Button";
import Web3 from "web3";

// @ts-ignore
const web3 = new Web3(window.ethereum);

export const InscriptionText = observer((props) => {
    const [value, setValue] = useState('');
    const [error, setError] = useState('');
    const [tx, setTx] = useState('');
    const { user } = useStores();

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
                data: web3.utils.toHex(value),
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

    return <Box pad="large" gap="20px">
        {/* <Text size="24px" weight="bold" textAlign="center">
            Send
        </Text> */}

        <Box
            fill={true}
            direction="column"
            gap="5px"
        >
            <Text>Data:</Text>

            <Box width="600px">
                <TextArea
                    size="auto"
                    placeholder="data:"
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
            <Text>Hex:</Text>

            <Box width="600px">
                <TextArea
                    size="auto"
                    disabled={true}
                    placeholder="data:"
                    style={{ width: '100%', textAlign: 'center' }}
                    value={web3.utils.toHex(value)}
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