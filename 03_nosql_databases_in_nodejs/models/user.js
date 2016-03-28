var mongoose = require('../db/mongoose');

var Schema = mongoose.Schema;

var schema = new Schema({
    firstName: {
        type: String,
        trim: true,
        required: 'First Name is required'
    },
    lastName: {
        type: String,
        trim: true,
        required: 'Last Name is required'
    },
    company: {
        type: String,
        trim: true
    },
    position: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        required: 'Email address is required',
        match: [/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/, 'Please fill a valid email address']
    },
    phoneNumber: {
        type: String,
        trim: true,
        required: 'Phone Number is required!',
        match: [/^[\d\(\)\-\+\s]+$/, 'Please fill a valid phone number']
    }
});

schema.virtual('fullName').get(function () {
    return this.firstName + ' ' + this.lastName;
});

schema.set('toJSON', {
    transform: function(doc, ret, options){
        ret.id = doc._id;
        delete ret._id;
        delete ret.__v;
    }
});

exports.User = mongoose.model('User', schema);