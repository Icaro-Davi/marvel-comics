import { Fragment } from 'react';
import { NextPage } from "next";

import Comics from '../components/Comics';

const Main: NextPage  = props => {
    return (
        <Fragment>
            <Comics />
        </Fragment>
    )
}

export default Main;
