/*
 *  lib/run.js
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
const run = _.promise((self, done) => {
    _.promise.validate(self, run)

    self.sqlite.serialize(() => {
        self.sqlite.run(self.statement, self.params || [], error => {
            if (error) {
                return done(error)
            }

            done(null, self)
        })
    })
})

run.method = "run"
run.description = ``
run.requires = {
    sqlite: _.is.Object,
    statement: _.is.String,
}
run.accepts = {
    params: _.is.Dictionary
}
run.produces = {
}
run.params = {
    statement: _.p.normal,
    params: _.p.normal,
}
run.p = _.p(run)

/**
 *  API
 */
exports.run = run
