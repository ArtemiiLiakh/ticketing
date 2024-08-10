import { AxiosInstance } from 'axios';
import { NextPageContext } from 'next';

const Home = ({ user }: any) => {
  return (
    <div>
      <h1>Home</h1>
      <p>Welcome to the home page</p>  
      <p>{user ? 'You are logged in' : 'Unauthorized'}</p>
      <p>{user?.email}</p>
    </div>
  );
}

Home.getInitialProps = async (context: NextPageContext, client: AxiosInstance, user: any) => {
  console.log('Home page getInitialProps');
  console.log('the user is', user);
  return {};
}

export default Home;