/**
 *  test/create.js
 *
 *  David Janes
 *  IOTDB
 *  2018-01-25
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
const fs = require("iotdb-fs")

const assert = require("assert")
const path = require("path")

const sqlite = require("..")
const _util = require("./_util")

describe("db/create", function() {
    let self = {}

    before(function(done) {
        _.promise(self)
            .then(_util.initialize)
            .make(sd => {
                self = sd
            })
            .end(done, {})
    })

    describe("good", function() {
        it("simple", function(done) {
            _.promise(self)
                .then(_.promise.optional(sqlite.run.p("DROP TABLE items")))

                .then(fs.read.json.p(path.join(__dirname, "data", "items.schema.json")))
                .add("json:table_schema")
                .then(sqlite.create)
                .make(sd => {
                    // assert.deepEqual(sd.postgres_result.command, "CREATE")
                })
                .end(done, {})
        })
        it("complex", function(done) {
            _.promise(self)
                .then(_.promise.optional(sqlite.run.p("DROP TABLE place_mine")))

                .then(fs.read.json.p(path.join(__dirname, "data", "place_mine.schema.json")))
                .add("json:table_schema")
                .then(sqlite.create)
                .make(sd => {
                    // assert.deepEqual(sd.postgres_result.command, "CREATE")
                })
                .end(done, {})
        })
    })
})
