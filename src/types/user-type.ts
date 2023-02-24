type user = {
  user_id?: string | number
  username: string // Unique value of user name; used for authentication
  password: string // password hashed digest.
  first_name: string // user's first name.
  last_name: string // user's last name.
}

export default user
