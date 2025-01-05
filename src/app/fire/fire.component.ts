import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FireModel } from '../models.ts/fire-model';

@Component({
  selector: 'app-fire',
  imports: [],
  templateUrl: './fire.component.html',
  styleUrl: './fire.component.css'
})
export class FireComponent {
  @Input() model: FireModel | undefined = undefined;
  @Output() saved = new EventEmitter<FireModel>();

  getValue(event: any) : string{
    return event.target.value;
  }

  getNumberValue(event: any) : number{
    return Number(this.getValue(event));
  }

  validate(): boolean {
    if (!this.model?.name || !this.model.location || !this.model.date || !this.model.description || !this.model.source) {
      console.error('All fields are required.');
      return false;
    }
    return true;
  }

  save(){
    if (this.validate()) {
      this.saved.emit(this.model);
    }
  }
}
