import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskStatus, TaskCategory } from './schemas/task.schema';
import { UserDocument } from '../users/schemas/user.schema';
import { ApiResponse, PageResponse } from '../../common/dto/api-response.dto';

@ApiTags('Tasks')
@Controller('tasks')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  async create(
    @CurrentUser() user: UserDocument,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    const task = await this.tasksService.create(user._id, createTaskDto);
    return ApiResponse.success(task, 'Task created successfully');
  }

  @Get()
  @ApiOperation({ summary: 'Get all tasks' })
  async findAll(
    @CurrentUser() user: UserDocument,
    @Query('status') status?: TaskStatus,
    @Query('category') category?: TaskCategory,
    @Query('search') search?: string,
    @Query('page') page = 0,
    @Query('size') size = 20,
  ) {
    const { data, total } = await this.tasksService.findAll(
      user._id,
      status,
      category,
      search,
      page,
      size,
    );
    return ApiResponse.success(new PageResponse(data, page, size, total));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get task by ID' })
  async findOne(@CurrentUser() user: UserDocument, @Param('id') id: string) {
    const task = await this.tasksService.findOne(user._id, id);
    return ApiResponse.success(task);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update task' })
  async update(
    @CurrentUser() user: UserDocument,
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    const task = await this.tasksService.update(user._id, id, updateTaskDto);
    return ApiResponse.success(task, 'Task updated successfully');
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update task status' })
  async updateStatus(
    @CurrentUser() user: UserDocument,
    @Param('id') id: string,
    @Query('status') status: TaskStatus,
  ) {
    const task = await this.tasksService.updateStatus(user._id, id, status);
    return ApiResponse.success(task, 'Task status updated');
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete task' })
  async remove(@CurrentUser() user: UserDocument, @Param('id') id: string) {
    await this.tasksService.remove(user._id, id);
    return ApiResponse.success(null, 'Task deleted successfully');
  }
}
