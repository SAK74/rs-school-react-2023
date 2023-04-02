export interface UserType {
  gender?: string;
  name: Record<"first" | "last" | "title", string>;
  email: string;
  dob: {
    age: number;
    date: string;
  };
  nat: string;
  picture: Partial<Record<"large" | "medium" | "thumbnail", string>>;
  login: Partial<Record<"uuid" | "username" | "password" | "sha1", string>>;
  registered?: {
    age: number;
    date: string;
  };
  location: Partial<Record<"city" | "country" | "state", string>>;
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
    image: string;
    content: FileList;
  };
  nat: string;
}
