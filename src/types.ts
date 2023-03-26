export interface UserType {
  gender: string;
  name: Record<"first" | "last" | "title", string>;
  email: string;
  dob: {
    age: number;
    date: string;
  };
  nat: string;
  picture: Record<"large" | "medium" | "thumbnail", string>;
  login: Record<"uuid" | "username" | "password" | "sha1", string>;
  registered: {
    age: number;
    date: string;
  };
  location: Record<"city" | "country" | "state", string>;
}

export interface FormValues {
  title: string;
  firstName: string;
  lastName: string;
  date: string;
  switch: "male" | "female";
  check: boolean;
  file: {
    name: string;
    content: string;
  };
  nat: string;
}
