import express from "express";
import nodemailer from 'nodemailer';

import dotenv from 'dotenv';
dotenv.config();
import cors from "cors";
import path from "path";
const port = process.env.PORT ;
const host = process.env.HOST;
// const host = '0.0.0.0';

const app = express();
app.use(cors())
app.use(express.json())
app.use(
	express.urlencoded({
		extended: true,
	})
);

// res.sendFile(path.join(__dirname, 'views', 'index.html'));

    //__dirname : It will resolve to your project folder.


app.get('/', (req, res) => { 
  
    console.log("working");
   return res.send("working..")
})



app.post('/api/email', async (req, res) => { 
  // res.sendFile(path.join('C:/xampp/htdocs/', 'habte-portfolio', 'index.html'));
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


