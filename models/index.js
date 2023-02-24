// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Category.hasMany(Product, {
  foreignKey: 'category_id',
});

// Categories have many Products
Product.belongsTo(Category, {
  foreignKey: 'category_id',
  onDelete: 'cascade'
});

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: {
    model: ProductTag,
    unique: false
  },
  as: 'tag_of_this_product'
});

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: {
    model: ProductTag,
    unique: false
  },
  as: 'product_of_this_tag'
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
