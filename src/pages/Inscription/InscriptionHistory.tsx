import React, { useEffect, useState } from "react";
import { Box, Text, TextArea } from "grommet";
import { observer } from "mobx-react-lite";
import { useStores } from "stores";
import Table from 'rc-table';
import axios from "axios";
import { dateTimeAgoFormat, truncateAddressString } from "utils";
import * as _ from 'lodash';

const columns = [
    {
        title: 'Date',
        dataIndex: 'timestamp',
        key: 'timestamp',
        width: 150,
        render: (value) => {
            return value ? dateTimeAgoFormat(value * 1000) : '--'
        }
    },
    {
        title: 'jsonData',
        dataIndex: 'jsonData',
        key: 'jsonData',
        width: 600,
        render: (value) => {
            return JSON.stringify(value)
        }
    },
    {
        title: 'Tx Hash',
        dataIndex: 'hash',
        key: 'hash',
        width: 100,
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
];

export const InscriptionHistory = observer((props) => {
    const [data, setData] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const fetchData = async () => {
        const res = await axios.get('https://inscription-indexer.fly.dev/inscriptions');

        let data = res.data;

        data.reverse();

        data = _.uniqBy(data, 'hash');

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
    >
        <Table
            data={data}
            columns={columns}
        />
    </Box>
})