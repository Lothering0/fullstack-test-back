import { Controller, Get, Post, Req, Body } from "@nestjs/common";
import { Request } from "express";
import { ContactsService } from "./contacts.service";
import { Contact } from "./contacts.model";
import { CreateContactDto } from "./dto";
import { CreatedItemResponse } from "src/crm";

@Controller("contacts")
export class ContactsController {
  public constructor(private readonly contactsService: ContactsService) {}

  @Get()
  public getAll(@Req() request: Request): Promise<Contact[]> {
    return this.contactsService.getAll(request);
  }

  @Post()
  public create(
    @Req() request: Request,
    @Body() dto: CreateContactDto
  ): Promise<CreatedItemResponse> {
    return this.contactsService.create(request, dto);
  }
}
