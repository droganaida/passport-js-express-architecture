
const mongoose = require('../libs/mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    avatar: {
        type: String
    },
    socialId: {
        type: String
    },
    provider: {
        type: String
    },
    created: {
        type: Date,
        default: Date.now
    }
});

schema.index(
    {email: 1}, {unique: true, dropDups: true}
);

schema.statics = {
    fullSave: async function(data) {
        const Item = this;
        const items = new Item(data);
        return await items.save();
    },
    updateItem: async function(id, params) {
        const Item = this;
        return await Item.updateOne(
            {_id: id},
            {$set: params}
        );
    },
    removeItem: async function(id) {
        const Item = this;
        return await Item.deleteOne({_id: id});
    }
};

exports.Users = mongoose.model('Users', schema);