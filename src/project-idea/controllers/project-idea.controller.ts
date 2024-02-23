import { Controller, Get } from '@nestjs/common';

@Controller('projectIdea')
export class ProjectIdeaController {
  constructor() {}

  @Get()
  async getProjectIdea() {}
}
