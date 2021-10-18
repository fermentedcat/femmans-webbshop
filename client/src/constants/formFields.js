import validate from './validate'

const fullName = {
        type: 'text',
        name: 'fullname',
        label: 'Namn',
        validate: validate.string,
        required: true
      },
      displayName = {
        type: 'text',
        name: 'displayName',
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

const title = {
  type: 'text',
  name: 'city',
  validate: validate.string,
  required: true
},
thumbnail = {
  type: 'text',
  name: 'thumbnail',
  validate: validate.string
}, 
description = {
  type: 'text',
  name: 'description',
  validate: validate.string
}

const user =  { fullName, displayName, email, password };
export default user;

export const category = {title, thumbnail, description}
export const login =  { email, password };
export const address =  { street, postalCode, city, country };




