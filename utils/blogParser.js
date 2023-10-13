const Blog = require("../models/blog");

module.exports = async function (blogId) {
  const blog = await Blog.findById(blogId);

  const populatedBlog = await (
    await (await blog.populate("author")).populate("comment")
  ).populate("userId");

  const authorNames = populatedBlog.author.map(
    (author) => `${author.fname} ${author.lname}`
  );
  const authorEmails = populatedBlog.author.map((author) => `${author.email}`);
  const commentList = populatedBlog.comment.map((comment) => {
    return {
      comments: comment.comment,
      userFullName: `${comment.fname} ${comment.lname}`,
      userEmail: comment.email,
    };
  });

  return {
    authorName: `${authorNames.join(", ")}`,
    authorEmails: `${authorEmails.join(", ")}`,
    blogTitle: populatedBlog.title,
    blogContent: populatedBlog.content,
    blogLike: populatedBlog.like,
    blogView: populatedBlog.view,
    comments: commentList,
  };
};
