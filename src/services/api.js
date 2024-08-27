let mockPosts = [
  {
    id: 1,
    title: "First Blog Post",
    imageUrl: "https://example.com/image1.jpg",
    highlight: "An exciting journey into web development",
    excerpt: "This is the first post content...",
    author: "John Doe",
    date: "2023-05-01",
    content: "Full content of the first blog post..."
  },
  {
    id: 2,
    title: "Second Blog Post",
    imageUrl: "https://example.com/image2.jpg",
    highlight: "Exploring the latest React features",
    excerpt: "This is the second post content...",
    author: "Jane Smith",
    date: "2023-05-05",
    content: "Full content of the second blog post..."
  },
  // Add more mock posts as needed
];

let users = [
  { id: 1, email: 'user1@example.com', password: 'password1' },
  { id: 2, email: 'user2@example.com', password: 'password2' },
];

export const registerUser = (email, password) => {
  const newUser = { id: users.length + 1, email, password };
  users.push(newUser);
  return Promise.resolve(newUser);
};

export const getPosts = () => {
  return Promise.resolve(mockPosts);
};

export const getPost = (id) => {
  const post = mockPosts.find(p => p.id === parseInt(id));
  return Promise.resolve(post);
};

export const createPost = (newPost) => {
  const post = {
    id: mockPosts.length + 1,
    ...newPost,
    date: new Date().toISOString().split('T')[0],
    author: "Current User",
    excerpt: newPost.content.substring(0, 100) + "..."
  };
  mockPosts.push(post);
  return Promise.resolve(post);
};

export const deletePost = (id) => {
  mockPosts = mockPosts.filter(post => post.id !== parseInt(id));
  return Promise.resolve();
};

export const loginUser = (email, password) => {
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    return Promise.resolve(user);
  } else {
    return Promise.reject('Invalid credentials');
  }
};