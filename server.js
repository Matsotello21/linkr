const express = require('express'); //fetching express framework (i.e importing)
const app = express(); //makign express available to use and storing it in app to use it whereever I Need it 
app.use(express.json())// telling express to translate to json 
const port = 3000; // port 3000 is used to run and test server locally 

let links={};
let counter = 1000; // base-36 IDs start at 'rs' — avoids single-character codes


app.get('/health', (req,res) => { // health check
    res.json({ //when user goes to port 3000/health , it will show them status:ok
        status: "ok"
    })
});

app.listen(port,()=>{ //listen is server waitng for incoming requests 
    console.log (` app listening at http://localhost:${port}`) // this prints out  the port 3000 link to go check 
}) ;

app.post('/submit', (req, res) =>{ //post used for sening data to server 
    const urlFromBody = req.body.targetUrl; // this is where we get our full link 
  
    if(!urlFromBody){ //if link is not there a 400 error will be returned 
        return res.status(400).json({'error': 'url is required'})
    }else{
        counter ++; //increment counter
        let shortID = counter.toString(36); // turning full url to short base 36 ID
        let savedLink= links[shortID] = urlFromBody //this is the ID that just got created saved 
        res.json({ //when an ID is created froma confirmed link ,we send a respond with the short ID Link as well as the refrence url link we jus shortened
            shortID,
            savedLink
        })
    }
}); 

app.get('/:id', (req, res) =>{ 
    let newID = req.params.id; //grabs  the user url 
    if(!(links[newID])){//checks if the url is in links 
        return res.status(404).json({'error': 'url ID not found'})//if url is not there, repsond with 404 error
    }else{
         res.redirect(links[newID]); //if link works redirect to what the ID is linked to 
    }
});


