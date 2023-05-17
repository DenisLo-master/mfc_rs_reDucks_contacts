import * as fs from 'fs';
import {genContact, genFull} from './generators';
import path from 'path';
import {ContactDto} from './dto/ContactDto';
import {GroupContactsDto} from './dto/GroupContactsDto';
import {genGroupContacts} from './generators/genGroupContacts';

const pathToData: string = '../../src/__data__';

(async () => {

  const contactValues = await genFull(genContact, 20);
  const contacts: ContactDto[] = contactValues.filter(({status}) => (
    status === 'fulfilled'
    // @ts-ignore
  )).map(({value}) => value);


  const groupContactsValues = await genFull(() => genGroupContacts(contacts), 20);

  const groupContacts: GroupContactsDto[] = groupContactsValues.filter(({status}) => (
    status === 'fulfilled'
    // @ts-ignore
  )).map(({value}) => value);

  fs.writeFileSync(
    path.join(__dirname, pathToData, "contacts.json"),
    JSON.stringify(contacts)
  );

  fs.writeFileSync(
    path.join(__dirname, pathToData, "group-contacts.json"),
    JSON.stringify(groupContacts)
  );
})();
