import {AccountRepo} from '../repositories';

class AccountService{

    constructor(){
        this.accountRepo = new AccountRepo();
        process.env.PORT // 
    }
    
    
    //create new account
     async createAccount(account){
       return  await this.accountRepo.createAccount(account);
    }

     //edit profile
     async updateProfile(id,record){
       return await this.accountRepo.updateProfile(id,record);
    }

    async authAccount(username,password){
        return await this.accountRepo.authAccount(username,password);
    }

    //get all users
    async getAllUser(){
        return await this.accountRepo.getAllUser();
    }

    //get user based on username
     async getSearchData(username){
        return await this.accountRepo.getSearchData(username);
     }

     //get user based on id
    async getUser(id){
        return await this.accountRepo.getUser(id);
    }

    //send follow request
    async SendFollowRequest(to_id, from_id,username){
        return await this.accountRepo.SendFollowRequest(to_id, from_id,username);
    }

    //get users who send request to particular user
    async getRequestedUser(id){
        return await this.accountRepo.getRequestedUser(id);
    }

    //get list of friends
    async getAllFriends(id){
        return await this.accountRepo.getAllFriends(id);
    }

    //accept friend request
    async AcceptRequest(id,friend_id){
        return await this.accountRepo.AcceptRequest(id,friend_id);
    }

    async getMutualFriend(id,userId){
        return await this.accountRepo.getMutualFriend(id,userId);
    }
}

export default AccountService;