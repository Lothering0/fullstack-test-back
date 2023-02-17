import { Controller, Get, Post, Req, Body } from "@nestjs/common";
import { Request } from "express";
import { CompaniesService } from "./companies.service";
import { Company } from "./companies.model";
import { CreateCompanyDto } from "./dto";
import { CreatedItemResponse } from "src/crm";

@Controller("companies")
export class CompaniesController {
  public constructor(private readonly companiesService: CompaniesService) {}

  @Get()
  public getAll(@Req() request: Request): Promise<Company[]> {
    return this.companiesService.getAll(request);
  }

  @Post()
  public create(
    @Req() request: Request,
    @Body() dto: CreateCompanyDto
  ): Promise<CreatedItemResponse> {
    return this.companiesService.create(request, dto);
  }
}
