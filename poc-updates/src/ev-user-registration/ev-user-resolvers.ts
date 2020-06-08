
import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {EvUserService} from './ev-user-service';
import {EvUserType} from './Model/evuser-schema';

import {AddEvUserType} from './Model/mutation.schema';

@Resolver()
export class EvUserResolvers {
  constructor(private  evUserService: EvUserService) {}

 @Query(()=> EvUserType)
 async checkUser(@Args('email') email : string){
   return await this.evUserService.findUser(email);
   }

@Mutation(()=> EvUserType)
async addEvOwnerRegistration(@Args('input') input: AddEvUserType){
  return await this.evUserService.createEvUser(input);
}

}
