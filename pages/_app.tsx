import 'antd/dist/antd.css';
import '../styles/global.scss';
import '../styles/components.scss';

import { AppProps, AppContext } from 'next/app';
import { ConfigProvider } from 'antd';
import ptBR from 'antd/lib/locale/pt_BR';

import PageLayout from '../components/layouts/Page';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider locale={ptBR}>
      <PageLayout>
        <Component {...pageProps} />
      </PageLayout>
    </ConfigProvider>
  )
}

MyApp.getInitialProps = async ({ Component, ctx }: AppContext) => {
  const appProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
  return appProps;
}

export default MyApp;
