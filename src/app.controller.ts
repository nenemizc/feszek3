import { Controller, Get, Query, Render } from '@nestjs/common';
import { AppService } from './app.service.js';
import { Criminal } from './criminal.js';
import fs from 'node:fs';
import { get } from 'node:http';

@Controller()
export class AppController {
  @Render('index')
  getHello() {
    return {
      title: 'My First NestJS App',
    };
  }
  @Get('/piros-kek')
  @Render('red-blue')
  getRedBlue() {
    const random = Math.random();
    const bgColor = random > 0.5 ? 'red' : 'blue';
    return {
      bgColor,
    };
  }
  @Get('wanted')
  @Render('wanted')
  getWanted() {
    const criminal = JSON.parse(
      fs.readFileSync('wanted.json', { encoding: 'utf-8' }),
    ) as Criminal;
    return { criminal };
  }
  @Get('search')
  @Render('search')
  searchCrime(@Query('keresett') keresett: string) {
    if (!keresett) {
      return {
        talalatok: [],
      };
    }
    const criminal = JSON.parse(
      fs.readFileSync('wanted.json', { encoding: 'utf-8' }),
    ) as Criminal;

    return {
      talalatok: criminal.crimes.filter((crime) =>
        crime.toLowerCase().includes(keresett.toLowerCase()),
      ),
    };
  }
  @Get('color')
  @Render('color-picker')
  getColorPicker() {
    return {};
  }
}