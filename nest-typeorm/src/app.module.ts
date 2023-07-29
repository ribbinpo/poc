import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import { TagsModule } from './tags/tags.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath: ['.env'],
      load: [configuration],
    }),
    DatabaseModule,
    ProductsModule,
    TagsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
