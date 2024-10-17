import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgIf } from '@angular/common';

import { TicketsService } from '../../../../services/tickets.service';
import { ticket } from '../../../../models/ticket';
import { TicketInteraction } from '../../../../models/ticket-interaction';

@Component({
  selector: 'app-ticket-interaction',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './ticket-interaction.component.html',
  styleUrl: './ticket-interaction.component.css'
})
export class TicketInteractionComponent implements OnInit {

  errorMessage: string = '';
  formMode!: string;
  ticketId!: string;
  ticketInteraction!: TicketInteraction;
  ticketInteractionForm!: FormGroup;
  validationMessages: { [key: string]: { [key: string]: string } };
  private subscription!: Subscription

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private ticketsService: TicketsService

  ) {
    this.validationMessages = {
      message: {
        required: 'Assunto é obrigatório',
        minlength: 'Deter ter ao menos 3 catacteres',
        maxlength: 'Deter ter no máximo 500 catacteres',
      }
    }
  }

  ngOnInit() {
    this.formMode = 'new';
    this.ticketInteractionForm = this.fb.group({
      message: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(500)]],
    });

    this.subscription = this.route.paramMap.subscribe(
      params => {
        const id = params.get('id');

        if (id == null || id == '') {
          const t: TicketInteraction = {
            id: '', message: ''
          }
        } else {
          this.ticketId = id;
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  saveTicketInteraction(): void {
    if (this.ticketInteractionForm.valid) { // form validation
      if (this.ticketInteractionForm.dirty) { // method was modify from the beginning

        const newTicketInteraction = { ...this.ticketInteraction, ...this.ticketInteractionForm.value };
        this.ticketsService.createTicketInteraction(this.ticketId, newTicketInteraction).subscribe( // POST
          {
            next: ticketInteractio => {
              console.log('ENTROU NO chamou a service')
              this.router.navigate(['/tickets', this.ticketId, 'details'])
            },
            error: err => {
              this.errorMessage = <any>err.message
            },
            complete: () => {
              console.log('Finalizou')
            }
          }
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
