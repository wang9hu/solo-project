const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const SALT_WORK_FACTOR = 10;

const MONGO_URI = 'mongodb+srv://wang9hu:DWI8DpND4rxwUfaO@cluster0.4mbtnas.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'solo-project'
})
.then(() => console.log('Connected to Mongo DB.'))
.catch(err => console.log(err));

const itemsSchema = new Schema({
  time: String,
  title: { type: String, required: true },
  description: String,
  priority: { type: String, default: 'low' },
  completion: { type: Boolean, default: false },
})

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: { type: String, required: true },
  todoList: [itemsSchema] // default undefined, use user.todoList.set(index, newItem) to update 
});

userSchema.pre('save', function (next) {
  const salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);
  this.password = bcrypt.hashSync(this.password, salt);
  next();
})

module.exports = mongoose.model('user', userSchema);