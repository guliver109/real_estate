const { Schema, model } = require('mongoose');

    listingSchema = new Schema({
        // picture: { type: String, required: true },
        address: { type: String, /* required: true */ },
        city: { type: String, /* required: true */ },
        state: { type: String, /* required: true */ },
        zip_code: { type: Number, /* required: true */ },
        country: { type: String, /* required: true */ },
        first_name: { type: String, /* required: true */ },
        last_name: { type: String, /* required: true */ },
        officePhone: { type: Number, /* required: true */ },
        cellPhone: { type: Number, /* required: true */ },
        email: { type: String, /* required: true */ },
        about_me: { type: String, /* required: true */ },
        number_bedrooms: { type: Number, /* required: true */ },
        number_bathrooms: { type: Number, /* required: true */ },
        full_description: { type: String, /* required: true */ },
        short_description: { type: String, /* required: true */ },
        price: { type: Number, /* required: true */ },
        pictures: [String],
        user: {
            type: Schema.ObjectId,
            ref: 'User'
        },
        likes: [{
            type: Schema.ObjectId,
            ref: 'User'
        }],
    },
        {
            timestamps: true,
        });
    
module.exports = model('Listing', listingSchema)