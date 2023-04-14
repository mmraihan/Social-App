import { Message } from 'src/app/_models/message';
import { MessageService } from './../../_services/message.service';

import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.scss']
})
export class MemberMessagesComponent implements OnInit {
  @Input() userName: string;
  messages: Message[];

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages(){
    this.messageService.getMessagesThread(this.userName).subscribe(res=>{
      this.messages=res;
      console.log(this.messages)
    })

  }

}
