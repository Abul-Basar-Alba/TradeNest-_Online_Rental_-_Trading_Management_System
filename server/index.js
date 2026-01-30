import dotenv from 'dotenv';
import { connectDB } from './config/database.js';       
import { connect } from 'mongoose'; 
import app from './app.js';

dotenv.config(
{
    path: './.env'
});

const startServer = async () => {
    try{
   await connectDB();

   app.on("error",(error) => {
    console.log('Error connecting to server:', error);
    throw error;
    });   
    app.listen(process.env.PORT || 5000, () => {
        console.log(`Server running on port ${process.env.PORT || 5000}`);
    });
    } catch(error){
        console.error('Error starting server:', error);
    }
}