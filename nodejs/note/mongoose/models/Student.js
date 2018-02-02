const mongoose = require('./db');
const Schema = mongoose.Schema;

let noteSchema = new Schema({
	title: String,
	content: String,
	date: {
		type: Date,
		default: Date.now()
	}
});

noteSchema.index({title: 1});

noteSchema.methods.printTitle = () => {
	console.log(this.title);
};
noteSchema.statics.printContent = () => {
	console.log(this.model(note))
}

let Note = mongoose.model('note',noteSchema);

let random = parseInt(Math.random() * 20 + 1);

Note.create({title: `我爱北京${random}`,content: '我爱北京天安门，天安门上太阳升！'})




