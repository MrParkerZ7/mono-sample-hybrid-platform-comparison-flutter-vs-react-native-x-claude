import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Task, TaskDocument, TaskStatus, TaskCategory } from './schemas/task.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectModel(Task.name) private taskModel: Model<TaskDocument>,
  ) {}

  async create(userId: string, createTaskDto: CreateTaskDto): Promise<TaskDocument> {
    const task = new this.taskModel({
      ...createTaskDto,
      userId,
    });
    return task.save();
  }

  async findAll(
    userId: string,
    status?: TaskStatus,
    category?: TaskCategory,
    search?: string,
    page = 0,
    size = 20,
  ): Promise<{ data: TaskDocument[]; total: number }> {
    const query: Record<string, unknown> = { userId };

    if (status) query.status = status;
    if (category) query.category = category;
    if (search) query.title = { $regex: search, $options: 'i' };

    const [data, total] = await Promise.all([
      this.taskModel
        .find(query)
        .sort({ createdAt: -1 })
        .skip(page * size)
        .limit(size)
        .exec(),
      this.taskModel.countDocuments(query),
    ]);

    return { data, total };
  }

  async findOne(userId: string, id: string): Promise<TaskDocument> {
    const task = await this.taskModel.findOne({ _id: id, userId });
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  async update(userId: string, id: string, updateTaskDto: UpdateTaskDto): Promise<TaskDocument> {
    const task = await this.taskModel.findOneAndUpdate(
      { _id: id, userId },
      updateTaskDto,
      { new: true },
    );
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  async updateStatus(userId: string, id: string, status: TaskStatus): Promise<TaskDocument> {
    const task = await this.taskModel.findOneAndUpdate(
      { _id: id, userId },
      { status },
      { new: true },
    );
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  async remove(userId: string, id: string): Promise<void> {
    const result = await this.taskModel.deleteOne({ _id: id, userId });
    if (result.deletedCount === 0) {
      throw new NotFoundException('Task not found');
    }
  }
}
