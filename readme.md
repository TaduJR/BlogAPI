# Intro

- This project is an API that allows users to create, manage, and interact with blog-related content, including authors, blog posts, and comments. This API serves as the backend for a blog platform and offers various endpoints to perform actions such as creating authors, writing and updating blog posts, liking blogs, posting comments, and more.This is the documentation for the Blog API project. This API allows you to manage authors, blogs, and comments.

# Key Features:

- Authors: Users can create and manage author profiles, including their full name and email. The API keeps track of the number of posts each author has written.

- Blog Posts: Authors can create and manage blog posts, providing a title, content, and associating it with an author. Users can also like and view blog posts.

- Comments: Users can post comments on specific blog posts, adding their user data and comments to the discussion.

# Routes

## Author Routes

- Create Author
  Endpoint: POST /author/create
  Description: Create a new author.
- Delete Author
  Endpoint: DELETE /author/delete
  Description: Delete an author. This action will also delete associated blogs and comments.

## Blog Routes

- Create Blog
  Endpoint: POST /blog/create
  Description: Create a new blog post.
- Get Blogs
  Endpoint: GET /blog
  Description: Get a list of blog posts.
- Update Blog
  Endpoint: PUT /blog/update
  Description: Update a blog post.
- Delete Blog
  Endpoint: DELETE /blog/delete
  Description: Delete a blog post. This action will also delete associated comments.
- Like Blog
  Endpoint: POST /blog/like
  Description: Like a blog post.

## Comment Routes

- Post Comment
  Endpoint: POST /comment/create
  Description: Post a comment on a blog post.
