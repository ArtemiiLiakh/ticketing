import { AxiosInstance } from "axios";
import { NextPageContext } from "next";
import Link from "next/link";

const TicketsListPage = ({ tickets, user }: { tickets: any[], user: any }) => {
  const renderedTicketList = tickets.map((ticket) => {
    return <tr key={ticket.id}>
      <td>{ticket.title}</td>
      <td>{ticket.price}</td>
      <td>{ticket.createdAt}</td>
      <td>
        <Link href='/tickets/[ticketId]' as={`/tickets/${ticket.id}`}>View</Link>
      </td>
    </tr>
  });

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Price</th>
          <th>Created at</th>
          <th>Link</th>
        </tr>
      </thead>
      <tbody>
        { renderedTicketList }
      </tbody>
    </table>
  );
}

TicketsListPage.getInitialProps = async (context: NextPageContext, client: AxiosInstance, user: any) => {
  const { data } = await client.get('/api/tickets');
  return {
    tickets: data.data,
  };
}
 
export default TicketsListPage;