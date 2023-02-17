import { Injectable } from "@nestjs/common";
import { Request } from "express";
import { CrmService, CreatedItemResponse } from "src/crm";
import { CreateContactDto } from "./dto";
import { Contact } from "./contacts.model";

@Injectable()
export class ContactsService {
  public constructor(private readonly crmService: CrmService) {}

  public getAll(request: Request): Promise<Contact[]> {
    return this.crmService.getAllContacts(request);
  }

  public create(
    request: Request,
    dto: CreateContactDto
  ): Promise<CreatedItemResponse> {
    return this.crmService.createContact(request, dto);
  }
}
