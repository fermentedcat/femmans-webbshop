import validate from './validate'

const fullName = {
        type: 'text',
        name: 'fullname',
        label: 'Namn',
        validate: validate.string,
        required: true
      },
      username = {
        type: 'text',
        name: 'username',
        label: 'Användarnamn',
        validate: validate.string,
        required: true
      },
      email = {
        type: 'email',
        name: 'email',
        label: 'Email',
        validate: validate.email,
        required: true
      },
      password = {
        type: 'password',
        name: 'password',
        label: 'Lösenord',
        validate: validate.password,
        required: true
      },
      street = {
        type: 'text',
        name: 'street',
        label: 'Gatuadress',
        validate: validate.string,
        required: true
      },
      postalCode = {
        type: 'text',
        name: 'postalCode',
        label: 'Postnummer',
        validate: validate.postal,
        required: true
      },
      city = {
        type: 'text',
        name: 'city',
        label: 'Postort',
        validate: validate.string,
        required: true
      },
      country = {
        type: 'text',
        name: 'country',
        label: 'Land',
        validate: validate.string,
        required: true
      }

const register =  { fullName, username, email, password };
export default register;

export const login =  { email, password };
export const address =  { street, postalCode, city, country };




