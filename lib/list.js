/*
 *  lib/list.js
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
const list = _.promise((self, done) => {
    _.promise.validate(self, list)

    self.sqlite.serialize(() => {
        self.sqlite.all(self.statement, self.params || [], (error, rows) => {
            if (error) {
                return done(error)
            }

            self.jsons = rows
            self.count = rows.length
            self.json = self.jsons.length ? self.jsons[0] : null

            done(null, self)
        })
    })
})

list.method = "list"
list.description = ``
list.requires = {
    sqlite: _.is.Object,
    statement: [ _.is.String, _util.is.Statement ],
}
list.accepts = {
    params: _.is.Array,
}
list.produces = {
    jsons: _.is.Array,
    count: _.is.Integer,
    json: _.is.Dictionary,
}
list.params = {
    statement: _.p.normal,
    params: _.p.normal,
}
list.p = _.p(list)

/**
 *  API
 */
exports.list = list
