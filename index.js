import express from "express";
import nodemailer from 'nodemailer';
// import cors_proxy from 'cors-anywhere';
import dotenv from 'dotenv';
dotenv.config();
import cors from "cors";

const port = process.env.PORT||80;
// const host = process.env.HOST;
const host = '0.0.0.0';

const app = express();
app.use(cors())
app.use(express.json())
app.use(
	express.urlencoded({
		extended: true,
	})
);
// Enable CORS middleware
// app.use((req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080'); // Replace with your client's origin
//   next();
// });
// res.sendFile(path.join(__dirname, 'views', 'index.html'));

    //__dirname : It will resolve to your project folder.


app.get('/', (req, res) => { 
  res.set('Access-Control-Allow-Origin', '*');
    console.log("working");
   return res.send("working..")
})



app.post('/api/email', async (req, res) => { 
  // res.sendFile(path.join('C:/xampp/htdocs/', 'habte-portfolio', 'index.html'));
  // res.set('Access-Control-Allow-Origin', '*');
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) { 
         res.status(500).send('all inputs are requered habtish');
    }
     try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        method: 'PLAIN',
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

   const mailOptions = {
	// from: email,
	to: process.env.TOEMAIL,
	subject: subject,
	text: JSON.stringify({
		name: name,
		email: email,
		message: message
	}, null, 4)
    };

    await transporter.sendMail(mailOptions);
         console.log('Email sent successfully!');
          res.json("Email sent successfully!");
         
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
    
  }
})

// cors_proxy
//   .createServer({
//     originWhitelist: [], // Allow all origins
//   })

app.listen(port, host, () => {
	console.log(`http://${host}:${port}`);
});

// Start the server
// app.listen(port, () => {
//     console.log('Server is running on port 8080');
//   });


