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
import { CommentDTO } from 'src/comments/dto/comments.dto';
import { CommentsService } from 'src/comments/services/comments/comments.service';

@Controller('comments')
export class CommentsController {
  constructor(private commentsServices: CommentsService) {}

  @Get('/:id')
  async getCommentById(@Param('id') id: string, @Res() res: Response) {
    const commentFound = await this.commentsServices.findCommentById(id);

    return res.status(200).json({
      msg: 'comment found successfully',
      comment: commentFound,
    });
  }

  @Post('')
  async create(@Body() commentDTO: CommentDTO, @Res() res: Response) {
    const commentCreated =
      await this.commentsServices.createComment(commentDTO);

    return res.status(201).json({
      msg: 'comment created successfully',
      comment: commentCreated,
    });
  }

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
      msg: 'comemen update',
      comment: updated,
    });
  }

  @Delete('/:id')
  async deleteComment(@Param('id') id: string, @Res() res: Response) {
    await this.commentsServices.findByIdAndDeleteComment(id);

    return res.status(200).json({
      msg: 'comment deleted',
    });
  }
}
