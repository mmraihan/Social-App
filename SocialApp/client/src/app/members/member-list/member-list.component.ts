import { Pagination } from './../../_models/pagination';
import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';
import { UserParams } from 'src/app/_models/usersParams';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss'],
})
export class MemberListComponent implements OnInit {
  members: Member[];
  pagination: Pagination;
  userParams: UserParams;
  user: User;
  genderList =[{value:'male', display: 'Males'},{value:'female', display:'Females'}]

  constructor(
    private memberService: MembersService) {
      this.userParams= memberService.getUserParams();
     } 

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers() {
    this.memberService.setUserParams(this.userParams)
    this.memberService.getMembrs(this.userParams).subscribe((res) => {
      this.members = res.result;
      this.pagination = res.pagination;
    });
  }

  pageChanged(event: any) {
    this.userParams.pageNumber = event.page;
    this.memberService.setUserParams(this.userParams);
    this.loadMembers();
  }

  resetFilters(){
    this.userParams=this.memberService.resetFilters();   
    this.loadMembers();
  }
}
