import faker from 'faker';
import {ContactDto} from '../dto/ContactDto';

export const genContact = (): ContactDto => {
  return {
    id: faker.random.uuid(),
    address:  faker.address.secondaryAddress(),
    birthday: faker.date.past().toDateString(),
    name: `${faker.name.firstName()} ${faker.name.lastName()}` ,
    phone: faker.phone.phoneNumber(),
    photo: ''
  }
}


