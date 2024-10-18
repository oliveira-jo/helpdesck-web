import { user } from "./user"

export interface TickerInteractionResponse {
  id?: string,
  message: string,
  status: string,
  createdAt: Date,
  sentByUser: user,
  attachments: string,
}
