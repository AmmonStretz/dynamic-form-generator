import { FormConfig, FormStatus } from "@/shared/DynamicForm/Form/Form.config";

export class SidebarMenuConfig {
  constructor( public form: FormConfig, public listener: (status: FormStatus)=>void, public settings?: {confirmName?: string, closeName?: string} ){
    form.createStatus();
  }
}