import { ApiProperty } from '@nestjs/swagger';

export class ApiResponse<T> {
  @ApiProperty()
  success: boolean;

  @ApiProperty({ required: false })
  message?: string;

  @ApiProperty({ required: false })
  data?: T;

  @ApiProperty()
  timestamp: Date;

  constructor(partial: Partial<ApiResponse<T>>) {
    Object.assign(this, partial);
    this.timestamp = new Date();
  }

  static success<T>(data?: T, message?: string): ApiResponse<T> {
    return new ApiResponse({
      success: true,
      message,
      data,
    });
  }

  static error<T>(message: string, data?: T): ApiResponse<T> {
    return new ApiResponse({
      success: false,
      message,
      data,
    });
  }
}

export class PageResponse<T> {
  @ApiProperty()
  content: T[];

  @ApiProperty()
  page: number;

  @ApiProperty()
  size: number;

  @ApiProperty()
  totalElements: number;

  @ApiProperty()
  totalPages: number;

  @ApiProperty()
  first: boolean;

  @ApiProperty()
  last: boolean;

  constructor(
    content: T[],
    page: number,
    size: number,
    totalElements: number,
  ) {
    this.content = content;
    this.page = page;
    this.size = size;
    this.totalElements = totalElements;
    this.totalPages = Math.ceil(totalElements / size);
    this.first = page === 0;
    this.last = page >= this.totalPages - 1;
  }
}
