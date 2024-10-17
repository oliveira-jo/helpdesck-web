import { user } from "./user"

export interface TickerInteractionResponse {
  id?: string,
  message: string,
  status: string,
  attachments: string,
  sentByUser: user,
  updateAt: Date
}
