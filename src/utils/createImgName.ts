/* eslint-disable prettier/prettier */
import { extname } from 'path';

export function createImgName(fieldname: any, originalname: any) {
  const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
  const uniqueName = fieldname + '-' + uniqueSuffix + extname(originalname);
  return uniqueName;
}
