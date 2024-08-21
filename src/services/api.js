const mockPosts = [
    { id: 1, title: 'First Blog Post', content: 'This is the first post content...' },
    { id: 2, title: 'Second Blog Post', content: 'This is the second post content...' },
  ];
  
  export const getPosts = () => {
    return Promise.resolve(mockPosts);
  };
  
  export const getPost = (id) => {
    const post = mockPosts.find(p => p.id === parseInt(id));
    return Promise.resolve(post);
  };