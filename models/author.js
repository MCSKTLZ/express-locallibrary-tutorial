var mongoose = require('mongoose');

const { DateTime } = require('luxon');

var Schema = mongoose.Schema;

var AuthorSchema = new Schema(
    {
        first_name: {type: String, required: true, maxLength: 100},
        family_name: {type: String, required : true, maxLength: 100},
        date_of_birth: {type: Date},
        date_of_death: {type: Date},
    }
);

AuthorSchema.virtual('name').get(function () {
    return this.family_name + ', ' + this.first_name;
});

AuthorSchema.virtual('lifespan_formatted').get(function () {
    var birth = this.date_of_birth ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED) : ' ? ';
    var death = this.date_of_death ? DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED) : ' ? ';
    return birth + ' - ' + death;
});

AuthorSchema.virtual('date_of_birth_formatted').get(function () {
    return this.date_of_birth ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED) : 'No info';
});

AuthorSchema.virtual('date_of_death_formatted').get(function () {
    return this.date_of_death ? DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED) : 'No info';
});

AuthorSchema.virtual('date_of_birth_form').get(function (){
    return DateTime.fromJSDate(this.date_of_birth).toISODate();
});

AuthorSchema.virtual('date_of_death_form').get(function (){
    return DateTime.fromJSDate(this.date_of_death).toISODate();
});

AuthorSchema.virtual('url').get(function () {
    return '/catalog/author/' + this._id;
});

module.exports = mongoose.model('Author', AuthorSchema);