import { useApiRequest } from "@/hooks/useRequest";
import { AxiosInstance } from "axios";
import { NextPageContext } from "next";
import Router from "next/router";
import { Button, Container } from "react-bootstrap";

const TicketItemPage = ({ ticket }: any) => {
  const { request, errors } = useApiRequest();

  return (
    <Container>
      <h1>{ticket.title}</h1>
      <h5>Price: {ticket.price}</h5>
      <h5>Status: { ticket.orderId ? 'Ordered' : 'Available' }</h5>
      { errors }
      <Button onClick={async () => {
        const res = await request({
          path: '/orders',
          method: 'post',
          data: {
            ticketId: ticket.id,
          },
        });

        if (!res?.data) return;

        Router.push('/orders/[orderId]', `/orders/${res.data.id}`);
      }}>Purchase</Button>
    </Container>
  );
}

TicketItemPage.getInitialProps = async (context: NextPageContext, client: AxiosInstance) => {
  const { ticketId } = context.query;
  const { data } = await client.get(`/api/tickets/${ticketId}`);

  return {
    ticket: data,
  }
};
 
export default TicketItemPage;