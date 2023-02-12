/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Entities
import { Merchant } from '../merchant.entity';

// Dtos
import { CreateMerchantsDto } from '../dto/merchants/create-merchant.dto';
import { UpdateMerchantsDto } from '../dto/merchants/update-merchant.dto';

// Utils
import { encodePassword } from '../../utils/encodePassword';

import { ConfigService } from '@nestjs/config';

import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import sharp from 'sharp';

interface ImageOptions {
  width: number;
  height: number;
  fit: any;
}

@Injectable()
export class MerchantsService {
  constructor(
    @InjectRepository(Merchant)
    private merchantsRepository: Repository<Merchant>,
    private readonly configService: ConfigService
  ) {}

  async findAll() {
    const merchants = await this.merchantsRepository.find();
    return merchants;
  }

  async findOne(id: number) {
    return await this.merchantsRepository.findOneBy({ id });
  }

  async findByEmail(email: string) {
    return await this.merchantsRepository.findOneBy({ email });
  }

  async remove(id: number) {
    return await this.merchantsRepository.delete(id);
  }

  async add(createMerchantsDto: CreateMerchantsDto) {
    const foundMerchant = await this.merchantsRepository.findOneBy({
      email: createMerchantsDto.email,
    });

    if (!foundMerchant) {
      const password = encodePassword(createMerchantsDto.password);
      const newMerchant = this.merchantsRepository.create({
        ...createMerchantsDto,
        password,
      });
      return await this.merchantsRepository.save(newMerchant);
    } else {
      return 'User already exists!';
    }
  }

  async update(id: number, updateMerchantsDto: UpdateMerchantsDto) {
    const updatedMerchant = await this.merchantsRepository.update(
      id,
      updateMerchantsDto
    );
    if (updatedMerchant) {
      return updatedMerchant;
    }
  }

  async updateMerchantDetails(id: number, updateMerchantDetailsDto) {
    const updatedMerchant = await this.merchantsRepository.update(
      id,
      updateMerchantDetailsDto
    );
    if (updatedMerchant) {
      return updatedMerchant;
    }
  }

  async getSignedUrl(products: any) {
    // AWS
    const bucketName = this.configService.get('BUCKET_NAME');
    const bucketRegion = this.configService.get('BUCKET_REGION');
    const accessKey = this.configService.get('ACCESS_KEY');
    const secretAccessKey = this.configService.get('SECRET_ACCESS_KEY');

    // S3 Credentials
    const s3 = new S3Client({
      credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey,
      },
      region: bucketRegion,
    });

    const arr = [];
    const getUrl = async (prod) => {
      for await (const p of prod) {
        const objParams = {
          Bucket: bucketName,
          Key: p.image,
        };

        const command = new GetObjectCommand(objParams);
        const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
        const newObj = {
          ...p,
          url,
        };
        arr.push(newObj);
      }
    };

    await getUrl(products);
    return arr;
  }

  async createNewImage(
    uniqueName: string,
    buffer: any,
    mimetype: any,
    imageOptions: ImageOptions
  ) {
    // AWS
    const bucketName = this.configService.get('BUCKET_NAME');
    const bucketRegion = this.configService.get('BUCKET_REGION');
    const accessKey = this.configService.get('ACCESS_KEY');
    const secretAccessKey = this.configService.get('SECRET_ACCESS_KEY');

    // S3 Credentials
    const s3 = new S3Client({
      credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey,
      },
      region: bucketRegion,
    });

    const buff = await sharp(buffer).resize(imageOptions).toBuffer();

    const params = {
      Bucket: bucketName,
      Key: uniqueName,
      Body: buff,
      ContentType: mimetype,
    };

    console.log('params', params);
    const command = new PutObjectCommand(params);

    return await s3.send(command).catch((err) => console.log('error', err));
  }
}
