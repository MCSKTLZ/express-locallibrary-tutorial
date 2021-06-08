var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var GenreSchema = new Schema(
  {
    // book: { type: Schema.Types.ObjectId, ref: 'Book', required: true }, //reference to the associated book
    // author: {type: Schema.Types.ObjectId, ref: 'Author', required: true},
    name: {type: String, required: true, maxLength: 100, minLength: 3},
  }
);

// Virtual for bookinstance's URL
GenreSchema
.virtual('url')
.get(function () {
  return '/catalog/genre/' + this._id;
});

//Export model
module.exports = mongoose.model('Genre', GenreSchema);