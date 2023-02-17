import { Injectable } from "@nestjs/common";
import { Request } from "express";
import { CrmService, CreatedItemResponse } from "src/crm";
import { CreateLeadDto } from "./dto";
import { Lead } from "./leads.model";

@Injectable()
export class LeadsService {
  public constructor(private readonly crmService: CrmService) {}

  public getAll(request: Request): Promise<Lead[]> {
    return this.crmService.getAllLeads(request);
  }

  public create(
    request: Request,
    dto: CreateLeadDto
  ): Promise<CreatedItemResponse> {
    return this.crmService.createLead(request, dto);
  }
}
