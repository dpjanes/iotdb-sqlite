/*
 *  lib/initialize.js
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

const sqlite = require("sqlite3").verbose()

/**
 */
const initialize = _.promise((self, done) => {
    _.promise.validate(self, initialize)

    const client = new sqlite.Database(self.sqlite$cfg.path, error => {
        if (error) {
            return done(error)
        }

        self.sqlite = client

        done(null, self)
    })
})

initialize.method = "initialize"
initialize.description = ``
initialize.requires = {
    sqlite$cfg: {
        path: _.is.String,
    },
}
initialize.accepts = {
}
initialize.produces = {
    sqlite: _.is.Object,
}
initialize.params = {
    sqlite$cfg: _.p.normal,
}
initialize.p = _.p(initialize)

/**
 *  API
 */
exports.initialize = initialize
