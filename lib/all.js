/*
 *  lib/all.js
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

/**
 */
const all = _.promise((self, done) => {
    _.promise.validate(self, all)

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

all.method = "all"
all.description = ``
all.requires = {
    sqlite: _.is.Object,
    statement: _.is.String,
}
all.accepts = {
    params: _.is.Dictionary
}
all.produces = {
    jsons: _.is.Array,
    count: _.is.Integer,
    json: _.is.Dictionary,
}
all.params = {
    statement: _.p.normal,
    params: _.p.normal,
}
all.p = _.p(all)

/**
 *  API
 */
exports.all = all
