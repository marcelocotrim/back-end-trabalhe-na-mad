const removeDiacritics = require('diacritics').remove;
const Product = Parse.Object.extend('Product');

//endpoints
//salvar produto
Parse.Cloud.define('saveProduct', (req, res) => {
  const date = new Date(req.params.manufactureDate);
  const product = new Product();
  product.id = req.params.objectId ? req.params.objectId : null
  product.set('name', req.params.name);
  product.set('manufactureDate', new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0)));
  product.set('size', req.params.size);
  product.set('width', req.params.width);
  product.set('weight', req.params.weight);
  product.set('categories', req.params.categories);
  product.save(null, { useMasterKey: true }).then((response) => {
    res.success(response);
  }, (err) => {
    res.error(err.message);
  });
});

Parse.Cloud.define('fetchProduct', (req, res) => {
  const query = new Parse.Query('Product');
  query.get(req.params.objectId).then((response) => {
    res.success(response);
  }, (err) => {
    res.error(err.message);
  });
});

//listar produtos
Parse.Cloud.define('fetchProducts', (req, res) => {
  const query = new Parse.Query('Product');
  if (req.params.name) {
    query.equalTo('name', req.params.name);
  }
  if (req.params.manufactureDate) {
    const date = new Date(req.params.manufactureDate);
    query.equalTo('manufactureDate', new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0)));
  }
  if (req.params.size) {
    query.equalTo('size', req.params.size);
  }
  if (req.params.width) {
    query.equalTo('width', req.params.width);
  }
  if (req.params.weight) {
    query.equalTo('weight', req.params.weight);
  }
  if (req.params.categories) {
    query.containedIn('categories', req.params.categories);
  }
  if (req.params.ascending) {
    query.ascending(req.params.ascending);
  }
  if (req.params.descending) {
    query.descending(req.params.descending);
  }
  query.find().then((response) => {
    res.success(response);
  }, (err) => {
    res.error(err.message);
  });
});

//listar categorias
Parse.Cloud.define('fetchCategories', (req, res) => {
  const query = new Parse.Query('Category');
  query.find().then((response) => {
    res.success(response);
  }, (err) => {
    res.error(err.message);
  });
});

Parse.Cloud.beforeSave('Product', (req, res) => {
  if (req.object.dirty('name')) {
    req.object.set('nameNoDiacritics', removeDiacritics(req.object.get('name')).toLowerCase());
  }
  res.success();
});

Parse.Cloud.beforeSave('Category', (req, res) => {
  if (req.object.dirty('name')) {
    req.object.set('nameNoDiacritics', removeDiacritics(req.object.get('name')).toLowerCase());
  }
  res.success();
});
