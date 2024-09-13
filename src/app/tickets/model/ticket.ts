//import { UUID } from "crypto";
import { attachment } from "../../attachments/model/attachment";

export interface ticket {
  id?: string | null,
  subject: string | null,
  description: string | null,
  attachment: attachment[] | null
}
