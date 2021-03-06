import validate from './validate';

const fullName = {
  type: 'text',
  name: 'fullname',
  label: 'Namn',
  validate: validate.string,
  required: true,
};
const displayName = {
  type: 'text',
  name: 'displayName',
  label: 'Användarnamn',
  validate: validate.string,
  required: true,
};
const email = {
  type: 'email',
  name: 'email',
  label: 'Email',
  validate: validate.email,
  required: true,
};
const password = {
  type: 'password',
  name: 'password',
  label: 'Lösenord',
  validate: validate.password,
  required: true,
};
const street = {
  type: 'text',
  name: 'street',
  label: 'Gatuadress',
  validate: validate.string,
  required: true,
};
const postalCode = {
  type: 'text',
  name: 'postalCode',
  label: 'Postnummer',
  validate: validate.postal,
  required: true,
};
const city = {
  type: 'text',
  name: 'city',
  label: 'Postort',
  validate: validate.string,
  required: true,
};
const country = {
  type: 'text',
  name: 'country',
  label: 'Land',
  validate: validate.string,
  required: true,
};
const title = {
  type: 'text',
  name: 'title',
  label: 'Title',
  validate: validate.string,
  required: true,
};
const description = {
  type: 'multiline',
  name: 'description',
  label: 'Beskrivning',
  validate: validate.string,
  required: true,
};
const price = {
  type: 'number',
  name: 'price',
  label: 'Pris (kr)',
  validate: validate.number,
  required: true,
};
const brand = {
  type: 'text',
  name: 'brand',
  label: 'Tillverkare',
  validate: validate.string,
  required: true,
};
const categories = {
  type: 'select',
  name: 'category',
  label: 'Kategori',
};
const weight = {
  type: 'number',
  name: 'weight',
  label: 'Vikt (kg)',
  validate: validate.number,
};
const photo = {
  type: 'text',
  name: 'photo',
  label: 'Foto (url)',
  validate: validate.string,
};
const thumbnail = {
  type: 'text',
  name: 'thumbnail',
  label: 'Thumbnail',
  validate: validate.string,
};

const user = {
  fullName, displayName, email, password,
};
export default user;

export const category = { title, thumbnail, description };
export const login = { email, password };
export const address = {
  street, postalCode, city, country,
};
export const product = {
  title,
  description,
  price,
  brand,
  categories,
  weight,
  photo,
};
