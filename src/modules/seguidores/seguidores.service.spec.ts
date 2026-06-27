import { BadRequestException } from '@nestjs/common';
import { SeguidoresService } from './seguidores.service';

describe('SeguidoresService', () => {
  let service: SeguidoresService;
  let seguidorModel: any;

  beforeEach(() => {
    seguidorModel = {
      create: jest.fn(),
      find: jest.fn(),
      findById: jest.fn(),
      findByIdAndUpdate: jest.fn(),
    };

    service = new SeguidoresService(seguidorModel);
  });

  it('debe rechazar que un usuario se siga a sí mismo', async () => {
    const dto = { seguidor_id: 'same-id', seguido_id: 'same-id' };

    await expect(service.create(dto as any)).rejects.toThrow(BadRequestException);
    expect(seguidorModel.create).not.toHaveBeenCalled();
  });

  it('debe popular los usuarios relacionados al listar seguidores', async () => {
    const populate = jest.fn().mockReturnThis();
    const exec = jest.fn().mockResolvedValue([]);
    seguidorModel.find.mockReturnValue({ populate, exec });

    await service.findAll();

    expect(seguidorModel.find).toHaveBeenCalledWith({ activo: true });
    expect(populate).toHaveBeenCalledWith('seguidor_id', '-password');
    expect(populate).toHaveBeenCalledWith('seguido_id', '-password');
    expect(exec).toHaveBeenCalled();
  });
});
