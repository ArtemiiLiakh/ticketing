import { useApiRequest } from "@/hooks/useRequest";
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import Router from 'next/router';
import { FormEvent, useState } from "react";
import { Button, Form } from "react-bootstrap";

interface PaymentFormProps {
  order: any,
  price: number
}

const PaymentForm = ({ order, price }: PaymentFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const { request, errors } = useApiRequest();
  const [errorMessage, setErrorMessage] = useState<string>();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (elements === null) {
      return;
    }

    const { error: submitError } = await elements.submit();    
    if (submitError) {
      setErrorMessage(submitError.message);
      return;
    }

    const res = await request({
      path: '/payments',
      method: 'post',
      data: {
        orderId: order.id,
        payment_method_types: ['card']
      }
    });

    if (!res?.data?.client_secret) return;

    const { error } = await stripe!.confirmPayment({
      clientSecret: res.data.client_secret,
      elements,
      redirect: 'if_required',
      confirmParams: {
        receipt_email: 'asuskonotopo@gmail.com',
      },
    });

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    await request({
      path: '/payments/complete',
      method: 'patch',
      data: {
        orderId: order.id,
      },
    });

    Router.push('/');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <PaymentElement/>
      <div>{ errorMessage ?? errors}</div>
      <Button type="submit" disabled={!stripe || !elements}>Pay {price}$</Button>
    </Form>
  );
}
 
export default PaymentForm;