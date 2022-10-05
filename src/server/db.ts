import { faker } from '@faker-js/faker';
import { User } from '../features/user/types';
import { Contact } from '../features/contact/types';

interface DbObject {
    users: User[];
    contacts: Contact[];
    maxid: {[key: string]: number};
}

function createDb(totalContacts: number) {
    let db: DbObject = {
        users: [
            { login: "user1", password: "pswd1"},
            { login: "user2", password: "pswd2"}
        ],
        contacts: [],
        maxid: {},
    };
    let id = 0;
    for (const user of db.users) {
        for (let i=0; i<totalContacts; i++) {
            const sex = faker.name.sexType();
            const firstName = faker.name.firstName(sex);
            const lastName = faker.name.lastName(sex);
            const email = faker.internet.email(firstName, lastName);
            const phone = faker.phone.number('###-###-####');
            const contact = {
                id: ++id, 
                login: user.login,
                name: firstName + " " + lastName,
                phone,
                email, 
            };
            db.contacts.push(contact);
        }
    }
    db.maxid.contact = id;
    return db;
}

export const db = createDb(5);