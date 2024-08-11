let express=require('express');
let app=express();
let {open}=require('sqlite');
let path=require('path');
let sqlite3=require('sqlite3');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');

const dbPath=path.join(__dirname,'help.db');
app.use(express.json())

let db=null;

const initializedbAndServer=async()=>{
    try{
        db= await open({
            filename:dbPath,
            driver:sqlite3.Database,
        })
        app.listen(3000,()=>{
            console.log(`Server running on 3000 port`);
        })
    }catch(e){
        console.log(`DB Error: ${e.message}`);
        process.exit(1);
    }
}
initializedbAndServer()


const authenticateToken=(req,res,next)=>{
    let jwtToken
    const authHeader=req.headers['authorization']
    if(authHeader!==undefined){
        jwtToken=authHeader.split(' ')[1]
    }
    if(jwtToken===undefined){
        res.status(401);
        res.send("Invalid JWT Token");
    }
    else{
        jwt.verify(jwtToken,'MY_SECRET_TOKEN',async(error,payload)=>{
            if(error){
                res.status(401);
                res.send('Invalid JWT Token');
            }
            else{
                next();
            }
        })
    }
}


app.get('/',authenticateToken,async(req,res)=>{
    const query=`select * from student;`;
    const dbarray=await db.all(query);
    res.send(dbarray);
})


app.post('/register',async(req,res)=>{
    const {username,name,password}=req.body;
    const hashedpass=await bcrypt.hash(req.body.password,10);
    const selectedquery=`select * from user where username='${username}';`;
    const dbUser=await db.get(selectedquery);
    if(dbUser===undefined){
        const query=`insert into user(username,name,password) values('${username}','${name}','${hashedpass}');`;
        const dbarr=await db.run(query);
        res.send('User Created');
    }
    else{
        res.status(400)
        res.send('User Already Exists');
    }
})

app.post('/login',async(req,res)=>{
    const {username,password}=req.body;
    const hashedpass=await bcrypt.hash(req.body.password,10);
    const selectedquery=`select * from user where username='${username}'`;
    const dbUser=await db.get(selectedquery);
    if(dbUser===undefined){
        res.status(400)
        res.send('User Doesnot Exists');
    }
    else{
        const ismatch=await bcrypt.compare(password,dbUser.password);
        if(ismatch===true){
            const payload={
                username:username,
            }
            const jwtToken=jwt.sign(payload,'MY_SECRET_TOKEN');
            res.send(jwtToken);
        }
        else{
            res.status(400);
            res.send('Invalid Password');
        }
    }
})
