import 'dotenv/config';
import app from './app.js';

const PORT = process.env.PORT;

if(!PORT){
    console.log("PORT absent, compléter le ficher d'env");
    process.exit(1);
    
}

app.listen(PORT, ()=>{
    console.log(`server lancé sur le port ${PORT}`);
    
});