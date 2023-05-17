import faker from 'faker';
import {GroupContactsDto} from '../dto/GroupContactsDto';
import {ContactDto} from '../dto/ContactDto';

const max = 20;

export const genGroupContacts = (contacts: ContactDto[]): GroupContactsDto => {
  const length = contacts.length > max ? max : contacts.length;

  const count = faker.random.number({min: 1, max: max, precision: 1});

  const startPos = faker.random.number({min: 1, max: length - count, precision: 1});


  const contactIds = contacts.slice(startPos, startPos + count).map(({id}) => id);

  return {
    id: faker.random.uuid(),
    name: faker.lorem.slug(3),
    description: faker.lorem.paragraph(1),
    photo: '',
    contactIds
  }
}


