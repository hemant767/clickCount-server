/*--------------------------------*/
/*PACKAGES REQUIRED*/
/*--------------------------------*/

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const path = require('path');
const app = express();

const { response } = require('express');

/*--------------------------------*/
/*BASIC SETUP*/
/*--------------------------------*/
const cors = require("cors");
app.use(cors({ origin: "*" }));


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(bodyParser.json())
mongoose.connect('mongodb+srv://hemantatvit2023:bpHIDz1oPANvZCqC@cluster0.1elxbc4.mongodb.net/?retryWrites=true&w=majority', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
}).then(() => console.log("connected"), err => console.log(err));

/*--------------------------------*/
/*GLOBAL VARIABLES*/
/*--------------------------------*/





/*--------------------------------*/
/*SCHEMAS AND MODELS*/
/*--------------------------------*/

const locationSchema = {
	count: {
		type: Number,
		require: [true],
	},
	location: {
		type: Object,
		require: [true],

	}
};

const location = mongoose.model('location', locationSchema);

/*--------------------------------*/
/*REQUET RELATED TO HOMEPAGE */
/*--------------------------------*/

app.get('/api/getAllLocation', async (req, res) =>{
	const data = await location.find({});
	const response= {
		data:data,
		status:200,
		msg:"Ok"
	}
	
	console.log(data);

	res.send(response);
});



app.post("/api/addLocation", function (req, res) {

	console.log(req.body);

// 	location.findOne({  location: req.body} 
// 	).then(doc=>{
// 		if(doc==null){

// 			const l=new location({
// 				count:1,
// 				location:req.body,
		
		
// 			});
// 			l.save();
			

// 		}else{
// 			doc.count=doc.count+1;
// 			const response= {
// 				data:null,
// 				status:200,
// 				msg:"Ok"
// 			}
			
// 			return doc.save();
// 		}

// 	}).catch(err=>{
// 		console.log(err);
// 		const response= {
// 			data:null,
			
// 		}
// 		res.send(response)
// 	})

	location.updateOne({location:req.body},{$inc:{count:1}},{upsert:true})
	.then(data=>{
		console.log(data);
	}).catch(err=>{
		console.log(err)
	})
	res.send(req.body)
})



app.get("/test",(req,res)=>{
	res.send("I amsh nss")
})
/*--------------------------------*/
/*SERVER */
/*--------------------------------*/

app.listen(8000, function () {
	console.log('Server started on port 8000');
});