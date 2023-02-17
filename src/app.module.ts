import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { HttpModule } from "@nestjs/axios";
import { LeadsModule } from "./leads";
import { AuthGuard } from "./auth";
import { CrmModule } from "./crm";
import { ContactsModule } from "./contacts";
import { CompaniesModule } from "./companies";

@Module({
  imports: [
    LeadsModule,
    ContactsModule,
    CompaniesModule,
    HttpModule,
    CrmModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ]
})
export class AppModule {}
