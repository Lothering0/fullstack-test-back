import { Injectable } from "@nestjs/common";
import { Request } from "express";
import { CrmService, CreatedItemResponse } from "src/crm";
import { CreateCompanyDto } from "./dto";
import { Company } from "./companies.model";

@Injectable()
export class CompaniesService {
  public constructor(private readonly crmService: CrmService) {}

  public getAll(request: Request): Promise<Company[]> {
    return this.crmService.getAllCompanies(request);
  }

  public create(
    request: Request,
    dto: CreateCompanyDto
  ): Promise<CreatedItemResponse> {
    return this.crmService.createCompany(request, dto);
  }
}
