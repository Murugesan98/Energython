
import {Args, Mutation, Query, Resolver} from '@nestjs/graphql';
import {CpSearchService} from './cp-user-service';
import {CpSearch} from './Model/cp.search';
import {CpSearchResult} from './Model/cp.search.result';



@Resolver()
export class CpSearchResolvers {
  constructor(private  CpSearchService: CpSearchService) {}


@Query(()=> CpSearchResult)

async Search(@Args('input') input: CpSearch)
{
  return await this.CpSearchService.SearchCp(input);
}

}
