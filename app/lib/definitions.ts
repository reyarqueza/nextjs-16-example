/* types for the database tables */
export type Users = {
  id: number;
  username: string;
  created_at: string;
}

export type Media = {
  id: number;
  title: string;
  media_type_id: number;
  created_at: string;
}

export type MediaTypes = {
  id: number;
  name: string;
  created_at: string;
}

/* various types for the database queries */
export type UsersCollection = {
  username: string;
  title: string;
  media_type: string;
}
