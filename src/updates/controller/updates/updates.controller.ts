import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { UpdateDTO } from 'src/updates/dto/update.dto';
import { UpdatesService } from 'src/updates/services/updates/updates.service';
@Controller('updates')
export class UpdatesController {
  constructor(private updateService: UpdatesService) {}

  @Get('/:id')
  async getUpdateById(@Param('id') id: string, @Res() res: Response) {
    const updateFound = await this.updateService.findUpdateById(id);

    return res.status(200).json({
      msg: 'updated found successfully',
      updateFound,
    });
  }

  @Post()
  async createUpdate(
    @Body() createUpdateProject: UpdateDTO,
    @Res() res: Response,
  ) {
    const update =
      await this.updateService.createUpdateToProject(createUpdateProject);

    return res.status(200).json({
      msg: 'update created successfully',
      update,
    });
  }

  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() updateData: UpdateDTO,
    @Res() res: Response,
  ) {
    const editUpdateProject = await this.updateService.editUpdateProjectbyId(
      id,
      updateData,
    );
    return res.status(200).json({
      msg: 'update edit successfully',
      updated: editUpdateProject,
    });
  }

  @Delete('/:id')
  async deleteUpdate(@Param('id') id: string, @Res() res: Response) {
    await this.updateService.findByIdAndDeleteUpdate(id);
    return res.status(200).json({
      msg: 'delete sucessfully',
    });
  }
}
