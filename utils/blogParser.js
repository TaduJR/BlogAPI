const Blog = require("../models/blog");

module.exports = async function (blogId) {
  const blog = await Blog.findById(blogId);

  const populatedBlog = await (
    await (await blog.populate("authors")).populate("comments")
  ).populate("comments.user");

  const authorNames = populatedBlog.authors.map(
    (author) => `${author.fname} ${author.lname}`
  );
  const authorEmails = populatedBlog.authors.map((author) => `${author.email}`);
  const commentList = populatedBlog.comments.map((comment) => {
    return {
      comment: comment.comment,
      userFullName: `${comment.user.fname} ${comment.user.lname}`,
      userEmail: comment.user.email,
    };
  });

  blog.view++;
  await blog.save();

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
