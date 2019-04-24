const   {Schema, model} = require('mongoose'),
        bcrypt = require('bcrypt'),
        SALT = 10;

    
    userSchema = new Schema({
        userName: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        listings:[{
            type: Schema.ObjectId,
            ref: 'Listing'
        }],
        likes:[{
            type: Schema.ObjectId,
            ref: 'Listing'
        }]
    });
    
    userSchema.pre('save', function(next) {
        let user = this;
        if(!user.isModified('password')) return next();
        bcrypt.genSalt(SALT, function(err, salt){
            if (err) return next(err);
            bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) return next(err);
                user.password = hash;
                next();
            })
        })
        
    })

    userSchema.methods.comparePassword = (userPassword, cb) => {
        bcrypt.compare(userPassword, this.password, (err, match) => {
            if (err) throw err;
            cb(match);
        })
    }

module.exports = model('User', userSchema)