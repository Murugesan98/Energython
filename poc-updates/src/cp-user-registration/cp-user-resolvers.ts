
import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {CpUserService} from './cp-user-service';
import {CpUserType} from './Model/cp.user.schema';

import {AddCpUserType} from './Model/mutation.schema';
import {CpUserLocation } from './Model/cp.user.location';

@Resolver()
export class CpUserResolvers {
  constructor(private cpUserService: CpUserService) {}



@Mutation(()=> CpUserType)
async addCpOwnerRegistration(@Args('input') input: AddCpUserType){
  return await this.cpUserService.createCpUser(input);
}
@Query(()=> [CpUserLocation] )
async locationSearch(@Args('location') location: string)
{
  return await this.cpUserService.findCpUser(location);
}

}
