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
import { CommentDTO } from 'src/comments/dto/comments.dto';
import { CommentsService } from 'src/comments/services/comments/comments.service';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private commentsServices: CommentsService) {}

  @ApiResponse({ status: 200, description: 'comment found successfully' })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request : comment dos not exist',
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Get('/:id')
  async getCommentById(@Param('id') id: string, @Res() res: Response) {
    const commentFound = await this.commentsServices.findCommentById(id);

    return res.status(200).json({
      message: 'comment found successfully',
      comment: commentFound,
    });
  }

  @ApiResponse({ status: 201, description: 'comment created successfully' })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request : userID or postId or questionID does not exist',
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Post('')
  async create(@Body() commentDTO: CommentDTO, @Res() res: Response) {
    const commentCreated =
      await this.commentsServices.createComment(commentDTO);

    return res.status(201).json({
      message: 'comment created successfully',
      comment: commentCreated,
    });
  }

  @ApiResponse({ status: 200, description: 'comment updated successfully' })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request : user or post or question does not exist',
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Put('/:id')
  async updateComment(
    @Param('id') id: string,
    @Body() commentDTO: CommentDTO,
    @Res() res: Response,
  ) {
    const updated = await this.commentsServices.findByIdAndUpdateComment(
      id,
      commentDTO,
    );

    return res.status(200).json({
      message: 'comement update sucessfully',
      comment: updated,
    });
  }

  @ApiResponse({ status: 200, description: 'comment deleted successfully' })
  @ApiBadRequestResponse({
    status: 400,
    description: 'Bad Request : comment does not exist',
  })
  @ApiInternalServerErrorResponse({
    status: 500,
    description: 'Internal server error',
  })
  @Delete('/:id')
  async deleteComment(@Param('id') id: string, @Res() res: Response) {
    await this.commentsServices.findByIdAndDeleteComment(id);

    return res.status(200).json({
      msg: 'comment deleted',
    });
  }
}
