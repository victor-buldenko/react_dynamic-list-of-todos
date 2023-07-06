export interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export interface ExtendedUser extends User {
  completed: boolean;
  title: string;
  todoID: number;
}
