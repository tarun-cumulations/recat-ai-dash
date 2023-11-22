

import { atom } from 'recoil';

const dbConfigAtom = atom({
  key: 'dbConfig', 
  default: { 
    host: '',
    database: '',
    user: '',
    password: ''
  },
});

export default dbConfigAtom;
