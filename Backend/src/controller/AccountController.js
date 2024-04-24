import express, { application } from 'express';
import AccountService from '../services/AccountService';

const router = express.Router();
const accountService = new AccountService();




 

//create new account
router.post('/', async (req, res) => {
    const record = req.body;
    const account = await accountService.createAccount(record);
    if (account == 1) {
        res.send("1");
    }
    if (account == 0) {
        res.send("0");
    }
})

//edit profile
router.put('/update/:id',async(req,res)=>{
     const id = req.params.id;
     const record = req.body;
    //  console.log(id);
     console.log("record",record);
     const data = await accountService.updateProfile(id,record);
     console.log("account",data);
     res.send(data);

})

//authentication
router.get('/auth', async (req, res) => {
    const username = req.query.username;
    const password = req.query.password;
    const user = await accountService.authAccount(username, password);
    res.send(user);
})

//get all user
router.get('/allUser',async(req,res)=>{
    const users = await accountService.getAllUser();
    res.send(users);
})

//search user based on username
router.get('/search',async(req,res)=>{
    const username = req.query.username;
    const user = await accountService.getSearchData(username);
    res.send(user);
})

//get user based on id
router.get('/info/:id',async(req,res)=>{
    const id = req.params.id;
    const user = await accountService.getUser(id);
    res.send(user);
})

//send follow request
router.put('/request/:id',async(req,res)=>{
    const to_id= req.params.id;
    const  from_id = req.body.params.id;
    const username = req.body.params.username;
   
    const result  = await accountService.SendFollowRequest(to_id, from_id,username);
    res.send(result);
})

//get users who send request
router.get('/requestedUser/:id',async(req,res)=>{
    const id = req.params.id;
    const result = await accountService.getRequestedUser(id);
    res.send(result);
})

//get list of friends of particular user
router.get('/friends/:id',async(req,res)=>{
    const id = req.params.id;
    const result = await accountService.getAllFriends(id);
    res.send(result);
})

//accept request
router.put('/accept_request/:id',async(req,res)=>{
    const id = req.params.id;
    const friend_id = req.body.params.id;
    const result = await accountService.AcceptRequest(id,friend_id);
    res.send(result);
})

router.get('/mutualFriend/:id',async(req,res)=>{
    const id=req.params.id;
    const { userId} = req.body;
    const result = await accountService.getMutualFriend(id,userId);
    res.send(result);

})
router.get('')
// router.get('id');
export default router



