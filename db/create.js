/*
 *  db/create.js
 *
 *  David Janes
 *  IOTDB.org
 *  2018-05-18
 *
 *  Copyright (2013-2021) David P. Janes
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
 *  Produces: N/A
 *
 *  Create a Table
 */
const create = _.promise.make((self, done) => {
    const method = "db.create";

    assert.ok(self.sqlite, `${method}: expected self.sqlite`)
    assert.ok(self.table_schema, `${method}: expected self.table_schema`)
    assert.ok(self.table_schema.name, `${method}: expected self.table_schema.name`)
    assert.ok(self.table_schema.keys, `${method}: expected self.table_schema.keys`)
    assert.ok(self.table_schema.keys.length, `${method}: expected self.table_schema.keys`)

    const columns = (self.table_schema.columns || []).map(cd => `${cd.name} ${cd.type}`);

    columns.push(`PRIMARY KEY (${self.table_schema.keys.join(", ")})`)

    const statement = `CREATE TABLE ${self.table_schema.name}(${columns.join(", ")})`;

    _.promise.make(self)
        .then(sqlite.run.p(statement))
        .then(_.promise.done(done, self))
        .catch(done)
})

/**
 *  API
 */
exports.create = create;
