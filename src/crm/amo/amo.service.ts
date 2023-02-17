import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { Request } from "express";
import { Lead } from "src/leads";
import { AxiosError, Method } from "axios";
import { AuthData } from "src/auth";
import { catchError, firstValueFrom } from "rxjs";
import { AmoResponse } from "./amo.types";
import { CreatedItemResponse } from "../crm.types";
import { CreateLeadDto } from "src/leads/dto";
import { Contact } from "src/contacts";
import { CreateContactDto } from "src/contacts/dto";
import { Company } from "src/companies";
import { CreateCompanyDto } from "src/companies/dto";

@Injectable()
export class AmoService {
  public constructor(private readonly httpService: HttpService) {}

  private async _fetch<T>(
    method: Method,
    endpoint: "leads" | "contacts" | "companies",
    authData: AuthData,
    body?: any
  ): Promise<T> {
    const url = `https://${authData.baseDomain}/api/v4/${endpoint}`
    const Cookie =
      `access_token=${authData.accessToken}; Path=/; Domain=amocrm.ru; Secure; HttpOnly;`;

    const response = this.httpService.request<T>({
      withCredentials: true,
      method,
      url,
      headers: { Cookie },
      data: body
    })
      .pipe(catchError((error: AxiosError) => {
        throw error;
      }));
    const { data } = await firstValueFrom(response);

    return data;
  }

  public async getAllLeads({ authData }: Request): Promise<Lead[]> {
    const response = await this._fetch<
      AmoResponse<{ leads: Lead[] }>
    >("get", "leads", authData);

    return response._embedded.leads;
  }

  public async createLead(
    { authData }: Request,
    dto: CreateLeadDto
  ): Promise<CreatedItemResponse> {
    const response = await this._fetch<
      AmoResponse<{ leads: [Lead] }>
    >("post", "leads", authData, [dto]);

    return {
      id: response._embedded.leads[0].id
    };
  }

  public async getAllContacts({ authData }: Request): Promise<Contact[]> {
    const response = await this._fetch<
      AmoResponse<{ contacts: Contact[] }>
    >("get", "contacts", authData);

    return response._embedded.contacts;
  }

  public async createContact(
    { authData }: Request,
    dto: CreateContactDto
  ): Promise<CreatedItemResponse> {
    const response = await this._fetch<
      AmoResponse<{ contacts: [Contact] }>
    >("post", "contacts", authData, [dto]);

    return {
      id: response._embedded.contacts[0].id
    };
  }

  public async getAllCompanies({ authData }: Request): Promise<Contact[]> {
    const response = await this._fetch<
      AmoResponse<{ companies: Company[] }>
    >("get", "companies", authData);

    return response._embedded.companies;
  }

  public async createCompany(
    { authData }: Request,
    dto: CreateCompanyDto
  ): Promise<CreatedItemResponse> {
    const response = await this._fetch<
      AmoResponse<{ companies: [Company] }>
    >("post", "companies", authData, [dto]);

    return {
      id: response._embedded.companies[0].id
    };
  }
}
