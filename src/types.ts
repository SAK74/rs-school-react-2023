export interface UserType {
  gender: string;
  name: Record<'first' | 'last' | 'title', string>;
  email: string;
  dob: {
    age: number;
    date: string;
  };
  nat: string;
  picture: Record<'large' | 'medium' | 'thumbnail', string>;
  login: Record<'uuid' | 'username' | 'password' | 'sha1', string>;
  registered: {
    age: number;
    date: string;
  };
  location: Record<'city' | 'country' | 'state', string>;
}
