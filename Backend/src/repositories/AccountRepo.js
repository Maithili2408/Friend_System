import { AccountModel } from '../models';
const { ObjectId } = require('mongodb');

class AccountRepo {
    //create new account
    async createAccount(accountObj) {

        const user = await AccountModel.find({ username: accountObj.username })
        if(JSON.stringify(user)===JSON.stringify([])){
            const account = new AccountModel(accountObj)
                const result = account.save();
                 return 1;
        }
        if(JSON.stringify(user)!==JSON.stringify([])){
             return 0;
            }
    }

    //update profile
    async updateProfile(id, record){
        try{
        const result = await AccountModel.findByIdAndUpdate(id,record,{new:true})
        return result;
        }catch (error) {
            console.error('Error updating document:', error);
          }
       }
   

    async authAccount(username,password){
        const user = await AccountModel.find({username:username,password:password});
        return user;
    }

    //get list of all users
     async getAllUser(){
        const user= await AccountModel.find();
        return user;
     }

     //get user based on username
     async getSearchData(username){
        const user = await AccountModel.find({username:username});
        return user;
     }

     //get user based on user id
    async getUser(id){
        const user = await AccountModel.findById(id);
        return user;
        
    }

    //send follow request
    async SendFollowRequest(to_id, from_id,username){
       
        const result=await AccountModel.findByIdAndUpdate(to_id,{
            $push:{request_id:{_id:from_id}}
        },{
            new:true
        })
       return result;
    }

    //get info of users who send follow request
    async getRequestedUser(id){
       const result= await AccountModel.findById(id);
       const idArray = result.request_id;
       const documentIds = idArray.map(id => (id));
       const users = await AccountModel.find({ _id: { $in: idArray } })
        return users;
    }

    //get list of all friends of user
    async getAllFriends(id){
        const result = await AccountModel.findById(id);
        const idArray = result.friend_id;
        const users = await AccountModel.find({ _id: { $in: idArray } })
        return users;

    }

    //accept request
    async AcceptRequest(id,friend_id){
        await AccountModel.findByIdAndUpdate(friend_id,{
            $push:{friend_id:{_id:id}}
        }).then((res)=>console.log("accept",res))
        const result= await AccountModel.findByIdAndUpdate(id,{
            $pull:{request_id: { $in: [new ObjectId(`${friend_id}`)] }},
            $push:{friend_id:{_id:friend_id}}
        },{
            new:true
        })
        return result;
    }

    // async getMutualFriend(id,userId){
    //     const result = await AccountModel.findById(id);
    //     const idArray1 = result.friend_id;
    //     const  result_1 = await AccountModel.findById(userId);
    //     const idArray2 = result_1.friend_id;

    //     FriendSystem.accounts.aggregate(
    //            [
    //               { $project: { BothValues:{ $setIntersection: [ "$idArray1", "$idArray2" ] }} }
    //            ]
    //         );
    // }
    
}

export default AccountRepo;


