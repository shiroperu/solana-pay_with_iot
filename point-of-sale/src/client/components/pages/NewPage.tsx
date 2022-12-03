import { NextPage } from 'next';
import React, {useEffect} from 'react';
import { useMediaQuery } from 'react-responsive';
import { FullscreenButton } from '../buttons/FullscreenButton';
import { GenerateButton } from '../buttons/GenerateButton';
import { TransactionsLink } from '../buttons/TransactionsLink';
import { NumPad } from '../sections/NumPad';
import { PoweredBy } from '../sections/PoweredBy';
import { Summary } from '../sections/Summary';
import css from './NewPage.module.css';
import {usePayment} from "../../hooks/usePayment";
import BigNumber from "bignumber.js";

const NewPage: NextPage = () => {
    const phone = useMediaQuery({ query: '(max-width: 767px)' });

    const { setAmount, generate } = usePayment();
    useEffect(() => {
        setAmount(new BigNumber(0.01));
        generate()
    }, [setAmount]);


    return phone ? (
        <div className={css.root}>
            <div className={css.top}>
                <FullscreenButton />
                <TransactionsLink />
            </div>
            <div className={css.body}>
                <GenerateButton />
            </div>
            <PoweredBy />
        </div>
    ) : (
        <div className={css.root}>
            <div className={css.main}>
                <div className={css.top}>
                    <FullscreenButton />
                </div>
                <div className={css.body}>
                    <NumPad />
                </div>
                <PoweredBy />
            </div>
            <div className={css.side}>
                <div className={css.bottom}>
                    <TransactionsLink />
                </div>
            </div>
        </div>
    );
};

export default NewPage;

export function getServerSideProps() {
    // Required so getInitialProps re-runs on the server-side
    // If it runs on client-side then there's no req and the URL reading doesn't work
    // See https://nextjs.org/docs/api-reference/data-fetching/get-initial-props
    return {
        props: {},
    };
}
