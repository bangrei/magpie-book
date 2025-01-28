interface LoginRequest {
  email: String;
  password: String;
}

interface Category {
  id: Number?;
  name: String;
}

interface Book {
  id: Number;
  author: String;
  quantity: Number;
  title: String;
  ISBN: String;
  category: Category;
}

interface User {
  id: Number;
  email: String;
  name: String;
  role: String;
}

interface Member {
  id: Number;
  user: User;
  status: String;
  joinedDate: Date;
}
