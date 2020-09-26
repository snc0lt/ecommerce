const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/test', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

mongoose.connection.on('connected', () => {
  console.log('DB is connected')
})