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
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { i18n } from 'src/i18n';
import { UpdateDTO } from 'src/updates/dto/update.dto';
import { UpdatesService } from 'src/updates/services/updates.service';

@ApiTags('Updates')
@Controller('updates')
export class UpdatesController {
  constructor(private updateService: UpdatesService) {}

  @ApiResponse({
    status: 200,
    description: i18n()['message.updates.get'],
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request : update does not exist',
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Get('/:id')
  async getUpdateById(@Param('id') id: string, @Res() res: Response) {
    const updateFound = await this.updateService.findUpdateById(id);

    return res.status(200).json({
      message: i18n()['message.updates.get'],
      updateFound,
    });
  }

  @ApiResponse({
    status: 201,
    description: i18n()['message.updates.created'],
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Post()
  async createUpdate(
    @Body() createUpdateProject: UpdateDTO,
    @Res() res: Response,
  ) {
    const update =
      await this.updateService.createUpdateToProject(createUpdateProject);

    return res.status(200).json({
      message: i18n()['message.updates.created'],
      update,
    });
  }

  @ApiResponse({
    status: 200,
    description: i18n()['message.updates.update'],
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request',
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Internal server error',
  })
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
      message: i18n()['message.updates.update'],
      updated: editUpdateProject,
    });
  }

  @ApiResponse({
    status: 200,
    description: i18n()['message.updates.deleted'],
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request :update does not exist',
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Delete('/:id')
  async deleteUpdate(@Param('id') id: string, @Res() res: Response) {
    await this.updateService.findByIdAndDeleteUpdate(id);
    return res.status(200).json({
      message: i18n()['message.updates.deleted'],
    });
  }
}
