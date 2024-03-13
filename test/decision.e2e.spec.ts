import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { DecisionsModule } from 'src/decisions/decisions.module';
import { Test, TestingModule } from '@nestjs/testing';

describe('DecisionController e2e', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [DecisionsModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('deve retornar Notfoun', async () => {
    const id = 'osdaofjod';
    return request(app.getHttpServer())
      .get('/desicions/fjdiaj')
      .expect(`Decision ${id} not found`)
      .expect(404);
  });
});
