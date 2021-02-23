import FormStyles from './styles/Form';
import useForm from '../lib/useForm';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import DisplayError from './ErrorMessage';
import { CURRENT_USER_QUERY } from './User';

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    sendUserPasswordResetLink(email: $email) {
      code
      message
    }
  }
`;

export default function RequestReset() {
  const { inputs, handleChange, resetForm, clearForm } = useForm({
    email: '',
  });

  const [signup, { data, loading, error }] = useMutation(
    REQUEST_RESET_MUTATION,
    {
      variables: inputs,
      // refetchQueries: [{ query: CURRENT_USER_QUERY }],
    }
  );

  const handleSubmit = async e => {
    e.preventDefault();
    // send email and password to graphQL API
    await signup().catch(console.error);
    resetForm();
  };

  console.log({ loading, data, error });

  if (loading) return 'Loading...';

  return (
    <FormStyles method='POST' onSubmit={handleSubmit}>
      <h2>Request a Password Reset</h2>
      <DisplayError error={error} />
      <fieldset>
        {data?.sendUserPasswordResetLink === null && (
          <p>Success! Check your email for a link.</p>
        )}
        <label htmlFor='email'>
          Email
          <input
            type='email'
            name='email'
            placeholder='Your Email Address'
            autoComplete='email'
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
        <button type='submit'>Request Reset</button>
      </fieldset>
    </FormStyles>
  );
}
