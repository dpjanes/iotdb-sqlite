/*
 *  lib/get.js
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

const _util = require("./_util")

/**
 */
const get = _.promise((self, done) => {
    _.promise.validate(self, get)

    self.sqlite.serialize(() => {
        self.sqlite.get(self.statement, self.params || [], (error, row) => {
            if (error) {
                error = (self.sqlite$error || (x => x))(error)
                row = null
            }
            if (error) {
                return done(error)
            }

            self.json = row

            done(null, self)
        })
    })
})

get.method = "get"
get.description = `Get a single row`
get.requires = {
    sqlite: _.is.Object,
    statement: [ _.is.String, _util.is.Statement ],
}
get.accepts = {
    params: _.is.Array,
    sqlite$error: _.is.Function,
}
get.produces = {
    json: _.is.Dictionary,
}
get.params = {
    statement: _.p.normal,
    params: _.p.normal,
    sqlite$error: _.p.normal,
}
get.p = _.p(get)

/**
 *  API
 */
exports.get = get
