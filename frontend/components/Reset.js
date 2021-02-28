import FormStyles from './styles/Form';
import useForm from '../lib/useForm';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import DisplayError from './ErrorMessage';
import { CURRENT_USER_QUERY } from './User';

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $email: String!
    $password: String!
    $token: String!
  ) {
    redeemUserPasswordResetToken(
      email: $email
      password: $password
      token: $token
    ) {
      code
      message
    }
  }
`;

export default function Reset({ token }) {
  const { inputs, handleChange, resetForm, clearForm } = useForm({
    email: '',
    password: '',
    token,
  });

  const [resetPassword, { data, loading, error }] = useMutation(
    RESET_MUTATION,
    {
      variables: inputs,
    }
  );

  const caughtError = data?.redeemUserPasswordResetToken?.code
    ? data?.redeemUserPasswordResetToken
    : undefined;

  const handleSubmit = async e => {
    e.preventDefault();
    // send email and password to graphQL API
    await resetPassword().catch(console.error);
    resetForm();
  };

  console.log({ loading, data, error });

  if (loading) return 'Loading...';

  return (
    <FormStyles method='POST' onSubmit={handleSubmit}>
      <h2>Reset Your Password</h2>
      <DisplayError error={error || caughtError} />
      <fieldset>
        {data?.redeemUserPasswordResetToken === null && (
          <p>Success! You have updated you password.</p>
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
        <label htmlFor='password'>
          Password
          <input
            type='password'
            name='password'
            placeholder='Password'
            autoComplete='password'
            value={inputs.password}
            onChange={handleChange}
          />
        </label>
        <button type='submit'>Request Reset</button>
      </fieldset>
    </FormStyles>
  );
}
