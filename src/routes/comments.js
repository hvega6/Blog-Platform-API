import express from 'express';
import { ObjectId } from 'mongodb';

const createCommentRoutes = (db) => {
    const router = express.Router();
  
    router.post('/', async (req, res) => {
      try {
        const { postId, userId, content } = req.body;
        const result = await db.collection('comments').insertOne({
          postId: new ObjectId(postId),
          userId: new ObjectId(userId),
          content,
          createdAt: new Date()
        });
        res.status(201).json(result);
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
    });
  
    router.get('/', async (req, res) => {
      try {
        const comments = await db.collection('comments').find().toArray();
        res.json(comments);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });
  
    router.get('/posts/:postId', async (req, res) => {
      try {
        const comments = await db.collection('comments')
          .aggregate([
            {
              $match: { postId: new ObjectId(req.params.postId) }
            },
            {
              $lookup: {
                from: 'users',
                localField: 'userId',
                foreignField: '_id',
                as: 'user'
              }
            },
            { $unwind: '$user' }
          ])
          .toArray();
        res.json(comments);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });
  
    return router;
  };

// Export the createCommentRoutes function
export default createCommentRoutes;