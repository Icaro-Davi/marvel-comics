import { Fragment } from 'react';
import { NextPage } from "next";
import Head from 'next/head';

import Comics from '../components/Comics';

const Main: NextPage  = props => {
    return (
        <Fragment>
            <Head>
                <title>Marvel Comics</title>
            </Head>
            <Comics />
        </Fragment>
    )
}

export default Main;
