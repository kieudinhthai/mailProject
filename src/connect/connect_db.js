const mongoose = require ('mongoose')

async function connect() {
try {
    await mongoose.connect("mongodb+srv://myCoffeeDB:abc@123@piccolocoffeecluster.dvdub.mongodb.net/mail_data?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
      });

    console.log('Connect success!!');
} catch (error) {
    console.log('Connect fail!!');
}
}

module.exports = {connect}
