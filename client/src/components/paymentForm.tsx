import { useRequest } from "@/hooks/useRequest";
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { FormEvent, useState } from "react";
import { Button, Form } from "react-bootstrap";

interface PaymentFormProps {
  order: any,
}

const PaymentForm = ({ order }: PaymentFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const { request, errors } = useRequest();
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
      url: '/payments',
      method: 'post',
      data: {
        orderId: order._id,
        payment_method_types: ['card']
      }
    });

    if (!res?.data?.client_secret) return;

    const { error } = await stripe!.confirmPayment({
      clientSecret: res.data.client_secret,
      elements,
      confirmParams: {
        return_url: 'http://local.test.com:3000',
        receipt_email: 'asuskonotopo@gmail.com',
      },
    });
    if (error) {
      setErrorMessage(error.message);
      return;
    }

    await request({
      url: '/payments/complete',
      method: 'patch',
      data: {
        orderId: order._id,
        paymentId: res.data.paymentId,
      },
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <PaymentElement/>
      <div>{ errorMessage ?? errors}</div>
      <Button type="submit" disabled={!stripe || !elements}>Pay {order.ticket.price}$</Button>
    </Form>
  );
}
 
export default PaymentForm;