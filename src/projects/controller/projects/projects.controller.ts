import { Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

@Controller('/projects')
export class ProjectsController {
  @Post('')
  async create() {
    return 'create project';
  }
  @Get('/:id')
  async findProjectById(@Param('id') id: string) {
    return ` find project ${id}`;
  }
  @Get('')
  async findAllProjects() {
    return 'find all projects';
  }
  @Delete('/:id')
  async deleteProjectById() {
    return 'find all projects';
  }
  @Put('/:iod')
  async updateProjectById() {
    return 'find all projects';
  }
}
