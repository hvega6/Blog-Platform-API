const createPostRoutes = (db) => {
    const router = express.Router();
  
    router.post('/', async (req, res) => {
      try {
        const { title, content, authorId, tags } = req.body;
        const result = await db.collection('posts').insertOne({
          title,
          content,
          authorId: new ObjectId(authorId),
          tags: tags || [],
          createdAt: new Date()
        });
        res.status(201).json(result);
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
    });
  
    router.get('/', async (req, res) => {
      try {
        const posts = await db.collection('posts')
          .aggregate([
            {
              $lookup: {
                from: 'users',
                localField: 'authorId',
                foreignField: '_id',
                as: 'author'
              }
            },
            { $unwind: '$author' }
          ])
          .toArray();
        res.json(posts);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });
  
    router.patch('/:id', async (req, res) => {
      try {
        const { title, content, tags } = req.body;
        const result = await db.collection('posts').updateOne(
          { _id: new ObjectId(req.params.id) },
          {
            $set: {
              ...(title && { title }),
              ...(content && { content }),
              ...(tags && { tags })
            }
          }
        );
        if (result.matchedCount === 0) {
          return res.status(404).json({ error: 'Post not found' });
        }
        res.json(result);
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
    });
  
    router.delete('/:id', async (req, res) => {
      try {
        const result = await db.collection('posts').deleteOne({
          _id: new ObjectId(req.params.id)
        });
        if (result.deletedCount === 0) {
          return res.status(404).json({ error: 'Post not found' });
        }
        res.status(204).send();
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
    });
  
    return router;
  };