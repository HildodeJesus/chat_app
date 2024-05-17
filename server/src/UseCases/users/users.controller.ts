import { Body, Controller, Param } from '@nestjs/common';
import { UpdateUserDto } from './dtos/update_user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const { name } = updateUserDto;
    await this.usersService.update(id, { name });

    return { type: 'success', msg: 'Usuário atualizado com sucesso!' };
  }

  async delete(@Param('id') id: string) {
    await this.usersService.delete(id);

    return { type: 'success', msg: 'Usuário deletado com sucesso!' };
  }
}
