/*
 *  initialize.js
 *
 *  David Janes
 *  IOTDB.org
 *  2018-05-18
 *
 *  Copyright (2013-2021) David P. Janes
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
 *  Requires: self.sqlited
 *  Produces: self.sqlite
 */
const initialize = _.promise.make((self, done) => {
    const method = "initialize";

    assert.ok(self.sqlited, `${method}: expected self.sqlited`)
    assert.ok(self.sqlited.path, `${method}: expected self.sqlited.path`)

    const client = new sqlite.Database(self.sqlited.path, error => {
        if (error) {
            return done(error)
        }

        self.sqlite = client;

        done(null, self)
    })
})

/**
 *  API
 */
exports.initialize = initialize;
