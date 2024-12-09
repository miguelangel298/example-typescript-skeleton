import { buildApp } from '../../src/app';
import config from '../../config/loader';
import { getConnection } from 'typeorm';
import * as request from 'supertest';

/**
 * Function to be run at the beginning of each test
 * @returns {Promise<void>}
 */
export async function setupEach() {
  // Create app
  this.app = await buildApp(config);

  // Create client (for fully-httpd requests)
  this.client = request(this.app);

  // Configure mocks

}

/**
 * Function to be run at the end of each test
 * @returns {Promise<void>}
 */
export async function shutdownEach() {
  // Remove the existing data (mocks)
  await getConnection().synchronize(true);
  // Close connection (so the app can connect on the next test)
  await getConnection().close();
}
