import { Module, Global } from "@nestjs/common";
import { AmoModule } from "./amo";
import { CrmService } from "./crm.service";

@Global()
@Module({
  imports: [AmoModule],
  providers: [CrmService],
  exports: [CrmService]
})
export class CrmModule {}
