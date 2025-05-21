import 'bootstrap/dist/css/bootstrap.css'
import '@/components/styles/header.css';
import { AppContext, AppProps } from 'next/app';
import clientBuilder from '@/api/clientBuilder';
import Header from '@/components/header';
import { Container } from 'react-bootstrap';

import './styles/login.css';

interface ClientAppProps extends AppProps {
  user: any;
}

const App = ({ Component, pageProps, user }: ClientAppProps) => {
  return <div>
    <Header user={user}/>
    <Container>
      <Component {...pageProps} />
    </Container>
  </div>
}

App.getInitialProps = async (context: AppContext) => {
  const client = clientBuilder(context.ctx);
  const { data } = await client.get('/api/auth/me').catch(() => ({ data: null }));

  const pageProps = await (context.Component.getInitialProps as any)?.(context.ctx, client, data);
  
  return {
    user: data,
    pageProps: {
      ...pageProps,
      user: data,
    },
  };
}

export default App;