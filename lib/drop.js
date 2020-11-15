/*
 *  lib/drop.js
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

/*
 */
const drop = _.promise.make((self, done) => {
    const sqlite = require("..")

    _.promise.make(self)
        .validate(drop)
        
        .make(sd => {
            sd.statement = `DROP TABLE ${self.table_schema.name}`
            sd.params = []
        })
        .then(sqlite.run)

        .end(done, self, drop)
})

drop.method = "db.drop"
drop.description = `Drop a Table`
drop.requires = {
    sqlite: _.is.Object,
    table_schema: {
        name: _.is.String,
    },
}
drop.accepts = {
}
drop.produces = {
}
drop.params = {
    table_schema: _.p.normal,
}
drop.p = _.p(drop)

/**
 *  API
 */
exports.drop = drop;
