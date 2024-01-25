import React, { useEffect, useState } from "react";
import { Box, Text, TextArea } from "grommet";
import { observer } from "mobx-react-lite";
import { useStores } from "stores";
import Table from 'rc-table';
import axios from "axios";
import { dateTimeAgoFormat, truncateAddressString } from "utils";
import * as _ from 'lodash';

const columns: any = [
    {
        title: 'Date',
        dataIndex: 'timestamp',
        align: 'start',
        key: 'timestamp',
        width: 150,
        render: (value) => {
            return value ? dateTimeAgoFormat(value * 1000) : '--'
        }
    },
    {
        title: 'Address',
        dataIndex: 'from',
        align: 'end',
        key: 'from',
        width: 150,
        render: (value) => {
            return <Box margin={{ vertical: 'medium' }}>
                <a
                    // className={styles.addressLink}
                    href={`https://explorer.harmony.one/address/${value}`}
                    target="_blank"
                >
                    {truncateAddressString(value, 5)}
                </a>
            </Box>
        }
    },
    {
        title: 'Tx Hash',
        dataIndex: 'transactionHash',
        key: 'transactionHash',
        align: 'end',
        width: 150,
        render: (value) => {
            return <Box margin={{ vertical: 'medium' }}>
                <a
                    // className={styles.addressLink}
                    href={`https://explorer.harmony.one/tx/${value}`}
                    target="_blank"
                >
                    {truncateAddressString(value, 5)}
                </a>
            </Box>
        }
    },
    {
        title: 'Tweet',
        dataIndex: 'payload',
        key: 'payload',
        align: 'end',
        width: 100,
        render: (payload) => {
            return <Box margin={{ vertical: 'medium' }}>
                <a
                    href={payload.value}
                    target="_blank"
                >
                    link
                </a>
            </Box>
        }
    },
    {
        title: 'Domain',
        dataIndex: 'transactionHash',
        key: 'transactionHash',
        align: 'end',
        width: 100,
        render: (transactionHash) => {
            return <a
                href={`https://${transactionHash.slice(-2)}.country`}
                target="_blank"
            >
                {transactionHash.slice(-2)}
            </a>
        }
    },
];

export const InscriptionHistory = observer((props) => {
    const [data, setData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const fetchData = async () => {
        const res = await axios.get('https://inscription-indexer.fly.dev/inscriptions', {
            params: {
                limit: 100,
                to: '0x3abf101D3C31Aec5489C78E8efc86CaA3DF7B053',
                timestampFrom: 1706126400,
                timestampTo: 1706126400 + 24 * 3600
            }
        });

        let data = res.data.filter(
            d => ['x.com', 'twitter.com'].some(sub => d.payload?.value?.includes(sub))
        );

        data = _.uniqBy(data, 'transactionHash');

        setData(data);
    }

    useEffect(() => {
        fetchData().then(() => setIsLoaded(true));

        const intervalId = setInterval(() => fetchData(), 5000);

        return () => clearInterval(intervalId);
    }, [])

    if (!isLoaded) {
        return <Box>
            Loading...
        </Box>
    }

    return <Box
        style={{
            overflow: 'scroll'
        }}
        pad={{ horizontal: 'medium' }}
        gap="xlarge"
        align="center"
    >
        <Text size="large" weight="bold">Valid Entry Inscriptions</Text>
        <Table
            data={data}
            columns={columns}
        />
    </Box>
})