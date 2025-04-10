import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
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
  constructor(private updateService: UpdatesService) { }

  @ApiResponse({
    status: HttpStatus.OK,
    description: i18n()['message.updates.get'],
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request : update does not exist',
  })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  @Get(':id')
  async getUpdateById(
    @Param('id') id: string,
    @Res() res: Response
  ) {
    const update = await this.updateService.findUpdateById(id);

    return res.status(HttpStatus.OK).json({
      message: i18n()['message.updates.get'],
      data: { update },
    });
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: i18n()['message.updates.created'],
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
  })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  @Post()
  async createUpdate(
    @Body() createUpdateProject: UpdateDTO,
    @Res() res: Response,
  ) {
    const update =
      await this.updateService.createUpdateToProject(createUpdateProject);

    return res.status(HttpStatus.CREATED).json({
      message: i18n()['message.updates.created'],
      data: { update },
    });
  }

  @ApiResponse({
    status: HttpStatus.OK,
    description: i18n()['message.updates.update'],
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request',
  })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateData: UpdateDTO,
    @Res() res: Response,
  ) {
    const updates = await this.updateService.editUpdateProjectbyId(
      id,
      updateData,
    );
    return res.status(HttpStatus.OK).json({
      message: i18n()['message.updates.update'],
      data: { updates },
    });
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: i18n()['message.updates.deleted'],
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request :update does not exist',
  })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  @Delete(':id')
  async deleteUpdate(@Param('id') id: string, @Res() res: Response) {
    await this.updateService.findByIdAndDeleteUpdate(id);
    return res.status(HttpStatus.NO_CONTENT)
  }
}
