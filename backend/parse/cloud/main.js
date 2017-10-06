const removeDiacritics = require('diacritics').remove;

Parse.Cloud.define('fetchCategories', (req, res) => {
  const query = new Parse.Query('Category');
  query.ascending('nameNoDiacritics');
  query.find().then((response) => {
    res.success(response);
  }, (err) => {
    res.success(err.message);
  });
});

Parse.Cloud.define('fetchProducts', (req, res) => {
  const query = new Parse.Query('Product');
  query.ascending('nameNoDiacritics');
  query.find().then((response) => {
    res.success(response);
  }, (err) => {
    res.success(err.message);
  });
});

Parse.Cloud.beforeSave('Category', (req, res) => {
  if (req.object.dirty('name')) {
    req.object.set('nameNoDiacritics', removeDiacritics(req.object.get('name')).toLowerCase());
  }
  res.success();
});


Parse.Cloud.beforeSave('Product', (req, res) => {
  if (req.object.dirty('name')) {
    req.object.set('nameNoDiacritics', removeDiacritics(req.object.get('name')).toLowerCase());
  }
  res.success();
});
