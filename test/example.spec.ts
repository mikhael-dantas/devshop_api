/* eslint-disable valid-typeof */
// run node -r @adonisjs/assembler/build/register japaFile.ts

import Database from '@ioc:Adonis/Lucid/Database'
import User from 'App/Models/User'
import Documentation from 'App/utils/Documentation'
import test from 'japa'
import { Assert } from 'japa/build/src/Assert'
import supertest from 'supertest'

const BASE_URL = `http://${process.env.HOST}:${process.env.PORT}`

// defining testrunner that send the requests based on the documentation
function checkResponse(body: Object, schema: Object, assert: Assert) {
  assert.typeOf(body, schema.type)
  const properties = Object.keys(schema.properties)
  const values = Object.values(schema.properties)
  assert.containsAllKeys(object, structure)
}

async function testRunner(route: string, assert: Assert, authToken?: string, pathParam?: string) {
  const pathDoc = Documentation.paths[route]

  // setup each method to call if it exists in the pathdoc
  if (Object.keys(pathDoc).includes('get')) {
    console.log(pathDoc.summary)
    if (pathParam) {
      route += pathParam
    }
    const { body } = await supertest(BASE_URL)
      .get(route)
      .query({})
      .auth(authToken ? authToken : '', { type: 'bearer' })
      .expect(200)
    // .expect('Content-Type', /json/)

    // check response and validate
    const responseDoc = pathDoc.get.responses[200]

    checkResponse(body, responseDoc, assert)
  }

  if (Object.keys(pathDoc).includes('post')) {
    // console.log(pathDoc.summary)
    // const { body } = await supertest(BASE_URL).get(route).expect(200).expect('Content-Type', /json/)
    // assert.isTrue(typeof body === pathDoc.responses[200].content['application/json'].schema.type)
    // assert.isTrue(body.message && typeof body.message === 'string')
  }

  if (Object.keys(pathDoc).includes('put')) {
    // console.log(pathDoc.summary)
    // const { body } = await supertest(BASE_URL).get(route).expect(200).expect('Content-Type', /json/)
    // assert.isTrue(typeof body === pathDoc.responses[200].content['application/json'].schema.type)
    // assert.isTrue(body.message && typeof body.message === 'string')
  }

  if (Object.keys(pathDoc).includes('delete')) {
    // console.log(pathDoc.summary)
    // const { body } = await supertest(BASE_URL).delete(route).expect(200)
    // assert.isTrue(typeof body === pathDoc.responses[200].content['application/json'].schema.type)
    // assert.isTrue(body.message && typeof body.message === 'string')
  }
  return 'DONE'
}

test.group('Happy Path', (group) => {
  // setup for tests environment
  group.beforeEach(async () => {
    await Database.beginGlobalTransaction()
  })

  group.afterEach(async () => {
    await Database.rollbackGlobalTransaction()
  })
  group.after(async () => {
    console.log('ALL TESTS DONE')
  })

  // Running tests
  test('/', async (assert) => {
    await testRunner('/', assert)
    // const user = await User.create({
    //   email: 'teste',
    //   password: 'teste123',
    //   is_admin: false,
    //   is_master: false,
    // })

    // console.log(user.email)
  }).retry(1)

  test('/login', async (assert) => {
    // POST
    await testRunner('/', assert)
    // console.log(await User.query())
  })
})
