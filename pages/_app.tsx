import 'antd/dist/antd.css';
import '../styles/all.scss';

import { Fragment } from 'react';
import { AppProps, AppContext } from 'next/app';
import Head from 'next/head';
import { ConfigProvider } from 'antd';
import ptBR from 'antd/lib/locale/pt_BR';

import PageLayout from '../components/layouts/Page';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Fragment>
      <Head>
        <link rel='icon' href='/image/favicon.ico' sizes="16x16 32x32" type="image/ico" />
      </Head>
      <ConfigProvider locale={ptBR}>
        <PageLayout>
          <Component {...pageProps} />
        </PageLayout>
      </ConfigProvider>
    </Fragment>
  )
}

MyApp.getInitialProps = async ({ Component, ctx }: AppContext) => {
  const appProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
  return appProps;
}

export default MyApp;
