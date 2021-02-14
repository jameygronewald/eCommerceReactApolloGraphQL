import FormStyles from './styles/Form';
import useForm from '../lib/useForm';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import DisplayError from './ErrorMessage';
import Router from 'next/router';

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        sessionToken
        item {
          id
          email
        }
      }
    }
  }
`;

export default function SignIn() {
  const { inputs, handleChange, resetForm, clearForm } = useForm({
    email: '',
    password: '',
  });

  const [signin, { error, loading, data }] = useMutation(SIGNIN_MUTATION, {
    variables: inputs,
  });

  const handleSubmit = async e => {
    e.preventDefault();
    // send email and password to graphQL API
    const res = await signin();
    console.log(res);
    clearForm();
    Router.push({
      pathname: `/products`,
    });
  };

  console.log({ error, loading, data });

  if (loading) return 'Loading...';

  if (error) return <DisplayError error={error}></DisplayError>;

  return (
    <FormStyles method='POST' onSubmit={handleSubmit}>
      <h2>Sign In to Your Account</h2>
      <fieldset>
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
        <button type='submit'>Sign In</button>
      </fieldset>
    </FormStyles>
  );
}
