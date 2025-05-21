import PaymentForm from "@/components/paymentForm";
import config from "@/config";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";
import { AxiosInstance } from "axios";
import { NextPageContext } from "next";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";

const OrderPage = ({ order, ticket }: any) => {
  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {
    const timeId = setInterval(() => {
      const timeLeft = new Date(order.expiresAt as string).getTime() - new Date().getTime();
      setTimeLeft(Math.round(timeLeft/1000));
    }, 1000);

    return () => clearInterval(timeId);
  }, [order]);

  const stripePromise = loadStripe(config.STRIPE_PUBLIC);
  
  const options: StripeElementsOptions = {
    mode: 'payment',
    amount: ticket.price*100,
    currency: 'usd',
    payment_method_types: ['card'],
  };

  return (
    <Container>
      { timeLeft > 0 ? `${timeLeft} sec left` : 'Order expired' }
      <Elements stripe={stripePromise} options={options}>
        <PaymentForm order={order} price={ticket.price}/>
      </Elements>
    </Container>
  );
}

OrderPage.getInitialProps = async (context: NextPageContext, client: AxiosInstance, currentUser: any) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);
  
  return {
    order: data.order,
    ticket: data.ticket,
  };
}
 
export default OrderPage;