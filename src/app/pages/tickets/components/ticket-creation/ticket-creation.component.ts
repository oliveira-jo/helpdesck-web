import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TicketsService } from '../../../../services/tickets.service';
import { Subscription } from 'rxjs';
import { NgIf } from '@angular/common';
import { ticket } from '../../../../models/ticket';

@Component({
  selector: 'app-ticket-creation',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './ticket-creation.component.html',
  styleUrl: './ticket-creation.component.css'
})
export class TicketCreationComponent implements OnInit, OnDestroy {

  errorMessage: string = '';
  pageTitle: string = 'Adicionar de Ticket';
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
          const t: ticket = { id: '', subject: '', description: '', attachment: null }
          this.showTicket(t);
        } else {
          this.getTicket(id);
        }
      }
    );

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getTicket(id: string): void {
    this.ticketsService.getTicket(id).subscribe(
      (ticket: ticket) => this.showTicket(ticket),
      (error: any) => this.errorMessage = <any>error

    )
  }

  showTicket(ticket: ticket): void {

    if (this.ticketForm) {
      this.ticketForm.reset();
    }

    this.ticket = ticket;

    if (this.ticket.id == '') {
      this.pageTitle = 'Adicionar ticket';
    } else {
      this.pageTitle = `Editar ticket ${this.ticket.id}`;
    }

    this.ticketForm.patchValue({
      subject: this.ticket.subject,
      description: this.ticket.description
    });

  }

  deleteTicket(): void {
    if (this.ticket.id == '') {
      this.onSaveComplete();
    } else {
      if (confirm(`Tem certeza que deseja excluir o ticket: ${this.ticket.subject} ?`)) {
        this.ticketsService.delete(this.ticket.id!).subscribe(
          () => this.onSaveComplete(),
          (error: any) => this.errorMessage = <any>error
        );
      }
    }
  }

  saveTicket(): void {

    if (this.ticketForm.valid) {

      if (this.ticketForm.dirty) {

        const newTicket = { ...this.ticket, ...this.ticketForm.value };

        if (newTicket.id === '') {
          this.ticketsService.create(newTicket).subscribe( // POST
            () => this.onSaveComplete(),
            (error: any) => this.errorMessage = <any>error
          );
        } else {
          this.ticketsService.update(newTicket).subscribe( // PUT
            () => this.onSaveComplete(),
            (error: any) => this.errorMessage = <any>error
          );
        }

      } else {
        this.onSaveComplete();
      }

    } else {
      this.errorMessage = 'Por favor, corrija os erros de validação.';
    }
  }

  onSaveComplete(): void {
    this.ticketForm.reset();
    this.router.navigate(['/tickets']);
  }

  closeAlert() {
    this.errorMessage = '';
  }

}
