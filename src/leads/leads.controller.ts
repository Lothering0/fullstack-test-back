import { Controller, Get, Post, Body, Req } from "@nestjs/common";
import { LeadsService } from "./leads.service";
import { Lead } from "./leads.model";
import { Request } from "express";
import { CreatedItemResponse } from "src/crm";
import { CreateLeadDto } from "./dto";

@Controller("leads")
export class LeadsController {
  public constructor(private readonly leadsService: LeadsService) {}

  @Get()
  public getAll(@Req() request: Request): Promise<Lead[]> {
    return this.leadsService.getAll(request);
  }

  @Post()
  public create(
    @Req() request: Request,
    @Body() dto: CreateLeadDto
  ): Promise<CreatedItemResponse> {
    return this.leadsService.create(request, dto);
  }
}
