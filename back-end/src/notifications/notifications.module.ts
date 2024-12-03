import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [TypeOrmModule.forFeature([])], // No entities for this module yet
  providers: [NotificationsService],
  controllers: [NotificationsController],
  exports:[TypeOrmModule]
})
export class NotificationsModule {}
