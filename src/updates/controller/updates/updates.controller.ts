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
import { UpdateDTO } from 'src/updates/dto/update.dto';
import { UpdatesService } from 'src/updates/services/updates/updates.service';

@ApiTags('Updates')
@Controller('updates')
export class UpdatesController {
  constructor(private updateService: UpdatesService) {}

  @ApiResponse({
    status: 200,
    description: 'Update found successfully',
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
      msg: 'updated found successfully',
      updateFound,
    });
  }

  @ApiResponse({
    status: 201,
    description: 'Update create successfully',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request : user or project does not exist',
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
      msg: 'update created successfully',
      update,
    });
  }

  @ApiResponse({
    status: 200,
    description: 'Update projects updated successfully',
  })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request : user or project does not exist',
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
      msg: 'update edit successfully',
      updated: editUpdateProject,
    });
  }

  @ApiResponse({
    status: 200,
    description: 'Update  deleted successfully',
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
      msg: 'delete sucessfully',
    });
  }
}
