import { Message } from 'src/app/_models/message';
import { MessageService } from './../../_services/message.service';

import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.scss']
})
export class MemberMessagesComponent implements OnInit {
 
   @Input() messages: Message[];

  constructor() { }

  ngOnInit(): void {
  
  }

  

}
