import useForm from '../lib/useForm';
import FormStyles from './styles/Form';

export default function CreateProduct() {
  const { inputs, handleChange, resetForm, clearForm } = useForm({
    name: '',
    price: 0,
    description: '',
  });

  return (
    <FormStyles>
      <fieldset>
        <label htmlFor='image'>
          Image
          <input
            type='file'
            id='image'
            name='image'
            onChange={handleChange}
          />
        </label>
        <label htmlFor='name'>
          Name
          <input
            type='text'
            id='name'
            name='name'
            placeholder='Name'
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor='price'>
          Price
          <input
            type='number'
            id='price'
            name='price'
            placeholder='Price'
            value={inputs.price}
            onChange={handleChange}
          />
        </label>
        <button type='submit'>+ Add Product</button>
      </fieldset>
    </FormStyles>
  );
}
