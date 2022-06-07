const express = require('express');
const bodyParser = require('body-parser');
const placesRoutes = require('./routes/places-routes');
const usersRoutes = require('./routes/users-routes');
const doctorRoutes = require('./routes/doctor-routes');
const httpError = require('./models/http-error');

const app = express();

app.use(bodyParser.json())

app.use('/api/places',placesRoutes);

app.use('/api/users',usersRoutes);

app.use('/api/doctor',doctorRoutes);

app.use((req,res,next)=>{
   const error = new httpError('Could not find this router',404);
   throw error;
})

app.use((error,req,res,next)=>{
    if (res.headerSent){
        return next(error);
    }
    res.status(error.code || 500).json({message: error.message || 'sonething went wrong'})
})

app.listen(5000);