import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

import { FormService } from '../../../services/form/form.service';
import { ChatService } from '../../../services/chat/chat.service';

import { Auth } from '../../../interfaces/auth';
import { SocketService } from 'src/app/services/socket/socket.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {
	public loginError = false;

	public registrationForm: FormGroup;

  constructor(
    private router: Router,
		private formService: FormService,
    private chatService: ChatService,
    private socketService: SocketService
  ) {
 		this.registrationForm = this.formService.createRegistrationForm();
   }

  ngOnInit(): void {
  }

	register(): void {
		if (this.registrationForm.valid) {
			this.chatService.register(this.registrationForm.value).subscribe(
				(response: Auth) => {
          this.registrationForm.reset();
          alert('User created Successfully');
          this.router.navigate(['/pages/authentication/admin']);
        })
		}
	}
}
