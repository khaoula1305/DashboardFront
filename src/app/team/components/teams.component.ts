import { Component, OnInit } from '@angular/core';
import {TreeNode} from 'primeng/api';
import {Dashboard} from 'src/app/dashboard/models/dashboard.model';
import { TeamsService } from 'src/app/team/services/team.service';
import { User } from 'src/app/team/models/User.model';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {ConfirmationService, ConfirmEventType, MessageService} from 'primeng/api';
import { Team } from '../models/team.model';
@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss'],
  providers: [ConfirmationService,MessageService]
})
export class TeamsComponent implements OnInit {
  nodes: TreeNode[];
  dashboards: Dashboard[];
  load=false;
  display=false;
  displayShare=false;
  members:User[];
  addMembers:User[];
  team:Team;
  teams:Team[];
  currentTeam:Team;
  filtredMembers: User[];
  constructor(
    private router: Router,
    private teamService: TeamsService,
    private confirmationService: ConfirmationService, 
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.team=new Team();
    this.teamService.getAllUsers().subscribe(
      data=>{
        this.members=data;
        //this.members=data.filter(u=>u.id!=this.teamService.getCurrentUser().id);
      }
    )
    this.nodes = [];
    this.teamService.getAllTeams().subscribe(
      (data)=>{
        this.teams=data;
        data.forEach(element => {
          let object : TreeNode= { key: element.id, label: element.title, children: []};
          this.teamService.getAllDashboards(element.id).subscribe(
            (dashs) => {
              let iteration2=0;
              dashs.forEach(elem=>{
                object.children.push({key:'-'+iteration2, label: elem.title, data:'/dashboards/'+elem.id, type: 'url', icon:"pi pi-fw pi-chart-bar", droppable:true });
              });
              iteration2++;
            }
          );
          this.nodes.push(object);
        });
      },
      (error) => {
        console.error();
      },
      () => {
        this.load = true;
      }
      );
  }
  share(node){
    this.currentTeam=this.teams.find(team=> team.id==node.key);
    this.addMembers=this.members.filter(user => this.currentTeam.members.find(u => u.id == user.id)==undefined);
    this.displayShare=true;
  }
  shareWithOthers(){
    this.teamService.updateTeam({id: this.currentTeam.id, title:this.currentTeam.title, members: this.currentTeam.members}).subscribe(
      data=> this.changeLocation()
    );
    this.displayShare=false;
  }
  showDialog() {
    this.display = true;
}
onDelete(node){
  this.confirmationService.confirm({
    message: 'Do you want to delete this Team?',
    header: 'Delete Confirmation',
    icon: 'pi pi-info-circle',
    accept: () => {
      this.teamService.deleteTeam(node.key).subscribe(
        (result)=>{
          this.messageService.add({severity:'info', summary:'Confirmed', detail:'Team'+ result.title+' was deleted'});
        },
        (error)=>{
          this.messageService.add({severity:'info', summary:'Confirmed', detail:' Error in server side'});
        },
        ()=>{
          this.changeLocation();
        }
      );
    },
    reject: (type) => {
        switch(type) {
            case ConfirmEventType.REJECT:
                this.messageService.add({severity:'error', summary:'Rejected', detail:'You have rejected'});
            break;
            case ConfirmEventType.CANCEL:
                this.messageService.add({severity:'warn', summary:'Cancelled', detail:'You have cancelled'});
            break;
        }
    }
});
}
onSubmit(m: NgForm) {
  this.team.admin=this.teamService.getCurrentUser();
  if ( m.untouched || m.invalid) {
    alert('Required');
  } else {
    this.teamService.addTeam(this.team).subscribe(
      result =>   this.changeLocation()
       );
  }
}
changeLocation() {
  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
    this.router.navigate(['/teams', ]); // navigate to same route
  });
}
filterMember(event, tab) {
  //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
  let filtered : any[] = [];
  let query = event.query;

  for(let i = 0; i < this.members.length; i++) {
      let member = this.members[i];
      if (member.lastName.toLowerCase().indexOf(query.toLowerCase()) == 0 || member.firstName.toLowerCase().indexOf(query.toLowerCase()) == 0) {
          filtered.push(member);
      }
  }
  
  this.filtredMembers = filtered;
}
}
