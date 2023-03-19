import { UserType } from 'types';
import json from './users.json';

const data = new Promise<UserType[]>((res) => res(json));

// const data: UserType[] = json;
export default data;
