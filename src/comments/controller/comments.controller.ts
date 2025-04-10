import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Res,
  HttpStatus,
} from '@nestjs/common';

import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { Response } from 'express';
import { CommentDTO } from 'src/comments/dto/comments.dto';
import { CommentsService } from 'src/comments/services/comments.service';
import { i18n } from 'src/i18n';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private commentsServices: CommentsService) { }

  @ApiResponse({
    status: HttpStatus.OK,
    description: i18n()['message.comment.get'],
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request ',
  })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  @Get(':id')
  async getCommentById(
    @Param('id') id: string,
    @Res() res: Response
  ) {
    const comment = await this.commentsServices.findCommentById(id);
    return res.status(HttpStatus.OK).json({
      message: i18n()['message.comment.get'],
      data: { comment },
    });
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: i18n()['message.comment.created'],
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
  async create(@Body() commentDTO: CommentDTO, @Res() res: Response) {
    const comment = await this.commentsServices.createComment(commentDTO);

    return res.status(HttpStatus.CREATED).json({
      message: i18n()['message.comment.created'],
      data: { comment },
    });
  }

  @ApiResponse({
    status: HttpStatus.CREATED,
    description: i18n()['message.comment.update'],
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request : user or post or question does not exist',
  })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  @Put(':id')
  async updateComment(
    @Param('id') id: string,
    @Body() commentDTO: CommentDTO,
    @Res() res: Response,
  ) {
    const comment = await this.commentsServices.findByIdAndUpdateComment(
      id,
      commentDTO,
    );

    return res.status(HttpStatus.CREATED).json({
      message: i18n()['message.comment.update'],
      data: { comment },
    });
  }

  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: i18n()['message.comment.deleted'],
  })
  @ApiBadRequestResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Bad Request : comment does not exist',
  })
  @ApiInternalServerErrorResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Internal server error',
  })
  @Delete(':id')
  async deleteComment(@Param('id') id: string, @Res() res: Response) {
    await this.commentsServices.findByIdAndDeleteComment(id);

    return res.status(HttpStatus.NO_CONTENT);
  }
}
