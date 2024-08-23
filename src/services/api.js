const mockPosts = [
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

export const getPosts = () => {
  return Promise.resolve(mockPosts);
};

export const getPost = (id) => {
  const post = mockPosts.find(p => p.id === parseInt(id));
  return Promise.resolve(post);
};