import RequestReset from '../components/RequestReset';
import Reset from '../components/Reset';

export default function ResetPage({ query }) {
  if (!query?.token) {
    return (
      <>
        <p>Sorry, you must supply a token.</p>
        <RequestReset />
      </>
    );
  }
  console.log(query);

  return (
    <div>
      <Reset token={query.token} />
    </div>
  );
}
