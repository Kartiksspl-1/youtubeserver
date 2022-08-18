const { default: mongoose } = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    name: { type: String, required: true, unique: false },
    email: { type: String,unique: true ,required: true, },
    password: { type: String, },
    img: { type: String },
    fromgoogle:{type:Boolean,
    default:false},
    subscribers: {
      type: Number,
      get: function(){
        return this.subscribedusers.length
      },
    },
    subscribedusers: {

      type: [String],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("users", UserSchema);
