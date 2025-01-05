import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FireModel } from './models.ts/fire-model';
import { DataService } from '../sevices/data.service';
import { FireComponent } from "./fire/fire.component";
import { AlertComponent } from "../alert/alert.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, FireComponent, AlertComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  fires: FireModel[] = [];
  modify: FireModel | undefined = undefined;
  new: FireModel | undefined = undefined;
  constructor(private dataService: DataService) {}

  ngOnInit(){
    this.dataService.getFires().subscribe({
      next: (fires: FireModel[]) => {
        this.fires = fires;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  newFire(){
    this.new = {
      id: undefined,
      name: '',
      location: '',
      date: '',
      description: '',
      source: ''
    }
  }

  modFire(fire: FireModel){
    this.modify = JSON.parse(JSON.stringify(fire));
  }
  delFire(fire: FireModel){
    this.dataService.deleteFire(fire).subscribe({
      next: (fire: FireModel) => {
        const index = this.fires.findIndex(f => f.id === fire.id);
        this.fires.splice(index, 1);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  saveModify(fire: FireModel){
    this.dataService.modifyFire(fire).subscribe({
      next: (fire: FireModel) => {
        const index = this.fires.findIndex(f => f.id === fire.id);
        this.fires[index] = fire;
        this.modify = undefined;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  saveNew(fire: FireModel){
    this.dataService.addFire(fire).subscribe({
      next: (fire: FireModel) => {
        this.fires.push(fire);
        this.new = undefined;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
