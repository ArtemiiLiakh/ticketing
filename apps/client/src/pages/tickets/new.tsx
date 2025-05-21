import { useApiRequest } from "@/hooks/useRequest";
import Router from "next/router";
import { FormEvent, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";

const NewTicketPage = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState(0);
  const { request, errors } = useApiRequest();

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await request({
      path: '/tickets',
      method: 'post',
      data: {
        title,
        price,
      },
    });

    Router.push('/tickets');
  };

  return <Container>
    <h1>Create a ticket</h1>
    <Form onSubmit={onSubmit}>
      <Form.Group>
        <Form.Label>Title</Form.Label>
        <Form.Control value={title} onChange={(e) => {
          setTitle(e.target.value);
        }}/>
      </Form.Group>
      <Form.Group>
        <Form.Label>Price</Form.Label>
        <Form.Control type="number" value={price} onChange={(e) => {
          const roundedPrice = parseFloat(e.target.value).toFixed(2);
          let price = parseFloat(roundedPrice);
          price = price < 0 ? 0 : price;
          setPrice(price);
        }}/>
      </Form.Group>
      {errors}
      <Button type="submit">Submit</Button>
    </Form>
  </Container>
}

export default NewTicketPage;