import express from "express";
import nodemailer from 'nodemailer';
// import cors_proxy from 'cors-anywhere';
import dotenv from 'dotenv';
dotenv.config();
import cors from "cors";

const port = process.env.PORT || 80;
// const host = process.env.HOST;
const host = '127.0.0.1';

const app = express();
app.use(cors())
app.use(express.json())
app.use(
	express.urlencoded({
		extended: true,
	})
);


app.get('/', (req, res) => { 
    console.log("working");
   return res.send("working..")
})



app.post('/api/email', async (req, res) => { 
 
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) { 
         res.status(500).send('all inputs are requered habtish');
    }
     try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      
      auth: {
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



app.listen(port, host, () => {
	console.log(`http://${host}:${port}`);
});

// Start the server
// app.listen(port, () => {
//     console.log('Server is running on port 8080');
//   });


