const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [{model: Product}]
    });
    res.status(200).json(categoryData);
  } catch(e) {
    console.error(e);
    res.status(500).json({
      message: 'interval server error'
    });
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: 'interval server error'
    });
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (e) {
    console.error(e);
    res.status(500).json({
      message: 'interval server error'
    });
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const response = await Category.update({category_name: req.body.category_name}, {where: {id: req.params.id}});
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
  // delete a category by its `id` value
  try {
    const response = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    if(!response) {
      res.status(404).json({
        message: 'No category with this id'
      });
      return;
    }
    res.status(200).json({
      status: 'success',
      updated: response
    });
  } catch(e) {
    console.error(e);
    res.status(500).json({
      message: 'internal server error'
    });
  }
});

module.exports = router;
