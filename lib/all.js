/*
 *  run.js
 *
 *  David Janes
 *  IOTDB.org
 *  2018-05-18
 *
 *  Copyright [2013-2018] [David P. Janes]
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

"use strict"

const _ = require("iotdb-helpers")

const sqlite = require("sqlite3").verbose();

const assert = require("assert")

/**
 *  Requires: self.sqlite, self.statement
 *  Produces: self.sqlite
 */
const all = _.promise.make((self, done) => {
    const method = "all";

    assert.ok(self.sqlite, `${method}: expected self.sqlite`)
    assert.ok(_.is.String(self.statement), `${method}: expected self.statement to be String`)
    assert.ok(_.is.Array(self.params) || _.is.Nullish(self.params), 
        `${method}: expected self.params to be Array or Null`)

    self.sqlite.serialize(() => {
        self.sqlite.all(self.statement, self.params || [], (error, rows) => {
            if (error) {
                return done(error)
            }

            self.jsons = rows
            self.count = rows.length
            self.json = self.jsons.length ? self.jsons[0] : null;

            done(null, self)
        })
    })
})


/**
 *  Parameterized
 */
const all_p = (statement, params) => _.promise.make((self, done) => {
    _.promise.make(self)
        .then(_.promise.add({
            statement: statement,
            params: params || [],
        }))
        .then(all)
        .then(_.promise.done(done, self, "jsons,json,count"))
        .catch(done)
})

/**
 *  API
 */
exports.all = all;
exports.all.p = all_p;
