/*
 *  db/drop.js
 *
 *  David Janes
 *  IOTDB.org
 *  2018-05-18
 *
 *  Copyright [2013-2018] [David P. Janes]
 *
 *  Licensed under the Apache License, Version 2.0 (the "License")
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

const sqlite = require("pg")

const assert = require("assert")

/*
 *  Requires: self.sqlite, self.table_schema
 *  Produces: self.sqlite_result
 *
 *  Drop a Table
 */
const drop = _.promise.make((self, done) => {
    const method = "db.drop";

    assert.ok(self.sqlite, `${method}: expected self.sqlite`)
    assert.ok(self.table_schema, `${method}: expected self.table_schema`)
    assert.ok(self.table_schema.name, `${method}: expected self.table_schema.name`)

    const statement = `DROP TABLE ${self.table_schema.name}`;

    _.promise.make(self)
        .then(sqlite.run.p(statement))
        .then(_.promise.done(done, self))
        .catch(done)
})

/**
 *  API
 */
exports.drop = drop;
