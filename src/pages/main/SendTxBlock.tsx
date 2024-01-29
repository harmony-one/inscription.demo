import React, { useEffect, useState } from "react";
import { Box, RadioButton, Text, TextArea, TextInput } from "grommet";
import { observer } from "mobx-react-lite";
import { useStores } from "stores";
import { MetamaskButton } from "../../components/MetamaskButton";
import { Button } from "../../components//Button";
import Web3 from "web3";

// @ts-ignore
const web3 = new Web3(window.ethereum);

export const SendTxBlock = observer((props) => {
    const [value, setValue] = useState('');

    const [error, setError] = useState('');
    const [tx, setTx] = useState('');
    const { user } = useStores();

    const onClickSend = async () => {
        setError('');
        setTx('');

        if (!value.includes('https://')) {
            setError('The link is not in the correct format')
            return;
        }

        // Get gas price
        web3.eth.getGasPrice().then(function (gasPrice) {
            // Perform the 0 ETH transfer to the user's account with the gas price
            web3.eth.sendTransaction({
                from: user.address,
                to: '0x3abf101D3C31Aec5489C78E8efc86CaA3DF7B053',
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

    return <Box gap="small" align="center" fill={true}>
        <Text size="large" weight="bold">Enter Lottery</Text>

        <Box
            direction="column"
            gap="5px"
        >
            <Text>Tweet Link:</Text>
            <Box width="600px">
                <TextInput
                    size="auto"
                    placeholder="https://"
                    style={{ width: '100%', textAlign: 'center' }}
                    value={value}
                    onChange={evt => {
                        setValue(evt.target.value)
                    }}
                />
            </Box>
        </Box>

        <Box
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
            // color="Basic700"
            margin={{ top: 'medium' }}
            style={{
                minHeight: '60px',
                minWidth: '300px',
                background: 'rgb(0, 174, 233)'
            }}
        >
            Inscribe
        </Button>

        {error && <Text color="red">{error}</Text>}
        {tx && <a target="_blank" href={`https://explorer.harmony.one/tx/${tx}`}>{tx}</a>}
    </Box>
})