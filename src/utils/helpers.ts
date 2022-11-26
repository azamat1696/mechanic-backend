/* eslint-disable prettier/prettier */
import { join } from 'path';
import { readFileSync } from 'fs';
import { handlebars } from 'hbs';

export async function compileTemplate(templateName: string) {
  const filePath = join(process.cwd(), 'views', `${templateName}.hbs`);
  const html = readFileSync(filePath, 'utf8');
  return handlebars.compile(html);
}
