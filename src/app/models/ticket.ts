import { attachment } from "./attachment";
import { user } from "./user";

export interface ticket {
  id?: string | null,
  subject: string | null,
  description: string | null,
  attachment: attachment[] | null,

  createdBy: user | null,
  supportUser: user | null,
  createdAt: string | null,
  status: string | null,
  updatedBy: user | null,
  updateAt: string | null,

}