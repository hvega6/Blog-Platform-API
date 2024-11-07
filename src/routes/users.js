import express from 'express';

const createUserRoutes = (db) => {
    const router = express.Router();
    
    router.post('/', async (req, res) => {
      try {
        const { name, email, bio } = req.body;
        const result = await db.collection('users').insertOne({
          name,
          email,
          bio,
          createdAt: new Date()
        });
        res.status(201).json(result);
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
    });
  
    router.get('/', async (req, res) => {
      try {
        const users = await db.collection('users').find().toArray();
        res.json(users);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });
  
    router.get('/:id', async (req, res) => {
      try {
        const user = await db.collection('users').findOne({
          _id: new ObjectId(req.params.id)
        });
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });
  
    return router;
  };
export default createUserRoutes;