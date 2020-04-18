const slugify = require('../helpers/slugify.js');

module.exports = (app, db) => {
  app.get('/posts', (req, res) => {
    db.Blog.findAll({ where: { status: 'active' } })
      .then( (result) => res.json(result) )
  });

  app.get('/post/:slug', (req, res) => {
    const { slug } = req.params;

    db.Blog.findOne({ where: { slug, status: 'active' } })
      .then( (result) => res.json(result) )
  });

  app.post('/post', (req, res) => {
    const { title, article } = req.body;
    const { image } = req.files;
    const slug = slugify(title);
    const imagePath = `/assets/blog/${image.name}`;

    image.mv(`./public/assets/blog/${image.name}`);

    db.Blog.create({
      title: title,
      slug: slug,
      image: imagePath,
      article: article
    }).then( (result) => res.json(result) )
  });

  app.put('/post', (req, res) => {
    let image, imagePath;
    const { id, title, article } = req.body;
    const slug = slugify(title);

    if (req.files) {
      ({ image } = req.files)
      imagePath = `/assets/blog/${image.name}`;
      image.mv(`./public/assets/blog/${image.name}`);
    }

    db.Blog.update({
      title: title,
      slug: slug,
      image: imagePath,
      article: article
    }, {
      where: { id }
    }).then( (result) => res.json(result) )
  });
}