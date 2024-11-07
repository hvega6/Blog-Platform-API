# Blog Platform API

A RESTful API for a blog platform built with Node.js, Express, and MongoDB.

## API Routes

### Users
- **POST /users** - Create a new user
- **GET /users** - Get all users
- **GET /users/:id** - Get a specific user

### Posts
- **POST /posts** - Create a new post
- **GET /posts** - Get all posts with author details
- **PATCH /posts/:id** - Update a post
- **DELETE /posts/:id** - Delete a post

### Comments
- **POST /comments** - Create a new comment
- **GET /comments** - Get all comments
- **GET /comments/posts/:postId** - Get all comments for a specific post

## Data Models

### Users Collection
- **name**: String
- **email**: String (unique)
- **bio**: String
- **createdAt**: Date

### Posts Collection
- **title**: String (indexed)
- **content**: String
- **authorId**: ObjectId (indexed)
- **tags**: Array of Strings
- **createdAt**: Date

### Comments Collection
- **postId**: ObjectId (indexed)
- **userId**: ObjectId
- **content**: String
- **createdAt**: Date

## Database Indexes
- **posts.title**: For quick post searches
- **posts.authorId**: For efficient author lookups
- **comments.postId**: For efficient comment retrieval
- **users.email**: Unique index for email validation

## Validation Rules
The posts collection includes MongoDB validation rules that ensure:
- Required fields: title, content, authorId
- Title length: 1-100 characters
- Content: Must not be empty
- Tags: Must be an array of strings
