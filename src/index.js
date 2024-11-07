import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { MongoClient, ObjectId } from 'mongodb';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/blogdb';
let db;

async function connectToDatabase() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    db = client.db();
    console.log('Connected to MongoDB');
    
    // Create indexes
    await db.collection('posts').createIndex({ title: 1 });
    await db.collection('posts').createIndex({ authorId: 1 });
    await db.collection('comments').createIndex({ postId: 1 });
    await db.collection('users').createIndex({ email: 1 }, { unique: true });
    
    // Set up schema validation
    await db.command({
      collMod: 'posts',
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['title', 'content', 'authorId'],
          properties: {
            title: {
              bsonType: 'string',
              minLength: 1,
              maxLength: 100
            },
            content: {
              bsonType: 'string',
              minLength: 1
            },
            authorId: {
              bsonType: 'objectId'
            },
            tags: {
              bsonType: 'array',
              items: {
                bsonType: 'string'
              }
            }
          }
        }
      }
    });
  } catch (err) {
    console.error('Database connection error:', err);
    process.exit(1);
  }
}

await connectToDatabase();
// Initialize routes
app.use('/api/users', createUserRoutes(db));
app.use('/api/posts', createPostRoutes(db));
app.use('/api/comments', createCommentRoutes(db));

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});