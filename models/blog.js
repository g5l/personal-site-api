'use strict';
module.exports = (sequelize, DataTypes) => {
  const Blog = sequelize.define('Blog', {
    title: DataTypes.STRING,
    slug: DataTypes.STRING,
    image: DataTypes.STRING,
    article: DataTypes.TEXT,
    status: DataTypes.STRING,
  }, {
    underscored: true,
  });
  Blog.associate = function(models) {
    // associations can be defined here
  };
  return Blog;
};