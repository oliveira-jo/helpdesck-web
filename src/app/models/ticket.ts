import { attachment } from "./attachment";

export interface ticket {
  id?: string | null,
  subject: string | null,
  description: string | null,
  attachment: attachment[] | null
}
