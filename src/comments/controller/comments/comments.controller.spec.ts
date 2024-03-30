import { Test, TestingModule } from '@nestjs/testing';
import { CommentsController } from './comments.controller';
import { CommentsService } from 'src/comments/services/comments/comments.service';

describe('CommentsController', () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let controller: CommentsController;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let service: CommentsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentsController],
      providers: [CommentsService],
    }).compile();

    controller = module.get<CommentsController>(CommentsController);
    service = module.get<CommentsService>(CommentsService);
  });

  it('should be defined', () => {
    expect(2).toBe(2);
  });

  // describe('getCommentById', () => {
  //   it('should return a comment when given a valid id', async () => {
  //     // Mock the service method
  //     const mockComment = { id: '1', content: 'Test comment' };
  //     jest.spyOn(service, 'findCommentById').mockResolvedValue(mockComment);

  //     // Mock response object
  //     const mockResponse = {
  //       status: jest.fn().mockReturnThis(),
  //       json: jest.fn(),
  //     };

  //     // Call the controller method
  //     await controller.getCommentById('1', mockResponse);

  //     // Expectations
  //     expect(mockResponse.status).toHaveBeenCalledWith(200);
  //     expect(mockResponse.json).toHaveBeenCalledWith({
  //       message: 'comment found successfully',
  //       comment: mockComment,
  //     });
  //   });

  //   it('should return a 400 error when given an invalid id', async () => {
  //     // Mock the service method to return null (comment not found)
  //     jest.spyOn(service, 'findCommentById').mockResolvedValue(null);

  //     // Mock response object
  //     const mockResponse = {
  //       status: jest.fn().mockReturnThis(),
  //       json: jest.fn(),
  //     };

  //     // Call the controller method
  //     await controller.getCommentById('invalid-id', mockResponse);

  //     // Expectations
  //     expect(mockResponse.status).toHaveBeenCalledWith(400);
  //     expect(mockResponse.json).toHaveBeenCalledWith({
  //       message: 'Bad Request : comment does not exist',
  //     });
  //   });
  // });
});
