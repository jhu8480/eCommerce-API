const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  const tagData = await Tag.findAll({
    include: [{model: Product, through: ProductTag, as: 'product_of_this_tag'}]
  });
  res.status(200).json(tagData);
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{model: Product, through: ProductTag, as: 'product_of_this_tag'}]
    });
    if (!tagData) {
      res.status(404).json({ message: 'No Tag found with this id!' });
      return;
    }
    res.status(200).json(tagData);
  } catch(e) {
    console.error(e);
    res.status(500).json({
      message: 'internal server error'
    })
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json({
      message: 'success',
      data: tagData
    });
  } catch(e) {
    console.error(e);
    res.status(500).json({
      message: 'internal server error'
    })
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const response = await Tag.update(req.body, {where: {id: req.params.id}});
    res.status(200).json({
      status: 'success',
      updated: response
    });
  } catch(e) {
    console.log(e);
    res.status(500).json({
      message: 'internal server error'
    });
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!tagData) {
      res.status(404).json({
        message: 'No tag found with this id!'
      });
      return;
    }

    res.status(200).json({
      status: 'success',
      data: tagData
    })

  } catch(e) {
    console.error(e);
    res.status(500).json({
      message: 'internal server error'
    })
  }
});

module.exports = router;
