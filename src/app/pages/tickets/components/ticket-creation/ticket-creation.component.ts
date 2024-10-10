import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgIf } from '@angular/common';

import { TicketsService } from '../../../../services/tickets.service';
import { ticket } from '../../../../models/ticket';

@Component({
  selector: 'app-ticket-creation',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    RouterLink
  ],
  providers: [
    TicketsService
  ],
  templateUrl: './ticket-creation.component.html',
  styleUrl: './ticket-creation.component.css'
})
export class TicketCreationComponent implements OnInit, OnDestroy {

  errorMessage: string = '';
  formMode!: string;
  ticket!: ticket;
  ticketForm!: FormGroup;
  validationMessages: { [key: string]: { [key: string]: string } };
  private subscription!: Subscription

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private ticketsService: TicketsService

  ) {
    this.validationMessages = {
      subject: {
        required: 'Assunto é obrigatório',
        minlength: 'Deter ter ao menos 3 catacteres',
        maxlength: 'Deter ter no máximo 50 catacteres',
      },
      description: {
        minlength: 'Deter ter ao menos 3 catacteres',
        maxlength: 'Deter ter no máximo 1000 catacteres',
      }
    }

  }

  ngOnInit() {
    this.formMode = 'new';
    this.ticketForm = this.fb.group({
      subject: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      description: ['', [Validators.minLength(3), Validators.maxLength(1000)]]
    });

    this.subscription = this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');
        const subject = params.get('subject');

        if (id == null || id == '') {
          const t: ticket = {
            id: '', subject: '', description: '', attachment: null,
            createdBy: null, supportUser: null, createdAt: '', status: '', updatedBy: null, updateAt: ''
          }
        }

      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  saveTicket(): void {
    if (this.ticketForm.valid) { // form validation
      if (this.ticketForm.dirty) { // method was modify from the beginning

        const newTicket = { ...this.ticket, ...this.ticketForm.value };
        this.ticketsService.create(newTicket).subscribe( // POST
          () => this.router.navigate(['/tickets']),
          (error: any) => this.errorMessage = <any>error
        );
      }
    } else {
      this.errorMessage = 'Por favor, corrija os erros de validação.';
    }
  }

  closeAlert() {
    this.errorMessage = '';
  }

}
