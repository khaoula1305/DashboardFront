import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Dashboard } from 'src/app/dashboard/dashboard.model';
import { DashboardsService } from 'src/app/dashboard/dashboards.service';
@Component({
  selector: 'app-update-dashboard',
  templateUrl: './update-dashboard.component.html',
  styleUrls: ['./update-dashboard.component.scss']
})
export class UpdateDashboardComponent implements OnInit {
  dashboard : Dashboard = new Dashboard();
  load=false;
  constructor(private dashboardService: DashboardsService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params.id;
    this.dashboardService.getDashboard(id).subscribe(
      data => {
        this.dashboard = data;
      },
      (error) => {
        console.log(error);
      },
      () => {
        this.load=true;
      }
    );
  }
  onSubmit(m: NgForm) {
    if ( m.untouched || m.invalid) {
      alert('Required');
    } else {
 
      this.dashboard.title = m.value.title;
      this.dashboard.description= m.value.description;
      this.dashboardService.updateDashboard(this.dashboard).subscribe(
        result => this.router.navigate(['/'])
         );
    }
  }

}
