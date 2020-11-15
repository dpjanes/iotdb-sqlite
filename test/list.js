/**
 *  test/list.js
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

"use strict";

const _ = require("iotdb-helpers");

const assert = require("assert");

const sqlite = require("..")
const _util = require("./_util")

describe("list", function() {
    let self = {}

    before(function(done) {
        _.promise(self)
            .then(_util.initialize)
            .make(sd => {
                self = sd;
            })
            .end(done, {})
    })

    describe("good", function() {
        it("works", function(done) {
            _.promise(self)
                .then(sqlite.execute.p("DROP TABLE items", null, sqlite.IGNORE))
                .then(sqlite.execute.p("CREATE TABLE items(id INTEGER PRIMARY KEY AUTOINCREMENT, text VARCHAR(40) not null, complete BOOLEAN)"))
                .then(sqlite.execute.p("INSERT INTO items(text, complete) values(?, ?)", [ "hello", true ]))
                .then(sqlite.list.p("SELECT * FROM items"))
                .make(sd => {
                    assert.ok(sd.jsons)
                    assert.deepEqual(sd.jsons.length, 1)
                    assert.deepEqual(sd.count, 1)
                })
                .end(done, {})
        })
        it("JSON1 extension", function(done) {
            _.promise(self)
                .then(sqlite.execute.p("DROP TABLE lorem", null, sqlite.IGNORE))
                .then(sqlite.execute.p("CREATE TABLE lorem (info TEXT)"))
                .then(sqlite.execute.p("INSERT INTO lorem VALUES(json(?))", [ JSON.stringify({ "hello": "world" }) ]))
                .then(sqlite.list.p("SELECT rowid AS id, json_extract(info, \'$.hello\') AS info FROM lorem"))
    
                .make(sd => {
                    console.log(sd.jsons)
                    assert.ok(sd.jsons)
                    assert.deepEqual(sd.jsons.length, 1)
                    assert.deepEqual(sd.count, 1)
                })
                .end(done, {})
        })
    })
})
