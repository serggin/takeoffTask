import { User } from '../features/user/types';
import { Contact } from '../features/contact/types';


function getData(query: string): Promise<any[]> {
    const url = process.env.REACT_APP_DB_URL || '';
    if (!url) {
        throw new Error('Missing REACT_APP_DB_URL env variable');
    }
    return fetch(url + query)
        .then((response: Response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
        });
}

function postData(query: string, method: "POST" | "PUT" | "PATCH", data: object): Promise<any> {
    const url = process.env.REACT_APP_DB_URL || '';
    if (!url) {
        throw new Error('Missing REACT_APP_DB_URL env variable');
    }
    const request = new Request(url + query, {
        method,
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data),
    });

    return fetch(request)
        .then((response: Response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response.json();
        });
}

function deleteData(query: string): Promise<Response> {
    const url = process.env.REACT_APP_DB_URL || '';
    if (!url) {
        throw new Error('Missing REACT_APP_DB_URL env variable');
    }
    const request = new Request(url + query, {
        method: "DELETE",
    });
    return fetch(request)
        .then((response: Response) => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return response;
        })
}

export function getUser(login: string): Promise<User | null> {
    const query = `users?login=${login}`;
    return getData(query)
        .then(data => {
            return (data.length ? data[0] as User : null)
        });
}

export function getContacts(login: string): Promise<Contact[]> {
    const query = `contacts?login=${login}`;
    return getData(query)
    .then(data => {
        return (data as Contact[]);
    });
}

export function getContact(login: string, name: string): Promise<Contact | null> {
    const query = `contacts?login=${login}&name=${encodeURI(name)}`;
    return getData(query)
    .then(data => {
        return (data.length ? data[0] as Contact : null);
    });
}

export function addContact(contact: Contact) {
    const query = 'contacts';
    return postData(query, "POST", contact)
    .then(data => {
        return data;
    });
}

export function editContact(contact: Contact) {
    const query =  `contacts/${contact.id}`;
    return postData(query, "PUT", contact)
    .then(data => {
        return data;
    });
}

export function deleteContact(id: number) {
    const query =  `contacts/${id}`;
    return deleteData(query);
}