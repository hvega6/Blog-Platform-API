// File: src/seed.js
import 'dotenv/config';
import { MongoClient, ObjectId } from 'mongodb';

const uri = process.env.MONGODB_URI;

async function seed() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db();
    console.log('Connected to MongoDB');

    // Clear existing data
    await db.collection('users').deleteMany({});
    await db.collection('posts').deleteMany({});
    await db.collection('comments').deleteMany({});

    // Create users
    const users = [
      {
        name: "John Doe",
        email: "john@example.com",
        bio: "Tech enthusiast and software developer",
        createdAt: new Date('2024-01-01')
      },
      {
        name: "Jane Smith",
        email: "jane@example.com",
        bio: "Digital marketing specialist and tech blogger",
        createdAt: new Date('2024-01-02')
      },
      {
        name: "Alex Johnson",
        email: "alex@example.com",
        bio: "AI researcher and part-time blogger",
        createdAt: new Date('2024-01-03')
      },
      {
        name: "Maria Garcia",
        email: "maria@example.com",
        bio: "UX designer and creative writer",
        createdAt: new Date('2024-01-04')
      },
      {
        name: "David Kim",
        email: "david@example.com",
        bio: "Full-stack developer and tech mentor",
        createdAt: new Date('2024-01-05')
      }
    ];

    const createdUsers = await db.collection('users').insertMany(users);
    console.log('Created users:', createdUsers.insertedIds);

    // Create posts
    const posts = [
      {
        title: "Getting Started with MongoDB",
        content: "MongoDB is a powerful NoSQL database that offers great flexibility...",
        authorId: createdUsers.insertedIds[0],
        tags: ["mongodb", "databases", "backend"],
        createdAt: new Date('2024-01-10')
      },
      {
        title: "The Future of AI in 2024",
        content: "Artificial Intelligence continues to evolve at an unprecedented pace...",
        authorId: createdUsers.insertedIds[2],
        tags: ["ai", "technology", "future"],
        createdAt: new Date('2024-01-11')
      },
      {
        title: "UX Design Principles",
        content: "Good user experience design starts with understanding your users...",
        authorId: createdUsers.insertedIds[3],
        tags: ["ux", "design", "web"],
        createdAt: new Date('2024-01-12')
      },
      {
        title: "JavaScript Best Practices",
        content: "Writing clean and maintainable JavaScript code is essential...",
        authorId: createdUsers.insertedIds[4],
        tags: ["javascript", "programming", "web"],
        createdAt: new Date('2024-01-13')
      },
      {
        title: "Digital Marketing Trends",
        content: "The digital marketing landscape is constantly evolving...",
        authorId: createdUsers.insertedIds[1],
        tags: ["marketing", "digital", "trends"],
        createdAt: new Date('2024-01-14')
      },
      {
        title: "RESTful API Design",
        content: "Creating well-designed REST APIs requires careful planning...",
        authorId: createdUsers.insertedIds[0],
        tags: ["api", "rest", "backend"],
        createdAt: new Date('2024-01-15')
      },
      {
        title: "The Rise of Edge Computing",
        content: "Edge computing is transforming how we process and deliver data...",
        authorId: createdUsers.insertedIds[2],
        tags: ["edge-computing", "technology", "infrastructure"],
        createdAt: new Date('2024-01-16')
      }
    ];

    const createdPosts = await db.collection('posts').insertMany(posts);
    console.log('Created posts:', createdPosts.insertedIds);

    // Create comments
    const comments = [
      {
        postId: createdPosts.insertedIds[0],
        userId: createdUsers.insertedIds[1],
        content: "Great introduction to MongoDB!",
        createdAt: new Date('2024-01-17')
      },
      {
        postId: createdPosts.insertedIds[0],
        userId: createdUsers.insertedIds[2],
        content: "Would love to see more advanced topics covered.",
        createdAt: new Date('2024-01-18')
      },
      {
        postId: createdPosts.insertedIds[1],
        userId: createdUsers.insertedIds[0],
        content: "Fascinating insights into AI trends!",
        createdAt: new Date('2024-01-19')
      },
      {
        postId: createdPosts.insertedIds[1],
        userId: createdUsers.insertedIds[3],
        content: "How do you think this will affect UX design?",
        createdAt: new Date('2024-01-20')
      },
      {
        postId: createdPosts.insertedIds[2],
        userId: createdUsers.insertedIds[4],
        content: "These principles have helped me improve my designs.",
        createdAt: new Date('2024-01-21')
      },
      {
        postId: createdPosts.insertedIds[3],
        userId: createdUsers.insertedIds[2],
        content: "Clean code is so important for maintenance!",
        createdAt: new Date('2024-01-22')
      },
      {
        postId: createdPosts.insertedIds[4],
        userId: createdUsers.insertedIds[0],
        content: "Would be great to see some case studies.",
        createdAt: new Date('2024-01-23')
      },
      {
        postId: createdPosts.insertedIds[5],
        userId: createdUsers.insertedIds[3],
        content: "REST is still so relevant today.",
        createdAt: new Date('2024-01-24')
      },
      {
        postId: createdPosts.insertedIds[6],
        userId: createdUsers.insertedIds[1],
        content: "Edge computing is definitely the future!",
        createdAt: new Date('2024-01-25')
      },
      {
        postId: createdPosts.insertedIds[6],
        userId: createdUsers.insertedIds[4],
        content: "Great explanation of complex concepts.",
        createdAt: new Date('2024-01-26')
      }
    ];

    const createdComments = await db.collection('comments').insertMany(comments);
    console.log('Created comments:', createdComments.insertedIds);

    console.log('Seed completed successfully!');

  } catch (err) {
    console.error('Seed error:', err);
  } finally {
    await client.close();
  }
}

// Run the seed function
seed().catch(console.error);