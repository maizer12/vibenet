import PostModel from '../models/Post.js';

export const createPost = async (req, res) => {
  try {
    const doc = new PostModel({ ...req.body, user: req.id });
    const post = await doc.save();
    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(404).json({
      message: 'Failed to create post',
    });
  }
};
export const deletePost = async (req, res) => {
  try {
    const id = req.params.id;
    const findPost = await PostModel.findByIdAndDelete(id);
    res.json({ message: true });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      message: 'Failed to delete post',
    });
  }
};
export const updatePost = async (req, res) => {
  try {
    const id = req.params.id;
    const newPost = await PostModel.findOneAndUpdate(
      { _id: id },
      { ...req.body },
      { returnDocument: 'after' },
    ).populate('user');
    res.json({ newPost });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      message: 'Failed to update post',
    });
  }
};
export const getAll = async (req, res) => {
  const { type } = req.params;
  const sort = type === 'popular' ? { viewsCount: -1 } : { createdAt: -1 };
  try {
    const posts = await PostModel.find().sort(sort).populate('user').exec();
    res.json(posts);
  } catch (err) {
    res.status(404).json({
      message: 'Failed to get posts',
    });
  }
};
export const getLastTags = async (req, res) => {
  try {
    const doc = await PostModel.find().limit(5).exec();
    const tags = [
      ...new Set(
        doc
          .map((e) => e.tags)
          .flat()
          .slice(0, 5),
      ),
    ];

    res.json(tags);
  } catch (err) {
    console.log(err);
    res.status(404).json({
      message: 'Failed to get tags',
    });
  }
};
export const getOne = async (req, res) => {
  try {
    const id = req.params.id;
    const doc = await PostModel.findOneAndUpdate(
      { _id: id },
      { $inc: { viewsCount: 1 } },
      { returnDocument: 'after' },
    ).populate('user');

    if (!doc) {
      return res.status(404).json({
        message: 'Post not found',
      });
    }

    res.json(doc);
  } catch (err) {
    console.log(err);
    res.status(404).json({
      message: 'Failed to get post',
    });
  }
};
