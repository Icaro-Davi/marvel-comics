import { Fragment } from "react";
import { NextPage } from "next"
import Head from 'next/head';

import ErrorComponent from '../components/Error';

interface ErrorProps {
    statusCode: number;
}

interface PageProps {
    statusCode: number | undefined;
}

const Error: NextPage<ErrorProps, PageProps> = ({ statusCode }) => {
    return (
        <Fragment>
            <Head>
                <title>Salve o Tony</title>
            </Head>
            <ErrorComponent />
        </Fragment>
    )
}

Error.getInitialProps = ({ req, res, ...ctx }) => {
    const statusCode = res ? res.statusCode : ctx.err ? ctx.err.statusCode : 404;
    return { statusCode }
}

export default Error;