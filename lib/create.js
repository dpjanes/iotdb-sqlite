/*
 *  lib/create.js
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
const create = _.promise((self, done) => {
    const sqlite = require("..")

    _.promise(self)
        .validate(create)
        
        .make(sd => {
            const columns = (sd.table_schema.columns || []).map(cd => `${cd.name} ${cd.type}`)
            columns.push(`PRIMARY KEY (${sd.table_schema.keys.join(", ")})`)

            sd.statement = `CREATE TABLE ${sd.table_schema.name}(${columns.join(", ")})`
            sd.params = []
        })
        .then(sqlite.run)

        .end(done, self, create)
})

create.method = "db.create"
create.description = `Create a table`
create.requires = {
    sqlite: _.is.Object,
    table_schema: {
        name: _.is.String,
        keys: _.is.Array,
    },
}
create.accepts = {
}
create.produces = {
}
create.params = {
    table_schema: _.p.normal,
}
create.p = _.p(create)

/**
 *  API
 */
exports.create = create;
