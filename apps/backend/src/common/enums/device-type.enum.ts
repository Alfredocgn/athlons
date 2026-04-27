import { registerEnumType } from '@nestjs/graphql';

export enum DeviceType {
  GARMIN = 'GARMIN',
  SUUNTO = 'SUUNTO',
  POLAR = 'POLAR',
  STRAVA = 'STRAVA',
  APPLE_HEALTH = 'APPLE_HEALTH',
  GOOGLE_FIT = 'GOOGLE_FIT',
  FITBIT = 'FITBIT',
  COROS = 'COROS',
  OTHER = 'OTHER',
}

registerEnumType(DeviceType, { name: 'DeviceType' });
