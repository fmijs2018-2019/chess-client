import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IMatchCreateDto } from 'src/app/models/match/matchCreateDto';

@Component({
  selector: 'app-create-match-modal',
  templateUrl: './create-match-modal.component.html',
  styleUrls: ['./create-match-modal.component.css']
})
export class CreateMatchModalComponent implements OnInit {

  constructor() { }

  @Output() 
  onSave: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
  }

  onClick = () => {
	  this.onSave.emit({});
  }

}
