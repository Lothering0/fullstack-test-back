import { Injectable } from "@nestjs/common";
import { Request } from "express";
import { Lead } from "src/leads";
import { CreateLeadDto } from "src/leads/dto";
import { AmoService } from "./amo";
import { CreatedItemResponse } from "./crm.types";
import { Contact } from "src/contacts";
import { CreateContactDto } from "src/contacts/dto";
import { Company } from "src/companies";
import { CreateCompanyDto } from "src/companies/dto";

@Injectable()
export class CrmService {
  public constructor(private readonly amoService: AmoService) {}

  public getAllLeads(request: Request): Promise<Lead[]> {
    return this.amoService.getAllLeads(request);
  }

  public createLead(
    request: Request,
    dto: CreateLeadDto
  ): Promise<CreatedItemResponse> {
    return this.amoService.createLead(request, dto);
  }

  public getAllContacts(request: Request): Promise<Contact[]> {
    return this.amoService.getAllContacts(request);
  }

  public createContact(
    request: Request,
    dto: CreateContactDto
  ): Promise<CreatedItemResponse> {
    return this.amoService.createContact(request, dto);
  }

  public getAllCompanies(request: Request): Promise<Company[]> {
    return this.amoService.getAllCompanies(request);
  }

  public createCompany(
    request: Request,
    dto: CreateCompanyDto
  ): Promise<CreatedItemResponse> {
    return this.amoService.createCompany(request, dto);
  }
}
